import React, { useState, useEffect } from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar'
import avatarImg from '../../images/avatar1.jpg'
import { db } from '../../init-firebase'
import { firestore } from 'firebase'

function Post({ user, postId, imageUrl, username, caption }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState([])

  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }

    return () => {
      unsubscribe()
    }
  }, [postId])

  const postComment = (e) => {
    e.preventDefault()

    db.collection('posts').doc(postId).collection('comments').add({
      username: user.displayName,
      text: comment,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
    setComment('')
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={avatarImg} alt="Romain Moreaux" className="post__avatar" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <span className="post__textUsername">{username} :</span> {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment, i) => (
          <p key={i} className="post__commentText">
            <span className="post__commentUsername">{comment.username}</span>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="enter a comment ..."
          />
          <button
            type="submit"
            onClick={postComment}
            disabled={!comment}
            className="post__button"
          >
            comment
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
