"use client"
import { Avatar, Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Link from "next/link"


const NavLink = [
    { name: 'Dashboard', href: '/pages/dashboard' },
    { name: 'Movies', href: '/pages/movies' },
]

const Navbar = () => {
    const pathname = usePathname()
    const isActive = pathname
    return (
        <Container display={'flex'} justifyContent={"space-around"} pt={16}>
            <Heading>MOVIES-WEATHER-APP</Heading>
            <HStack>
                {NavLink.map((link) => (
                    <Link href={link.href} key={link.name}>
                        <Text>{}</Text>
                    </Link>
                ))}
            </HStack>
            <Avatar.Root>
                <Avatar.Fallback />
            </Avatar.Root>
        </Container>
    )
}

export default Navbar
