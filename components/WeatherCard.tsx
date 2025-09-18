"use client"
import { GET_WEATHER } from "@/libs/graphql"
import { useQuery } from "@apollo/client/react"
import {Box, Flex, HStack, VStack, Heading, Text, Badge, Image, Skeleton, IconButton
} from "@chakra-ui/react";


// Compute dew point from temp & humidity (Magnus formula)
function dewPointC(tempC: number, rh: number): string {
    const a = 17.625, b = 243.04;
    const gamma = Math.log(rh / 100) + (a * tempC) / (b + tempC);
    const dp = (b * gamma) / (a - gamma);
    return `${Math.round(dp)}°`;
}

function nowTime() {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" })
    .format(new Date());
}

const WeatherCard = () => {
    const { data, error, loading } = useQuery(GET_WEATHER)
    
    if (loading) {
        return (
            <Box p={6} bgGradient="linear(to-b, blue.700, blue.800)" color="white" rounded="xl" shadow="xl">
                <Skeleton h="24px" w="160px" mb={3} />
                <Skeleton h="80px" w="70%" mb={3} />
                <Skeleton h="18px" w="60%" />
            </Box>
        );
    }
    if (error || !data) {
        return (
            <Box p={6} bg="red.600" color="white" rounded="xl" shadow="xl">
                Failed to load weather.
            </Box>
        );
    }

    const weather = data.getWeather

    return (
      <Box p={6} bgColor={'#4444'} color="white" rounded="3xl" shadow="xl">
        <Text mb={4} fontSize="sm" opacity={0.9}>
          {weather?.city ?? ""}
        </Text>
        <HStack justify="space-between" align="start">
          <VStack gap={0} align="start">
            <Text fontSize="sm" opacity={0.9}>Current weather</Text>
            <Text fontSize="xs" opacity={0.85}>{nowTime()}</Text>
          </VStack>
        </HStack>
        {weather ? (
          <Box>
            <Flex mt={3} align="center" gap={4} wrap="wrap">
              <Image src={weather.iconUrl} alt={weather.description} boxSize="64px" />
              <Heading size="3xl" lineHeight="1">
                {Math.round(weather.temp)}°C
              </Heading>
              <VStack gap={0} align="start">
                <Heading size="md" fontWeight="semibold" textTransform="capitalize">
                  {weather.description}
                </Heading>
                <Text opacity={0.9} fontSize="sm">
                  Feels like {Math.round(weather.feelsLike)}°
                </Text>
              </VStack>
            </Flex>

            {/* Sentence line */}
            <Text mt={3} opacity={0.95}>
              The skies will be {weather.description}.
            </Text>


            {/* Metrics row (only what we have) */}
            <HStack gap={6} wrap="wrap">
              <Metric label="Wind" value={`${Math.round(weather.windSpeed * 3.6)} km/h`} />
              <Metric label="Humidity" value={`${weather.humidity}%`} />
              <Metric label="Dew point" value={dewPointC(weather.temp, weather.humidity)} />
            </HStack>
          </Box>
        ) : (
          <Text mt={4}>No weather yet — set your city in profile.</Text>
        )}
      </Box>
    )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <VStack align="start" gap={0}>
      <Text fontSize="xs" opacity={0.8}>{label}</Text>
      <Badge bg="whiteAlpha.200" px={2} py={0.5} rounded="md">{value}</Badge>
    </VStack>
  );
}

export default WeatherCard
