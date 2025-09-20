"use client"
import { useState } from 'react'
import { Box, Button, Container, Input, Grid, Image, VStack, Text,Skeleton } from '@chakra-ui/react'
import { SEARCH_MOVIES } from '@/libs/graphql'
import { useQuery } from '@apollo/client/react'

const MovieCard = () => {
    const [query, setQuery] = useState('')
    const [input, setInput] = useState('')
    
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
  return (
    <Box px='3rem' py='2rem'>
      <form onSubmit={searchMovie}>
        <Input
          type='text'
          w='20rem'
          mx='auto'
          mb={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='serch movie here....'
        />
        <Button type='submit' ml='1rem' py='0.5rem'>Search</Button>
      </form>
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
