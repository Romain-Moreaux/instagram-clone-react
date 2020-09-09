// dependances
import React, { useState, useEffect } from 'react'
// components
import Post from './'
// bdd
import { usePost } from './usePost'

export function PostList({ css }) {
  const [postList, setPostList] = useState([])
  const post = usePost()

  const [single, setSingle] = useState(null)

  useEffect(() => {
    if (!single) setSingle(post.get('NmWUKOoGrdslgnh86wzF'))
  }, [setSingle, post])

  useEffect(() => {
    if (!postList.length) {
      var unsubscribe = post.getList(setPostList)
    }
    return () => {
      console.log('unsubscribe')
      unsubscribe()
    }
  }, [post, postList])

  console.log('single', single)
  return (
    <section className={css}>
      {postList?.map(({ post, id }) => (
        <Post
          key={id}
          postId={id}
          author={post.author}
          caption={post.caption}
          imageUrl={post.imageUrl}
          timestamp={post.timestamp}
          ownerUid={post.ownerUid}
        />
      ))}
    </section>
  )
}
