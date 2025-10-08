import { Grid, Image, Box } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const Login = () => {

    return (
        <Grid minH="100dvh" placeItems="center" px={4} >
            <Box position="relative">
                <Image
                    src="/deadpool.png"
                    alt="Deadpool"
                    w={{ base: "24rem", sm: "28rem", md: "27rem" }}
                    mx="auto"
                    draggable={false}
                />
                <LoginForm />
            </Box>
        </Grid>
    )
}

export default Login
