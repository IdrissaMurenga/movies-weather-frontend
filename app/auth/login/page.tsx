import { Grid, Image, Box } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const Login = () => {

    return (
        <Grid minH="100dvh" placeItems="center" px={4} >
            <Box position="relative">
                <Image
                    src="/deadpool.png"
                    alt="Deadpool"
                    position="absolute"
                    top={{ base: -16, sm:-30, md: -44 }}
                    // left="50%"
                    // transform="translateX(-50%)"
                    w={{ base: "14rem", sm: "28rem", md: "30rem" }}
                    // objectFit="contain"
                    // pointerEvents="none"
                    zIndex={-1}
                    draggable={false}
                />
                <LoginForm />
            </Box>
        </Grid>
    )
}

export default Login
