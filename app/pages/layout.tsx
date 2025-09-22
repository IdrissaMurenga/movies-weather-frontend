import { Container, Grid } from "@chakra-ui/react";
import Navbar from "@/app/components/Navbar";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container pt={8} color='text-primary'>
            <Navbar />
            {children}
        </Container>
    );
};