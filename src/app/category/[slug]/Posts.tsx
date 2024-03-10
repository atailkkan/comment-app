import Transition from "@/app/components/Transition";
import Card from "@/app/components/Card";

export default async function Posts({ getCategoryBySlug, getPostsByCategorySlug }: { getCategoryBySlug: any, getPostsByCategorySlug: any }) {
    return (
        <main className="w-full flex flex-col flex-grow">
            <Transition>
                <div className="w-full main-header">
                    <div className="category-info">
                        <h2 className="w-full text-[300%] font-semibold leading-[1.25] mb-4 capitalize">{(await getCategoryBySlug()).title}</h2>
                        <p className="max-w-[900px] w-full text-[150%]">{(await getCategoryBySlug()).detail}</p>
                    </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-x-8 gap-y-16 py-20 post-group">
                    {
                        (await getPostsByCategorySlug()).length === 0 ? 
                        
                        <div className="text-red-500 flex">
                            <i className="ri-error-warning-line mr-2"></i>
                            <span>No article in this category.</span>    
                        </div> :

                        (await getPostsByCategorySlug()).map((post: any, i: number) => (
                            <Card key={i} post={post} />
                        ))
                    }
                </div>
            </Transition>
        </main>
    )
}
