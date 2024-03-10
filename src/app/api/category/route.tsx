import Category from "@/models/category";

export async function GET() {
    const categories = await Category.findAll();
    return Response.json(categories);
}