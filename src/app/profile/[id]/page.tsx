export default function ProfilePage({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-semibold mb-4">Hey!
                <span className="p-1 ml-2 rounded bg-orange-500">{params.id}</span></h1>
        </div>
    )
}