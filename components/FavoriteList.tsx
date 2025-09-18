"use client"
import { useQuery } from "@apollo/client/react"
import { FAVORITE_MOVIES } from "@/libs/graphql"
import { Grid, Text, Box, Image, Button, Heading } from "@chakra-ui/react"

const FavoriteList = () => {
    const { data, error, loading } = useQuery(FAVORITE_MOVIES)
    
    const favMovies = data?.favoriteMovies ?? []
    return (
        <Box>
            <Heading pb={4}>Your Movies</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {favMovies.map((fav) => (
                    <Box key={fav.movie.id}>
                        {fav.movie.poster ? (
                            <Image src={fav.movie.poster} alt={fav.movie.title} h="320px" border='2px solid' rounded='md' />
                        ) : (
                            <Text>No Poster</Text>
                        )}
                        <Grid gap={1}>
                        <Box pt={2}>
                            <Text fontWeight="semibold">{fav.movie.title}</Text>
                            <Text fontSize="sm" color="gray.600">{fav.movie.year} • {fav.movie.type}</Text>
                        </Box>
                            <Button
                            size="sm"
                            my='1rem'
                            >
                                remove Favorite
                            </Button>
                        </Grid>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default FavoriteList
