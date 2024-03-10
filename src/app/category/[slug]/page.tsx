import Posts from "./Posts";

export default async function Page({ params }: { params: { slug: string } }) {

    const { slug } = params;

    async function getCategoryBySlug() {
        const request = await fetch(`http://localhost:3000/api/category/${slug}`, {
            cache: "no-store",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const category = await request.json();
        return { title: category.title, detail: category.detail }
    }

    async function getPostsByCategorySlug() {
        const request = await fetch(`http://localhost:3000/api/category/${slug}/posts`, {
            cache: "no-store",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const posts = await request.json();
        return posts;
    }

    return <Posts getCategoryBySlug={getCategoryBySlug} getPostsByCategorySlug={getPostsByCategorySlug} />;
}
