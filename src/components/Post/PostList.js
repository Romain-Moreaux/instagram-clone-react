// dependances
import React, { useState, useEffect } from 'react'
// components
import Post from './'
// bdd
import { db } from '../../init-firebase'

export function PostList({ css }) {
  const [posts, setPosts] = useState()

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      )
  }, [])

  return (
    <section className={css}>
      {posts?.map(({ post, id }) => (
        <Post
          key={id}
          postId={id}
          author={post.author}
          caption={post.caption}
          imageUrl={post.imageUrl}
          timestamp={post.timestamp}
          authorId={post.authorId}
        />
      ))}
    </section>
  )
}
