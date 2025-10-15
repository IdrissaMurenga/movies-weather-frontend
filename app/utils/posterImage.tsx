import { AspectRatio, Center, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

type PosterProps = {
    src?: string | null;
    alt: string;
};

export function Poster({ src, alt }: PosterProps) {

    const [failed, setFailed] = useState(false);

    const showFallback = !src || src === "N/A" || failed;

    return (
        <AspectRatio ratio={2 / 3} w="100%" rounded="md" overflow="hidden" bg="gray.800" border="1px solid" borderColor="gray.700">
            {showFallback ? (
                <Center w="100%" h="100%" flexDir="column" gap={2}>
                    <FiImage size={36} />
                    <Text fontSize="sm" color="gray.400">No image available</Text>
                </Center>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={() => setFailed(true)}
                />
            )}
        </AspectRatio>
    );
}
export default Poster;