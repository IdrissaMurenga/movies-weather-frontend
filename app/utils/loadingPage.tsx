import { Grid, Skeleton, Box, VStack } from "@chakra-ui/react";

export const SkeletonLoad = () => (
    <Grid
        templateColumns={{ 
            base: "1fr", 
            md: "repeat(3, 1fr)", 
            lg: "repeat(4, 1fr)", 
            xl: "repeat(5, 1fr)" 
        }}
        gap={4}
    >
        {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} borderWidth="1px" rounded="md" overflow="hidden">
                <Skeleton h="240px" w="100%" />
                <VStack align="start" p={2}>
                    <Skeleton h="16px" w="70%" />
                    <Skeleton h="14px" w="40%" />
                </VStack>
            </Box>
        ))}
    </Grid>
);

export const MovieSkeleton = () => (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(5, 1fr)" }} gap={4} py={6}>
        {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} borderWidth="1px" rounded="md" overflow="hidden">
                <Skeleton h="240px" w="100%" />
                <VStack align="start" p={2}>
                    <Skeleton h="16px" w="70%" />
                    <Skeleton h="14px" w="40%" />
                </VStack>
            </Box>
        ))}
    </Grid>
)
