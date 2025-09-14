import { Grid } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Grid templateColumns="auto, 1fr" color='text-primary'>
            <Navbar />
            {children}
        </Grid>
    );
};