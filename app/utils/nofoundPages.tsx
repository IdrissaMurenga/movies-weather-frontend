import { Grid, Image, Heading, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

export const NoFavMovies = () => {
    return (
        <Center w={"20rem"} mx="auto" display="flex" flexDir="column"  gap={4}>
            <Image src="/deadpool2.png" alt="star icon" w='19rem' mx={'auto'} />
            <Heading textAlign={"center"}>no favorite movies yet, search movie and add as favorite</Heading>
            <Link href='/pages/movies'>
                <Grid>
                <Button fontWeight='bold' colorPalette="blue" color="white" my="2">search movies</Button>
                </Grid>
            </Link>
        </Center>
    )
}

export const NoSearchMovies = () => (
    <Grid justifyContent="center" alignContent="center" pt={2}>
        <Image src="/deadpool4.png" alt="movie icon" w="20rem" mx="auto" />
        <Heading textAlign="center">Search for your favorite movies above and start exploring 🍿</Heading>
    </Grid>
)
