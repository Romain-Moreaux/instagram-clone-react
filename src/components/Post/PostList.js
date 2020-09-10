// dependances
import React, { useState, useEffect } from 'react'
// components
import Post from './'
// bdd
import { usePost } from './usePost'

export function PostList({ css }) {
  const $post = usePost()
  const [postList, setPostList] = useState()

  useEffect(() => {
    if (!postList) {
      let unsubscribe = $post.list(setPostList)

      return () => unsubscribe()
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
            setPostList={setPostList}
          />
        )
      })}
    </section>
  )
}
