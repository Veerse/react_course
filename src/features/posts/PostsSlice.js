import {createSlice, nanoid} from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    {id: '1', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {
        thumbsUp: 2,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      }, title: 'First post my man', content: 'Hello world', userId: '1'},
    {id: '2', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 1,
        rocket: 0,
        eyes: 0,
      }, title: 'Neptis para ignis', content: 'Damnatio memoriae', userId: '3'},
]

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return  {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(

                        ),
                        title,
                        content,
                        userId,
                        reactions:{
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        },
                    }
                }
            }
        },
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
                existingPost.reactions[reaction]*=11
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = PostsSlice.actions

export default PostsSlice.reducer