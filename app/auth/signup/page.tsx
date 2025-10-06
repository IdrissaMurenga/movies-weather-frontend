"use client"
import { Grid, Box, Image } from "@chakra-ui/react"
import SignupForm from './SignupForm';

const Signup = () => {
    return (
        <Grid height='100dvh' placeItems='center'>
            <Box position="relative">
                <Image
                    src="/deadpool.png"
                    alt="Deadpool"
                    w={{ base: "24rem", sm: "28rem", md: "27rem" }}
                    mx="auto"
                    draggable={false}
                />
                <SignupForm />
            </Box>
        </Grid>
    )
}

export default Signup
