import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

// Chunks
export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
    const response = await client.get('fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk('/posts/addNewPost', async (initialPost) => {
    const response = await client.post('fakeApi/posts', {post: initialPost})
    return response.post
})

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
                existingPost.reactions[reaction]*=11
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
          state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
      }
})

// Selectors
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { postAdded, postUpdated, reactionAdded } = PostsSlice.actions

export default PostsSlice.reducer