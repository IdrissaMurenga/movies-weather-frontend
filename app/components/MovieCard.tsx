"use client"
import { useState } from 'react'
import { Box, Button, HStack, Input, Grid, Image, VStack, Text,Skeleton } from '@chakra-ui/react'
import { SEARCH_MOVIES } from '@/libs/graphql'
import { useQuery } from '@apollo/client/react'
import useFavrite from '@/app/hooks/useFavrite'

const MovieCard = () => {
  const [query, setQuery] = useState('')
  const [input, setInput] = useState('')
  const { addFav } = useFavrite()
    
  const { data, error, loading } = useQuery(SEARCH_MOVIES, {
    variables: { query, page: 1 },
    skip: !query
  })
  
  const movies = data?.searchMovies.movies ?? []
  
  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault()
    const query = input.trim()
    if (query.length < 2) return;
    setQuery(query)
  }
    const addForiteMovie = async (imdbID: string) => {
    const fav = await addFav(imdbID);
    console.log("Favorite added:", fav);
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
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {Array.from({ length: 8 }).map((_, i) => (
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
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
          gap={4}
        >
          {movies?.map((movie) => {
            return (
              <Box key={movie.id}>
                  {movie.poster ? (
                    <Image src={movie.poster} alt={movie.title} h="320px" border='2px solid' rounded='md'  />
                  ) : (
                    <Box h="320px" bg="gray.100" />
                  )}
                <Grid gap={1}>
                  <Box pt={2}>
                    <Text fontWeight="semibold">{movie.title}</Text>
                    <Text fontSize="sm" color="gray.600">{movie.year} • {movie.type}</Text>
                  </Box>
                  <Button
                      size="sm"
                      my='1rem'
                    onClick={() => addForiteMovie(movie.imdbID)}
                    
                      >
                        Add Favorite
                  </Button>
                </Grid>
              </Box>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}

export default MovieCard
