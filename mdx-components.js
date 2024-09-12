import Image from 'next/image'

export function useMDXComponents(components) {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => (
            <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
        ),
        // use next image to optimize images
        img: ({ src, alt }) => (
            <Image src={src} alt={alt} width={300} height={300} />
        ),
        ...components,
    }
}