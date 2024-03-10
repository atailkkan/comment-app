import User from "@/models/user";
import { uid } from "uid";

export async function POST(request: Request) {
    const id = uid(32);
    const { firstname, lastname, username, password } = await request.json();

    let result: any = {};

    try {
        const hasUser = await User.findOne({ where: { username } });
        if(hasUser !== null) {
            result = { type: "warn", title: "Warning", message: "This user has been added before" }
            return Response.json(result);
        }
        await User.create({ id, firstname, lastname, username, password });
        result = { type: "success", title: "Success", message: "User registered successfully" };
    } catch (error: any) {
        result = { type: "error", title: "Error", message: error.message }
    }

    return Response.json(result);
}