import FavoriteList from "@/app/components/FavoriteList"
import WeatherCard from "@/app/components/WeatherCard"
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
