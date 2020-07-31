import React from 'react'
import { useSelector } from 'react-redux'
import { PostAuthor } from './PostAuthor'
import { Link } from 'react-router-dom'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostList = () => {
    const posts = useSelector(state => state.posts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
            <p>{post.content.substring(0,100)}</p>
            <ReactionButtons post={post}/>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View post
            </Link>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}