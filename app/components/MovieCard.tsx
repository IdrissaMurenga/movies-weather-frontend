"use client"
import { Box, Button, HStack, Input, Grid, Image, VStack, Text, Skeleton, Heading } from '@chakra-ui/react'
import useMovies from "../hooks/useMovies";
import { MovieSkeleton } from '../utils/loadingPage';

const MovieCard = () => {
  const { data, movies, input, query,loading, error, setInput, searchMovies, loadingMore, loadMoreRef, fav, addFavoriteMovie, hasMore } = useMovies();


  return (
    <Box py='2rem'>
        <form onSubmit={searchMovies}>
          <HStack>
            <Input
              type='text'
              w={{ md: '22rem' }}
              outline="none"
              bgColor="inputBg"
              border="none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='search your best movies here....'
            />
            <Button type='submit' bgColor="blue.800" size={"md"} px="1.5rem">
              Search
            </Button>
          </HStack>
        </form>

      {/* show friendly message when no query entered by user */}
      {!query && (
        <Grid justifyContent="center" alignContent="center" pt={2}>
          <Image src="/deadpool4.png" alt="movie icon" w="20rem" mx="auto" />
          <Heading textAlign="center">Search for your favorite movies above and start exploring 🍿</Heading>
        </Grid>
      )}

      {error && <Text color="red.500">Something went wrong.</Text>}
      
      {/* Show initial loading state only on first load */}
      {loading && !data && <MovieSkeleton />}

      {!loading && query && movies.length === 0 && (
        <Text>{`No movies found for ${query}.`}</Text>
      )}
        <VStack gap={4}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
            gap={4}
          >
            {movies?.map((movie) => {
              const poster = movie.poster && movie.poster !== "N/A" ? movie.poster : undefined;
              return (
                <Box px={3} py={6} display="flex" flexDirection="column" key={movie.id}>
                    <Image src={poster} alt={movie.title} w="100%" h="100%" objectFit="contain" border='2px solid' rounded='md' />
                  <Box pt={2}>
                    <Text fontWeight="semibold">{movie.title}</Text>
                    <Text fontSize="sm" color="gray.600">{movie.year} • {movie.type}</Text>
                  </Box>
                  <Box mt="auto" />
                  <Button
                    size="sm"
                    my='1rem'
                    onClick={() => addFavoriteMovie(movie.imdbID)}
                    bgColor={fav.has(movie.imdbID) ? "green" : "blue.600"}
                    disabled={fav.has(movie.imdbID)}
                  >
                    {fav.has(movie.imdbID) ? 'Added to Favorites' : 'Add to Favorites'}
                  </Button>
                </Box>
              )
            })}
          </Grid>
          
        {/* Infinite scroll */}
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
    </Box>
  )
}

export default MovieCard
