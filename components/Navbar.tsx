"use client"
import { Avatar, Box, Container, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@apollo/client/react"
import { GET_USER } from "@/libs/graphql"

const Navbar = () => {
    const pathname = usePathname()
    const isActive = pathname
    const { data } = useQuery(GET_USER)
    
    const user = data?.me
    return (
        <Container>
            <HStack py={2} px={4} bgColor={'#4444'} alignItems={'center'} justifyContent={'space-between'} rounded={'full'}>
                <Heading>MOVIES-WEATHER-APP</Heading>
                <HStack gap={12}>
                    <Link href='/pages/dashboard'>
                        <Text>Dashnoard</Text>
                    </Link>
                    <Link href='/pages/movies'>
                        <Text>Movies</Text>
                    </Link>
                </HStack>
                <HStack>
                    <Text>{user?.name}</Text>
                    <Avatar.Root colorPalette={'teal'}>
                        <Avatar.Fallback name={`${user?.name}`} />
                    </Avatar.Root>
                </HStack>
            </HStack>
            <Text pt='1.5rem' pl='1rem'>{user?.city}</Text>
        </Container>
    )
}

export default Navbar
