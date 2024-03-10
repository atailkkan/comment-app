import moment from "moment";
import Form from "./Form";
import ReplyForm from "./ReplyForm";

export default async function Comment({ postId }: { postId: string }) {

    async function getPostComments() {
        const request = await fetch(`http://localhost:3000/api/comment`, {
            cache: "no-store",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const allComments = await request.json();
        
        const postComments = allComments.filter((comment: any) => comment.post_id === postId && comment.is_approval === 1);
        return postComments;
    }

    function commentCount(comments: any) {
        // const filteredComments = comments.filter((comment: any) => comment.parent_id === "0");
        // return filteredComments.length;
        return comments.length;
    }

    async function getUserFullname (id: string) {
        const request = await fetch(`http://localhost:3000/api/user/${id}`, {
            cache: "no-store",
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const user = await request.json();
        return `${user.firstname} ${user.lastname}`;
    }

    function nestedComments(postComments: any, id: string) {
        return postComments.map((item: any, i: number) => {
            if(item.parent_id === id) {
                return (
                    <li key={i}>
                        <div className="w-full flex flex-wrap bg-slate-100 rounded-3xl">
                            <div className="w-[46px] h-[46px] border-2 border-slate-200 rounded-full bg-white flex items-center justify-center text-[100%] text-slate-400 avatar">
                                <i className="ri-user-line"></i>
                            </div>
                            <div className="w-[calc(100%-46px)] text-[80%] pl-2 text">
                                <div className="flex justify-between text-[90%]">
                                    <small>{ getUserFullname(item.user_id) } says,</small>
                                    <small>{ moment(item.created_at).format('DD.MM.YYYY, HH:mm:ss') }</small>
                                </div>
                                <p>{item.text}</p>
                            </div>
                            <ReplyForm parentId={item.id} postId={postId} />
                        </div>
                        <ul>
                            { nestedComments(postComments, item.id) }
                        </ul>
                    </li>
                )
            }
        })
    }

    return (
        <div className="max-w-[900px] w-full m-auto mt-10">
            <h3 className="text-center font-semibold">Post comments <span>({ commentCount(await getPostComments()) })</span></h3>
            <Form postId={postId} />
            <div className="w-full mt-10 comments">
                { (await getPostComments()).length === 0 && <p className="block text-center font-semibold">There are no comments yet on this article.</p> }
                <ul className="w-full">
                    { nestedComments((await getPostComments()), "0") }
                </ul>
            </div>
        </div>
    )
}
