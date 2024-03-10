import Main from "./Main";

export default async function Page() {

    async function getAllPosts() {
        const response = await fetch(`http://localhost:3000/api/post`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const posts = await response.json();
        return posts;
    }

    return <Main getAllPosts={getAllPosts} />;
}