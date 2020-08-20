// dependances
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Post from './Post'
// bdd
import { db } from '../init-firebase'

const useStyles = makeStyles({
  listPosts: {},
})

export default function PostList() {
  const classes = useStyles()
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
    <div className={classes.listPosts}>
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
    </div>
  )
}
