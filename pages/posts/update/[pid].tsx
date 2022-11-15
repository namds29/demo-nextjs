import Link from "next/link";
import config from "../../../config.json"
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../../components/Form";

type Post = {
    id?: number,
    title?: string;
    body?: string;
}
const UpdatePost = () => {
    const router = useRouter();
    const { pid } = router.query;
    const titleRef = useRef<any>();
    const bodyRef = useRef<any>();

    const [post, setPost] = useState<Post>({
        id: Number(pid),
        title: '',
        body: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchData = async () => {
        const data = await (await fetch(config.API_URL + '/' + pid)).json();
        setPost(data);
    }
    const handleUpdatePost = async (title: string, body: string) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${pid}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: pid,
                title: title,
                body: body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(() => setIsSuccess(true)).catch(error => console.log(error));
    }
    const onSubmitForm = (e: any) => {
        e.preventDefault();
        const inputValue = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        handleUpdatePost(inputValue.title, inputValue.body);
    }
    useEffect(() => {
        if (!router.isReady) return;
        fetchData()
    }, [router.isReady]);
    return (
        <>
            <Form headerForm="Update Form" id={post.id} title={post.title} titleRef={titleRef} bodyRef={bodyRef} body={post.body} isSuccess={isSuccess} submitForm={onSubmitForm} />
        </>
    );
}
export default UpdatePost