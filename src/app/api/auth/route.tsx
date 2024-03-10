import User from "@/models/user";
import { Op } from "sequelize";

export async function POST(request: Request) {
    const { username, password } = await request.json();
    
    let result: any = {};

    try {
        const hasUser = await User.findOne({
            where: {
                [Op.and]: [
                    { username },
                    { password }
                ]
            }
        });

        if(hasUser === null) {
            result = { type: "error", title: "Error", message: "User not found", isUser: false }
        } else {
            result = { type: "success", title: "Success", message: "User logged in successfully. You'll redirect in 3 seconds...", user: hasUser, isUser: true }
        }

    } catch (error: any) {
        result = { type: "error", title: "Error", message: error.message, isUser: false }
    }

    return Response.json(result);
}