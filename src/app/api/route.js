export const dynamic = 'force-static'

export const GET = async (request) => {
    const res = await fetch('https://api.vercel.app/blog')
    const data = await res.json()
    return Response.json({ data })
}