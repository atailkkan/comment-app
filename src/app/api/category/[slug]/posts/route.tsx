import Category from "@/models/category";
import Post from "@/models/post";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const category = await Category.findOne({ where: { slug: slug } });
    const posts = await Post.findAll({ where: { category_id: category?.dataValues.id } });
    return Response.json(posts);
}
