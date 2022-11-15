import { useEffect, useState } from "react";

type Post = {
    headerForm: string,
    id?: number,
    title?: string,
    body?: string,
    isSuccess: boolean,
    titleRef?: any;
    bodyRef?: any;
    submitForm: (e: any) => void,
}
export default function Form({ headerForm, id, title, body, isSuccess, titleRef, bodyRef, submitForm }: Post) {
    const [txtReport, setTxtReport] = useState('');
    useEffect(() => {
        (headerForm == 'Update Form' && isSuccess) ? setTxtReport('Updated') : setTxtReport('Created')
    }, [isSuccess])
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="mb-8 relative rounded border-slate-300">
                    <div className="h-full border ">
                        {isSuccess && <h1 className="text-center text-lime-600 pt-4 ">{txtReport} Successful</h1>}
                        <div className="p-4 text-center text-2xl">{headerForm}</div>
                        <div className="text-center border-b bg-rose-200"></div>
                        {headerForm !== 'Create Form' && <h2 className="p-4"><span className="font-bold">Post</span>: {id} </h2>}
                        <form onSubmit={submitForm}>
                            <div className="p-4">
                                <label htmlFor="title">Title:</label> <br />
                                <input className="pl-2 w-full border border-indigo-600 rounded" type="text"
                                    defaultValue={title} ref={titleRef} />
                            </div>
                            <div className="p-4">
                                <label htmlFor="body">Body:</label> <br />
                                <input className="pl-2 w-full border border-indigo-600 rounded" type="text"
                                    defaultValue={body} ref={bodyRef} />
                            </div>
                            <div className="p-4 text-center">
                                <button className="rounded border bg-lime-300 px-4" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
