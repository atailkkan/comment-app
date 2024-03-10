import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {

    async function getAllCategories() {
        const request = await fetch(`http://localhost:3000/api/category`, {
            cache: "no-store",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const categories = await request.json();
        return categories;
    }

    function isLogin() {
        const cookie = cookies().get("User");
        if(cookie) {
            return <LogoutButton />;
        } else {
            return <Link href="/user/register" className="bg-orange-300 hover:bg-violet-300 block font-semibold px-8 py-4 rounded-xl">Register</Link>;
        }
    };

    return (
        <nav className="w-full header-nav mb-10">
            <ul className="flex flex-wrap items-center justify-between">
                <li><Link href="/" className="relative pr-6 py-1 block hover:after:absolute hover:after:left-0 hover:after:top-[50%] hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-800">Home</Link></li>
                {
                    (await getAllCategories()).map((category: any, i: number) => (
                        <li key={i}><Link href={`/category/${category.slug}`} className="relative pr-6 block hover:after:absolute hover:after:left-0 hover:after:top-[50%] hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-800">{category.title}</Link></li>
                    ))
                }
                <li>{ isLogin() }</li>
            </ul>
        </nav>
    )
}
