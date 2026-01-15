/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: '#fdfbf7',
                    100: '#faf6ed',
                    200: '#f4ead2',
                    300: '#eeddb7',
                    400: '#e2c481',
                    500: '#d6ab4b',
                    600: '#c19a44',
                    700: '#a18038',
                    800: '#81662d',
                    900: '#6a5325',
                },
                rosegold: {
                    50: '#fef5f3',
                    100: '#fdeae7',
                    200: '#fbcbc3',
                    300: '#f8ac9f',
                    400: '#f36e57',
                    500: '#ee300f',
                    600: '#d62b0e',
                    700: '#b3240c',
                    800: '#8f1d09',
                    900: '#751808',
                },
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                serif: ['SF Pro Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.6s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
