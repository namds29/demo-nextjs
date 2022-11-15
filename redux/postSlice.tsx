import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "posts",
    initialState: [
        { id: 0, title: '', body: '', userId: 0 }
    ],
    reducers: {
        addPost: (state, action) => {
            state.push(action.payload);
        },
        deletePost: (state, action) =>{
            state.filter(item => item.id != action.payload)
        }
    }
});
export const {addPost, deletePost} = postSlice.actions;
export default postSlice.reducer