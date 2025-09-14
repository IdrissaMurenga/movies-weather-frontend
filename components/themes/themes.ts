import { createSystem, defaultConfig } from "@chakra-ui/react";

export const themeSystem = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                body: { value: `Roboto` },
            },
            fontSizes: {
                'text-base': { value: '1rem' },
                'text-lg': { value: '1.25rem' },
                'text-xl': { value: '1.5rem' },
                'text-2xl': { value: '2rem' },
            },
            colors: {
                'text-primary': {value: '#F8F8FA'},
                'border-third': {value: '#E5E7EA'},
                'btn-bgColor': {value: 'teal'},
                'primary-bgColor': {value: '#000000ff'},
            },
        },
        breakpoints: {
            base: '0',
            sm: '375px',
            md: '47.5rem', 
            lg: '62rem',
            xl: '80rem',
        },
    }
})