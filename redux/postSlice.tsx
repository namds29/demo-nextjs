import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PostState {
    posts: any[];
    status: 'idle' | 'loading' | 'failed';
}
type Post = {
    id?: number,
    title?: string;
    body?: string;
}
const initialState: PostState = {
    posts: [{
        id: 13,
        title: 'string',
        body: 'abcxyz',
    }],
    status: 'idle',
};
export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        deletePost: (state, action) => {
            state.posts.filter(item => item.id != action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(addPosts.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(addPosts.fulfilled, (state, action) => {
            state.posts.push(action.payload);
            state.status = 'idle';
        });

        builder.addCase(updatePosts.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(updatePosts.fulfilled, (state, action) => {
            let currentPost = state.posts.find(item => item.id == action.payload.id);
            currentPost = action.payload
            state.status = 'idle';
        })
    }
});
export const addPosts = createAsyncThunk('posts/addPosts', async (newPost: Post) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const data = await res.json();
    return data
})
export const updatePosts = createAsyncThunk('posts/updatedPosts', async (updatedPost: Post) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const data = await res.json();
    console.log(data);
    return data
})
export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer