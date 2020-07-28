import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {nanoid} from '@reduxjs/toolkit'
import { postAdded } from './PostsSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title: title,
                    content: content
                })
            )

            setTitle('')
            setContent('')
        }
    }

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
                />

                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button" onClick={onSavePostClicked}>Save</button>
            </form>
        </section>
    )
}