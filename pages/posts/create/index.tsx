
import {useRef, useState } from "react";

import Form from "../../../components/Form";

type Post = {
    id?: number,
    title?: string;
    body?: string;
}
const CreatePost = () => {
    const titleRef = useRef<any>();
    const bodyRef = useRef<any>();
    const [post, setPost] = useState<Post>({
        id: 0,
        title: '',
        body: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCreatePost = async (id: number,title: string, body: string) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                title: title,
                body: body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(() => setIsSuccess(true))
        .catch(error => console.log(error));
    }
    const onSubmitForm = (e: any) => {
        e.preventDefault();
        console.log(post);
        const inputValue = {
            id: Number(Math.floor(Math.random()*1000)),
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        handleCreatePost(inputValue.id,inputValue.title, inputValue.body);
    }

    return (
        <>
            <Form headerForm="Create Form" id={post.id} title={post.title} titleRef={titleRef} bodyRef={bodyRef} body={post.body} isSuccess={isSuccess} submitForm={onSubmitForm} />
        </>
    );
}
export default CreatePost