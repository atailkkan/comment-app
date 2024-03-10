import Form from "./Form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

    async function loginUser(user: { username: string, password: string }) {
        "use server"
        const request = await fetch(`http://localhost:3000/api/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const result = await request.json();
        return result;
    }

    const isLogin = cookies().get("User");
    isLogin && redirect("/");

    return <Form loginUser={loginUser} />;
}