import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: 'var(--color-principal-ui)',
                    hover: 'var(--color-principal-ui-hover)',
                },
                'secondary': {
                    DEFAULT: 'var(--color-secundario-ui)',
                    hover: 'var(--color-secundario-ui-hover)',
                },
                'tertiary': {
                    DEFAULT: 'var(--color-terciario-ui)',
                    hover: 'var(--color-terciario-ui-hover)',
                },
                40: 'rgb(37 99 235 / 0.4)',
            },
        },
    },
    plugins: [],
};
export default config;