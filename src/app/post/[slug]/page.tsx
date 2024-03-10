import Detail from "./Detail";

export default async function Page({ params }: { params: { slug: string } }) {

    const slug = params.slug;

    async function getPostBySlug() {
        const request = await fetch(`http://localhost:3000/api/post/${slug}`, {
            cache: "no-store",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const post = await request.json();
        return post;
    }

    return <Detail getPostBySlug={getPostBySlug} />;
}
