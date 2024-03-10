import Transition from "@/app/components/Transition";
import Card from "./components/Card";

export default async function Main({ getAllPosts }: { getAllPosts: any }) {
    return (
        <main className="w-full flex flex-col flex-grow">
            <Transition>
                <div className="w-full main-header">
                    <div className="author-info">
                        <h2 className="w-full text-[300%] font-semibold leading-[1.25] mb-4">Hello my friends. I am Nathan.</h2>
                        <p className="max-w-[900px] w-full text-[150%]">Sed pellentesque eros urna, quis laoreet ante dapibus at. Duis lacinia massa hendrerit.</p>
                    </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-x-8 gap-y-16 py-20 post-group">
                    {
                        (await getAllPosts()).map((post: any, i: number) => (
                            <Card key={i} post={post} />
                        ))
                    }
                </div>
            </Transition>
        </main>
    );
}
