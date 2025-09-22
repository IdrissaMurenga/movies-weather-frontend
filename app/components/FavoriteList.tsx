"use client"
import { useQuery } from "@apollo/client/react"
import { FAVORITE_MOVIES } from "@/libs/graphql"
import { Grid, Text, Box, Image, Button, Heading, Skeleton, VStack } from "@chakra-ui/react"
import Link from "next/link"
import useFavorite from "@/app/hooks/useFavrite"

const FavoriteList = () => {
    const { data, loading, error } = useQuery(FAVORITE_MOVIES)
    const { removeFav } = useFavorite()

    const favMovies = data?.favoriteMovies ?? []

    const removeFavorite = async (imdbID: string) => {
        const remove = await removeFav(imdbID)
        console.log("removed from favorite: ", remove)
    }
    return (
        <Box>
            <Heading pb={4}>Your Favorite Movies</Heading>
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
            {favMovies.length === 0 ? 
                <Grid w={"20rem"} mx="auto" justifyContent={"center"} py="2rem">
                    <Image src="/star.png" alt="star icon" w='9rem' mx={'auto'} />
                    <Text textAlign={"center"}> u have no favorite movies yet please serch movie and add as favorite</Text>
                    <Link href='/pages/movies'>
                        <Grid>
                        <Button bgColor="blue.400" fontWeight='bold' color="white" my="2">search movies</Button>
                        </Grid>
                    </Link>
                </Grid>
                :
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
                                    onClick={()=>removeFavorite(fav.movie.imdbID)}
                                >
                                    remove Favorite
                                </Button>
                            </Grid>
                        </Box>
                    ))}
                </Grid>
            }
        </Box>
    )
}

export default FavoriteList
