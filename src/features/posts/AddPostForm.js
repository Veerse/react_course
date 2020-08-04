import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, addNewPost } from './PostsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onAuthorChange = (e) => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
          try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
              addNewPost({ title, content, user: userId })
            )
            unwrapResult(resultAction)
            setTitle('')
            setContent('')
            setUserId('')
          } catch (err) {
            console.error('Failed to save the post: ', err)
          } finally {
            setAddRequestStatus('idle')
          }
        }
      }

    const usersOptions = users.map (u => (
        <option key={u.id} value={u.id}>
            {u.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a new post</h2>
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

                <label htmlFor="postAuthor">Author:</label>
                <select 
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChange}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                
                <label htmlFor="postContent">Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                    autoComplete="off"
                />
                <button type="button" onClick={onSavePostClicked}>Save</button>
            </form>
        </section>
    )
}