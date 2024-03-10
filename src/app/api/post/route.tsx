import Post from "@/models/post";

export async function GET() {
    const posts = await Post.findAll();
    return Response.json(posts);
}