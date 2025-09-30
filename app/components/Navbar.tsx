"use client"
import { useState } from "react"
import Link from "next/link"
import { GET_USER } from "@/libs/graphql"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { Avatar, Container, Box, HStack, Text, Button, SkeletonCircle, Image, Heading, IconButton, Stack } from "@chakra-ui/react"


const linkItem = [
    {name: "Dashboard", href: "/pages/dashboard" },
    {name: "Movies", href: "/pages/movies" }
]

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    const { data, loading } = useQuery(GET_USER)
    const isActive = (href: string) => pathname === href
    
    const user = data?.me
    
    const logout = () => {
        signOut({
            callbackUrl: '/'
        })
    }


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    
    return (
        <Stack>
            <HStack p={2} bgColor={'#4444'} alignItems={'center'} justifyContent={'space-between'} rounded={'2xl'}>
                <HStack> 
                    <Box display={{ lg: 'none' }}>
                        <IconButton onClick={open ? handleClose : handleOpen} variant='plain' size='md'>
                            {open ? <IoCloseCircle /> : <GiHamburgerMenu />}
                        </IconButton>
                    </Box>
                    <Image src="/logo.png" alt="logo image" w="4rem" />
                    <Heading>CineCast</Heading>
                </HStack>
                <HStack>
                    <HStack
                        p={2} 
                        rounded='2xl'
                        bgColor={"black"}
                        display={{ base: 'none', lg: 'flex' }}
                        justifyContent="space-evenly"
                        w={{ md: "1rem", lg: "26rem" }}
                    >
                        {linkItem.map((link) => (
                            
                            <Link href={link.href} key={link.name}>
                                <Text
                                    bgColor={isActive(link.href) ? "blue.600" : 'black'}
                                    py={1} px={2}
                                    rounded="2xl"
                                    textAlign={"center"}
                                >
                                    {link.name}
                                </Text>
                            </Link>
                            
                        ))}
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
            {open ? (                
                <Stack display={{ lg: 'none' }}>
                    {linkItem.map((link) => (
                        <Link href={link.href} key={link.name}>
                            <Text
                                bgColor={isActive(link.href) ? "blue.600" : 'black'}
                                py={1} px={2}
                                rounded="2xl"
                                textAlign={"center"}
                            >
                                {link.name}
                            </Text>
                        </Link>
                    ))}
                </Stack>
            ) : ''}
        </Stack>
    )
}

export default Navbar
