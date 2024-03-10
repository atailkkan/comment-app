import User from "@/models/user";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const userId = params.id;
    const user = await User.findOne({ where: { id: userId } });
    return Response.json(user);
}