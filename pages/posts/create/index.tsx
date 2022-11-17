
import Link from "next/link";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Form from "../../../components/Form";
import { useAppDispatch } from "../../../redux/hook";
import { addPosts } from "../../../redux/postSlice";

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
    const [isFail, setIsFail] = useState(false);
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        const inputValue = {
            id: Number(Math.floor(Math.random() * 1000)),
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        if(!inputValue.title || !inputValue.body) setIsFail(true), setIsSuccess(false);   
        if(inputValue.title && inputValue.body) dispatch(addPosts(inputValue)).then(() => {setIsSuccess(true), setIsFail(false)}).catch(err => console.log(err));
    }

    return (
        <>
            <Form headerForm="Create Form" id={post.id} title={post.title} isFail={isFail} titleRef={titleRef} bodyRef={bodyRef} body={post.body} isSuccess={isSuccess} submitForm={onSubmitForm} />
        </>
    );
}
export default CreatePost