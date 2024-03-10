import Form from "./Form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {

    async function registerUser(user: any) {
        "use server"
        const request = await fetch(`http://localhost:3000/api/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const result = await request.json();
        return result;
    }

    const isLogin = cookies().get("User");
    isLogin && redirect("/");

    return <Form registerUser={registerUser} />;
}
