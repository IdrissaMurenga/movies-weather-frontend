"use client"
import Link from "next/link"
import { GET_USER } from "@/libs/graphql"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { Avatar, Container, Flex, HStack, Text, Button, SkeletonCircle, Image, Heading } from "@chakra-ui/react"

const Navbar = () => {
    const pathname = usePathname()
    const { data, loading } = useQuery(GET_USER)
    
    const user = data?.me
    
    const logout = () => {
        signOut({
            callbackUrl: '/'
        })
    }

    const isActive = (href: string) => pathname === href
    
    return (
        <Container>
            <HStack py={2} px={4} bgColor={'#4444'} alignItems={'center'} justifyContent={'space-between'} rounded={'full'}>
                <HStack gap={12}>
                    <HStack> 
                        <Image src="/logo.png" alt="logo image" w="6rem" />
                        <Heading>Movies Weather App</Heading>
                    </HStack>
                    <HStack gap={6} p={2} rounded='full' bgColor={"black"} pr={"23rem"}>
                        <Link href='/pages/dashboard'>
                            <Text
                                bgColor={isActive("/pages/dashboard") ? "blue.600" : "black"}
                                px={2} py={1}
                                rounded='full'
                            >
                                Dashnoard
                            </Text>
                        </Link>
                        <Link href='/pages/movies'>
                            <Text
                                bgColor={isActive("/pages/movies") ? "blue.600" : "black"}
                                rounded='full'
                                px={2} py={1}
                            >
                                Movies
                            </Text>
                        </Link>
                    </HStack>
                </HStack>
                <HStack>
                    {loading ?
                        <SkeletonCircle size={10} />
                        : 
                        <Avatar.Root colorPalette={'blue'}>
                            <Avatar.Fallback name={`${user?.name}`} />
                        </Avatar.Root>
                    }
                    <Button onClick={logout} variant="plain" color={"red"}>
                        <RiLogoutCircleRLine />
                        Logout
                    </Button>
                </HStack>
            </HStack>
        </Container>
    )
}

export default Navbar
