import Link from "next/link";

export default async function Card({ post }: { post: any }) {

    async function getCommentsBySlug() {
        const request = await fetch(`http://localhost:3000/api/comment`, {
            cache: "no-store",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const allComments = await request.json();
        const postComments = allComments.filter((comment: any) => comment.post_id === post.id && comment.is_approval === 1);
        return postComments;
    }

    return (
        <div className="col-span-1 post-card">
            <div className="relative w-full pb-[100%] mb-4 post-image">
                <div className="absolute w-[60px] h-[60px] text-[110%] rounded-full bg-white z-10 left-4 bottom-4 flex items-center justify-center count">
                    <i className="ri-discuss-line"></i>
                    <span className="absolute -right-[2px] -top-[2px] w-6 h-6 rounded-full text-[1rem] flex items-center justify-center font-semibold bg-lime-300">{ (await getCommentsBySlug()).length }</span>
                </div>
                <Link href={`/post/${post.slug}`} className="absolute w-[60px] h-[60px] text-[150%] rounded-full bg-white z-10 right-4 top-4 duration-200 hover:translate-x-1 hover:-translate-y-1 flex items-center justify-center"><i className="ri-arrow-right-up-line"></i></Link>
                <img src={`/${post.image}`} className="absolute w-full h-full left-0 top-0 object-cover rounded-[40px]" alt="" />
            </div>
            <h2 className="font-semibold text-[150%] leading-[1.25] mb-4 capitalize hover:underline hover:decoration-dotted post-title"><Link href={`/post/${post.slug}`}>{post.title}</Link></h2>
            <p className="post-excerpt">{(post.detail).slice(0,100)}...</p>
        </div>
    );
}
