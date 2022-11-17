import Link from "next/link";
import config from "../../../config.json"
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../../components/Form";
import { useAppDispatch } from "../../../redux/hook";
import { updatePosts } from "../../../redux/postSlice";

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
    const dispatch = useAppDispatch();
    const [post, setPost] = useState<Post>({
        id: Number(pid),
        title: '',
        body: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);

    const fetchData = async () => {
        const data = await (await fetch(config.API_URL + '/' + pid)).json();
        setPost(data);
    }
    const handleUpdatePost = async (title: string, body: string) => {
        const id = Number(pid);
        dispatch(updatePosts({ id, title, body }))
    }
    const onSubmitForm = (e: any) => {
        e.preventDefault();
        const inputValue = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        if (!inputValue.title || !inputValue.body) setIsFail(true), setIsSuccess(false);
        if (inputValue.title && inputValue.body) handleUpdatePost(inputValue.title, inputValue.body)
        .then(() => { setIsSuccess(true), setIsFail(false) })
        .catch(err => console.log(err));

    }
    useEffect(() => {
        if (!router.isReady) return;
        fetchData()
    }, [router.isReady]);
    return (
        <>
            <Form headerForm="Update Form" id={post.id} title={post.title} isFail={isFail} titleRef={titleRef} bodyRef={bodyRef} body={post.body} isSuccess={isSuccess} submitForm={onSubmitForm} />
        </>
    );
}
export default UpdatePost