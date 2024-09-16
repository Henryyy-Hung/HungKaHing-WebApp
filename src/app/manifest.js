export default function manifest() {
    return {
        name: 'Henry Hung',
        short_name: 'Henry',
        description: 'Henry\'s personal website',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}