import FavoriteList from "@/app/components/FavoriteList"
import WeatherCard from "@/app/components/WeatherCard"
import { Grid } from "@chakra-ui/react"

const Dashboard = () => {
    return (
        <Grid mt='1.5rem' gap={6}>
            <WeatherCard />
            <FavoriteList />
        </Grid>
    )
}

export default Dashboard
