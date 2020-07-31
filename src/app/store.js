import { configureStore } from '@reduxjs/toolkit'
import postsReducer  from '../features/posts/PostsSlice'
import usersReducer  from '../features/users/UsersSilce'

export default configureStore({
  reducer: ({
    posts: postsReducer,
    users: usersReducer
  }),
})
