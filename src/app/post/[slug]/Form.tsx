import FormInput from "./FormInput";
import { cookies } from "next/headers";
import Link from "next/link";
import { uid } from "uid";
import Cryptr from "cryptr";

export default function Form({ postId }: { postId: any }) {

    async function addComment(txt: string) {
        "use server"

        const user = cookies().get("User")?.value;
        const cryptr = new Cryptr('SECRET_KEY', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
        const decryptValue: any = cryptr.decrypt(JSON.stringify(user));

        const comment = {
            id: uid(32),
            parent_id: "0",
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

    return (
        <div className="comment-input mt-4">
            {
                cookies().get("User") ? 
                    <FormInput addComment={addComment} /> :
                    <p className="w-full text-red-500 text-center mt-1">
                        <i className="ri-error-warning-line mr-2"></i>
                        <span>You should <Link href="/user/login" className="font-semibold underline decoration-dotted hover:text-black">login</Link> before write a comment.</span>
                    </p>
            }
        </div>
    )
}
