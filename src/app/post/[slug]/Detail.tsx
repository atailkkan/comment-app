import Transition from "@/app/components/Transition";
import Comment from "./Comment";

export default async function Detail({ getPostBySlug }: { getPostBySlug: any }) {
    return (
        <main className="w-full flex flex-col flex-grow">
            <Transition>
                <div className="w-full main-header">
                    <div className="category-info">
                        <h2 className="w-full text-[300%] text-center font-semibold leading-[1.25] mb-16 capitalize">{(await getPostBySlug()).title}</h2>
                        <div className="w-full h-[400px] m-auto mb-16 post-image">
                            <img src={`/${(await getPostBySlug()).image}`} alt="" className="w-full h-full object-cover rounded-[40px]" />
                        </div>
                        <p className="max-w-[900px] w-full m-auto text-[150%]">{(await getPostBySlug()).detail}</p>
                    </div>
                    <div className="comment-section">
                        <Comment postId={(await getPostBySlug()).id} />
                    </div>
                </div>
            </Transition>
        </main>
    )
}
