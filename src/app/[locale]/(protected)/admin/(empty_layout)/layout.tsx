export default async function AdminEmptyLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-6  w-full px-4 pt-8">
            {children}
        </div>
    )
}