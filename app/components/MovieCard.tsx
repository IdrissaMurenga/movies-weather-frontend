"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Input, Grid, Image, VStack, Text,Skeleton } from '@chakra-ui/react'
import { SEARCH_MOVIES } from '@/libs/graphql'
import { useQuery } from '@apollo/client/react'
import { NetworkStatus } from "@apollo/client";
import useFavrite from '@/app/hooks/useFavrite'
import { FaStar } from "react-icons/fa6";

const MovieCard = () => {
  const [query, setQuery] = useState('')
  const [input, setInput] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { addFav } = useFavrite()
    
  const { data, error, loading, networkStatus, fetchMore } = useQuery(SEARCH_MOVIES, {
    variables: { query, page: 1 },
    fetchPolicy: "network-only", 
    skip: !query
  })
  
  const movies = data?.searchMovies.movies ?? []

  const hasMore: boolean = data?.searchMovies.hasMore ?? false;
  const currentPage: number = data?.searchMovies.page ?? 1;

    // Infinite scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingMore = networkStatus === NetworkStatus.fetchMore; // 3

  const onIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      if (!hasMore || !query) return;
      if (loadingMore) return;

      await fetchMore({
        variables: { query, page: currentPage + 1 },
        // no need to provide updateQuery due to cache field policy merge
      });
    },
    [hasMore, query, currentPage, loadingMore, fetchMore]
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "300px", // prefetch a bit earlier
      threshold: 0,
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);
  
  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault()
    const query = input.trim()
    if (query.length < 2) return;
    setQuery(query)
    setInput("")
  }
  const addForiteMovie = async (imdbID: string) => {
    if (favorites.has(imdbID)) return;
    const fav = await addFav(imdbID);

    setFavorites((prev) => new Set([...prev, imdbID]));

    return fav    
  };
  return (
    <Box px='3rem' py='2rem'>
      <HStack justifyContent={"center"}>
        <form onSubmit={searchMovie}>
            <Input
              type='text'
              w='20rem'
              h="2.6rem"
              mx='auto'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='search movies here........'
            />
            <Button type='submit' colorPalette={'blue'} ml='1rem' px="1.5rem" py='0.5rem'>Search</Button>
        </form>
      </HStack>
      {!query && (
        <Grid justifyContent="center" alignContent="center" pt="6rem">
          <Image src="/movie-recorder-svgrepo-com.svg" alt="movie icon" w="8rem" mx="auto" />
          <Text>Search for your favorite movies above and start exploring 🍿</Text>
        </Grid>
      )}
      {error && <Text color="red.500">Something went wrong.</Text>}
      {loading && (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(5, 1fr)" }} gap={4} py={6}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} borderWidth="1px" rounded="md" overflow="hidden">
              <Skeleton h="240px" w="100%" />
              <VStack align="start" p={2}>
                <Skeleton h="16px" w="70%" />
                <Skeleton h="14px" w="40%" />
              </VStack>
            </Box>
          ))}
        </Grid>
      )}

      
      {!loading && query && movies.length === 0 && (
        <Text>No movies found for “{query}”.</Text>
      )}
      {!loading && movies.length > 0 && (        
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
          gap={4}
        >
          {movies?.map((movie) => {
            return (
              <Box
                px={3}
                py={6}
                display="flex"
                flexDirection="column"
                key={movie.id}
              >
                <Image
                  src={movie.poster ?? "/placeholder.png"}
                  alt={movie.title}
                  w="100%"
                  h="320px"
                  objectFit="cover"
                  border='2px solid'
                  rounded='md'
                />
                
                <Box pt={2}>
                  <Text fontWeight="semibold">{movie.title}</Text>
                  <Text fontSize="sm" color="gray.600">{movie.year} • {movie.type}</Text>
                </Box>
                <Box mt="auto" />
                <Button
                  size="sm"
                  my='1rem'
                  cursor={'pointer'}
                  onClick={() => addForiteMovie(movie.imdbID)}
                  colorPalette="blue"
                  disabled={favorites.has(movie.imdbID)}
                  bg={favorites.has(movie.imdbID) ? "yellow" : "blue"}
                >
                  Add Favorite
                </Button>
              </Box>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}

export default MovieCard
