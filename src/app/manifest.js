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
                src: "/assets/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/assets/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
    }
}