import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full m-auto text-[125%] flex flex-wrap items-center justify-between mt-20 social-media">
            <div className="max-w-[900px] w-full m-auto grid grid-cols-4 gap-4">
                <Link href="#" className="col-span-1 bg-slate-200 hover:bg-lime-300 flex items-center justify-center p-3 rounded-2xl">
                    <i className="ri-facebook-line"></i>
                </Link>
                <Link href="#" className="col-span-1 bg-slate-200 hover:bg-lime-300 flex items-center justify-center p-3 rounded-2xl">
                    <i className="ri-google-line"></i>
                </Link>
                <Link href="#" className="col-span-1 bg-slate-200 hover:bg-lime-300 flex items-center justify-center p-3 rounded-2xl">
                    <i className="ri-linkedin-line"></i>
                </Link>
                <Link href="#" className="col-span-1 bg-slate-200 hover:bg-lime-300 flex items-center justify-center p-3 rounded-2xl">
                    <i className="ri-github-line"></i>
                </Link>
            </div>
        </div>
    )
}
