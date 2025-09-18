import FavoriteList from "@/components/FavoriteList"
import WeatherCard from "@/components/WeatherCard"
import { Box, Grid } from "@chakra-ui/react"

const Dashboard = () => {
    return (
        <Grid mt='1.5rem' mx='3rem' gap={6}>
            <WeatherCard />
            <FavoriteList />
        </Grid>
    )
}

export default Dashboard
