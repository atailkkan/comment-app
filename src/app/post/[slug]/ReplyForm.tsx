import ReplyFormInput from "./ReplyFormInput";
import { cookies } from "next/headers";
import { uid } from "uid";
import Cryptr from "cryptr";

export default async function ReplyForm({ parentId, postId }: { parentId: string, postId: string }) {

    async function addReply(txt: string) {
        "use server"

        const user = cookies().get("User")?.value;
        const cryptr = new Cryptr('SECRET_KEY', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
        const decryptValue: any = cryptr.decrypt(JSON.stringify(user));

        const comment = {
            id: uid(32),
            parent_id: parentId,
            post_id: postId,
            user_id: (JSON.parse(decryptValue)).id,
            text: txt,
            is_approval: 1
        }

        const response = await fetch(`http://localhost:3000/api/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        });

        const result = await response.json();
        return result;
    }

    return cookies().get("User") && <ReplyFormInput addReply={addReply} />;
}