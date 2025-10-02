"use client"
import { Box, Button, HStack, Input, Grid, Image, VStack, Text, Skeleton } from '@chakra-ui/react'
import useMovies from "../hooks/useMovies";

const MovieCard = () => {
  const { data, movies, input, query,loading, error, setInput, searchMovies, loadingMore, loadMoreRef, fav, addFavoriteMovie, hasMore, hydrated } = useMovies();

  // Skip rendering content until mounted
  if (!hydrated) {
    return (
      <Box py='2rem'>
        <HStack justifyContent={"center"}>
          <form>
            <Input
              type='text'
              w='20rem'
              h="2.6rem"
              mx='auto'
              disabled
              placeholder='Loading...'
              value={input}
            />
            <Button disabled ml='1rem' px="1.5rem" py='0.5rem'>
              Search
            </Button>
          </form>
        </HStack>
      </Box>
    );
  }

  return (
    <Box py='2rem'>
      <HStack justifyContent={"center"}>
        <form onSubmit={searchMovies}>
          <Input
            type='text'
            w='20rem'
            h="2.6rem"
            mx='auto'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='search your best movies here........'
          />
          <Button type='submit' colorPalette={'blue'} ml='1rem' px="1.5rem" py='0.5rem'>
            Search
          </Button>
        </form>
      </HStack>

      {/* show friendly message when no query entered by user */}
      {!query && (
        <Grid justifyContent="center" alignContent="center" pt="6rem">
          <Image src="/movie-recorder-svgrepo-com.svg" alt="movie icon" w="8rem" mx="auto" />
          <Text>Search for your favorite movies above and start exploring 🍿</Text>
        </Grid>
      )}

      {error && <Text color="red.500">Something went wrong.</Text>}
      
      {/* Show initial loading state only on first load */}
      {loading && !data && (
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
        <Text>No movies found for "{query}".</Text>
      )}

      {/* {movies.length > 0 && (         */}
        <VStack gap={4}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
            gap={4}
          >
            {movies?.map((movie) => (
              <Box
                px={3}
                py={6}
                display="flex"
                flexDirection="column"
                key={movie.id}
              >
                <Image
                  src={movie.poster ? movie.poster : "/placeholder.png"}
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
                  onClick={() => addFavoriteMovie(movie.imdbID)}
                  colorPalette={fav.has(movie.imdbID) ? "green" : "blue"}
                  disabled={fav.has(movie.imdbID)}
                >
                  {fav.has(movie.imdbID) ? 'Added to Favorites' : 'Add to Favorites'}
                </Button>
              </Box>
            ))}
          </Grid>
          
        {/* Infinite scroll trigger */}
        {hasMore && (
          <Box ref={loadMoreRef} h="20px" w="100%">
            {loadingMore && (
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={4}>
                {Array.from({ length: 5 }).map((_, i) => (
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
          </Box>
        )}
        </VStack>
      {/* )} */}
    </Box>
  )
}

export default MovieCard
