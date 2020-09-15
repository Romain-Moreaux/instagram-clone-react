// dependances
import React from 'react'
// components
import Post from './'
// bdd
import { useFirestoreSubscribe } from '../hooks'
import { db } from '../../init-firebase'

export function PostList({ css }) {
  const { data, status, error } = useFirestoreSubscribe(
    db.collection('posts').orderBy('createdAt', 'desc')
  )

  return (
    <section className={css}>
      {status === 'error' ? (
        <p>{error.message}</p>
      ) : status === 'loading' ? (
        <p>content is loading...</p>
      ) : (
        data?.map(({ author, caption, imageUrl, createdAt, ownerUid, id }) => {
          return (
            <Post
              key={id}
              postId={id}
              author={author}
              caption={caption}
              imageUrl={imageUrl}
              createdAt={createdAt}
              ownerUid={ownerUid}
            />
          )
        })
      )}
    </section>
  )
}
