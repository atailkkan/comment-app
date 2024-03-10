"use client"

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutButton() {

    const router = useRouter();

    function logoutUser() {
        deleteCookie("User");
        router.refresh();
        setTimeout(() => {
            router.push("/");
        }, 100);
    }

    return (
        <div className="bg-red-300 hover:bg-red-400 block font-semibold px-8 py-4 rounded-xl cursor-pointer" onClick={() => logoutUser()}>Logout</div>
    )
}
