
export default async function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <div className="h-18 bg-gray-950" />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] py-12 px-4">
                {children}
            </div>
        </>
    )
}
