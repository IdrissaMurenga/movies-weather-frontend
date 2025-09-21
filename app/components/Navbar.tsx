"use client"
import { Avatar, Box, Container, Flex, Heading, HStack, Text, Button, SkeletonCircle } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@apollo/client/react"
import { GET_USER } from "@/libs/graphql"
import { signOut } from "next-auth/react"

const Navbar = () => {
    const pathname = usePathname()
    const isActive = pathname
    const { data, loading } = useQuery(GET_USER)
    
    const user = data?.me

    const logout = () => {
        signOut({
            callbackUrl: '/'
        })
    }

    return (
        <Container>
            <HStack py={2} px={4} bgColor={'#4444'} alignItems={'center'} justifyContent={'space-between'} rounded={'full'}>
                <Heading>MOVIES-WEATHER-APP</Heading>
                <HStack gap={12} bgColor='black' p={2} rounded='full'>
                    <Link href='/pages/dashboard'>
                        <Text bgColor='teal.600' px={2} py={1} rounded='full'>Dashnoard</Text>
                    </Link>
                    <Link href='/pages/movies'>
                        <Text>Movies</Text>
                    </Link>
                </HStack>
                <HStack>
                    {loading ?
                        <SkeletonCircle size={10} />
                        : 
                        <Avatar.Root colorPalette={'teal'}>
                            <Avatar.Fallback name={`${user?.name}`} />
                        </Avatar.Root>
                    }
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </HStack>
            </HStack>
        </Container>
    )
}

export default Navbar
