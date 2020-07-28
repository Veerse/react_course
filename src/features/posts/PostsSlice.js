import {createSlice} from '@reduxjs/toolkit'


const initialState = [
    {id: '1', title: 'First post my man', content: 'Hello world'},
    {id: '2', title: 'Neptis para ignis', content: 'Damnatio memoriae'},
]

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.push (action.payload)
        },
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postUpdated } = PostsSlice.actions

export default PostsSlice.reducer