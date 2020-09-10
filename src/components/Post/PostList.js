// dependances
import React, { useState, useEffect } from 'react'
// components
import Post from './'
// bdd
import { usePost } from './usePost'

export function PostList({ css }) {
  const $post = usePost()
  const [postList, setPostList] = useState([])

  useEffect(() => {
    let unsubscribe

    if (!postList.length) {
      unsubscribe = $post.list(setPostList)

      return () => {
        console.log('unsubscribe')
        unsubscribe()
      }
    }
  }, [$post, postList])

  return (
    <section className={css}>
      {postList?.map(({ post, id }) => {
        return (
          <Post
            key={id}
            postId={id}
            author={post.author}
            caption={post.caption}
            imageUrl={post.imageUrl}
            timestamp={post.timestamp}
            ownerUid={post.ownerUid}
          />
        )
      })}
    </section>
  )
}
