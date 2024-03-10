import Comment from "@/models/comment";

export async function POST(request: Request) {
    const { id, parent_id, post_id, user_id, text, is_approval } = await request.json();
    let result: any = {}; 
    await Comment.create({ id, parent_id, post_id, user_id, text, is_approval });
    result = { type: "success", title: "Success", message: "Your comment has been sended. Please wait for confirmation." }
    return Response.json(result);
}

export async function GET() {
    const comments = await Comment.findAll();
    return Response.json(comments);
}