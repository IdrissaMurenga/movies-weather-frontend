"use client"
import { useQuery } from "@apollo/client/react"
import { FAVORITE_MOVIES } from "@/libs/graphql"
import { Grid, Text, Box, Image, Button, Heading, Skeleton, VStack } from "@chakra-ui/react"
import Link from "next/link"
import useFavorite from "@/app/hooks/useFavrite"
import { SkeletonLoad } from "../utils/loadingPage"

const FavoriteList = () => {
    const { data, loading } = useQuery(FAVORITE_MOVIES)
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
            {loading && <SkeletonLoad />}
            {favMovies.length === 0 && !loading ? 
                <Grid w={"20rem"} mx="auto" justifyContent={"center"}>
                    <Image src="/deadpool2.png" alt="star icon" w='19rem' mx={'auto'} />
                    <Heading textAlign={"center"}>no favorite movies yet, search movie and add as favorite</Heading>
                    <Link href='/pages/movies'>
                        <Grid>
                        <Button fontWeight='bold' colorPalette="blue" color="white" my="2">search movies</Button>
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
