"use client"

export default function Error({ error }: { error: Error }) {
    return (
        <main className="w-full flex flex-col justify-center flex-grow">
            <div className="w-full text-center main-header">
                <div className="author-info">
                    <h2 className="w-full text-[600%] font-semibold leading-[1]">Error</h2>
                    <p className="max-w-[900px] w-full m-auto text-[150%]">{error.message}</p>
                </div>
            </div>
        </main>
    );
}
