import Category from "@/models/category";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const category = await Category.findOne({ where: { slug } });
    return Response.json(category);
}