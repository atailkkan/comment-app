import Post from "@/models/post";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const category = await Post.findOne({ where: { slug } });
    return Response.json(category);
}