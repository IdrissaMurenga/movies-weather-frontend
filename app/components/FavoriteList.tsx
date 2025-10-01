"use client"
import { useQuery } from "@apollo/client/react"
import { FAVORITE_MOVIES } from "@/libs/graphql"
import { Grid, Text, Box, Image, Button, Heading, Skeleton, VStack } from "@chakra-ui/react"
import Link from "next/link"
import useFavorite from "@/app/hooks/useFavrite"

const FavoriteList = () => {
    const { data, loading, error } = useQuery(FAVORITE_MOVIES)
    const { removeFav } = useFavorite()

    const favMovies = [...(data?.favoriteMovies ?? [])].reverse()
    console.log("fav movies: ", favMovies)

    const removeFavorite = async (imdbID: string) => {
        const remove = await removeFav(imdbID)
        console.log("removed from favorite: ", remove)
    }
    return (
        <Box>
            <Heading pb={4}>Your Favorite Movies</Heading>
            {loading && (
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={4}>
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
            {favMovies.length === 0 && !loading ? 
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
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={4}>
                    {favMovies.map((fav) => (
                        <Box
                            px={3}
                            py={6}
                            display="flex"
                            flexDirection="column"
                            key={fav.movie.id}
                        >
                            
                            <Image
                                src={fav.movie.poster ?? "/placeholder.png"}
                                alt={fav.movie.title}
                                h="320px"
                                border='2px solid'
                                objectFit="cover"
                                rounded='md'
                            />
                            
                            <Box pt={2}>
                                <Text fontWeight="semibold">{fav.movie.title}</Text>
                                <Text fontSize="sm" color="gray.600">{fav.movie.year} • {fav.movie.type}</Text>
                            </Box>
                            <Box mt="auto" />
                            <Button
                                size="sm"
                                my='1rem'
                                cursor="pointer"
                                colorPalette="red"
                                onClick={()=>removeFavorite(fav.movie.imdbID)}
                            >
                                    remove Favorite
                            </Button>
                        </Box>
                    ))}
                </Grid>
            }
        </Box>
    )
}

export default FavoriteList
