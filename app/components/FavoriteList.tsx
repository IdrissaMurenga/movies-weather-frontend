"use client"
import { useQuery } from "@apollo/client/react"
import { FAVORITE_MOVIES } from "@/libs/graphql"
import { Grid, Text, Box, Image, Button, Heading } from "@chakra-ui/react"
import Link from "next/link"
import useFavorite from "@/app/hooks/useFavrite"
import { SkeletonLoad } from './../utils/loadingPage';
import Poster from '../utils/posterImage';
import { NoFavMovies } from "../utils/nofoundPages";

const FavoriteList = () => {
    const { data, loading } = useQuery(FAVORITE_MOVIES)
    const { removeFavoriteMovie } = useFavorite()

    const favMovies = [...(data?.favoriteMovies ?? [])].reverse()

    return (
        <Box>
            <Heading pb={4}>Your Favorite Movies</Heading>

            {loading && <SkeletonLoad />}

            {favMovies.length === 0 && !loading

            ? 
                <NoFavMovies /> 
            :
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={4}>
                    {favMovies.map((fav) => (
                        <Box px={3} py={6} display="flex" flexDirection="column" key={fav.movie.id}>
                            <Poster src= {fav.movie.poster} alt={fav.movie.title} />
                            <Box pt={2}>
                                <Text fontWeight="semibold">{fav.movie.title}</Text>
                                <Text fontSize="sm" color="gray.600">{fav.movie.year} • {fav.movie.type}</Text>
                            </Box>
                            <Box mt="auto" />
                            <Button size="sm" my='1rem' cursor="pointer" colorPalette="red" onClick={()=>removeFavoriteMovie(fav.movie.imdbID)}>
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
