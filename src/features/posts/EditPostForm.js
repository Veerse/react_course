import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './PostsSlice'

export const EditPostForm = ({match}) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({id: postId, title: title, content}))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit post {post.postId}</h2>
            <form>
                <label htmlFor="postTitle">Post title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                    autoComplete="off"
                />
                <label htmlFor="postContent">Post content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                    autoComplete="off"
                />
                <button type="button" onClick={onSavePostClicked}>
                    Save post
                </button>
            </form>
        </section>
    )
}