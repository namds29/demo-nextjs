import { useEffect, useState } from 'react';
import config from "../../../config.json"
import { useRouter } from 'next/router'
import UpdatePost from '../update/[pid]';
import Link from 'next/link';

interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export default function Posts() {
    const [post, setPost] = useState<Post>()
    const router = useRouter();
    const { pid } = router.query;
    const getData = async () => {
        const data = await (await fetch(config.API_URL + '/' + pid)).json();
        setPost(data);
    }

    useEffect(() => {
        if (!router.isReady) return;
        getData()
    }, [router.isReady]);

    return (
        <>
            <div className="flex items-center justify-center h-screen">

                <div>
                    <div className="w-80 h-full border border-slate-300 rounded">
                        <Link href="/">
                           <div className='text-center' > Homepage</div>
                        </Link>
                        <div className="text-center border-b"></div>
                        <h2 className="p-4 border-b"><span className="font-bold">Post</span>: {post?.id}</h2>
                        <h2 className="p-4"><span className="font-bold">Title</span>: <br /> {post?.title}</h2>
                    </div>
                    <div className="flex border border-slate-300 bg-lime-300 justify-evenly">
                        <Link href={`/posts/update/${post?.id}`}>
                            <button className="w-full hover:text-sky-400 font-bold" >Update</button>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}
