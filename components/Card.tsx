import Link from "next/link";

interface Props {
    id: number;
    userId: number;
    title: string;
    body: string;
    handleDelete: (id: number) => void;
}
const Card = ({ userId, id, title, body, handleDelete }: Props) => {

    return (
        <>
            <div className="w-40 mb-8 relative">
                <div className="h-full border border-slate-300 rounded">
                    <div className="text-center border-b bg-rose-200"><Link href={'/posts/' + id}>View detail</Link></div>
                    <h2 className="p-4 border-b"><span className="font-bold">Post</span>: {id}</h2>
                    <h2 className="p-4"><span className="font-bold">Title</span>: <br /> {title}</h2>
                </div>
                <button className="w-5 h-5 rounded-full bg-rose-500 text-slate-50 flex justify-center items-center absolute"
                    style={{ top: -11, right: -11 }} onClick={() => handleDelete(id)}>x</button>
            </div>
        </>
    );
}
export default Card