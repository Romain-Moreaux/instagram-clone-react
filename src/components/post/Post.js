import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar'
import avatarImg from '../../images/avatar1.jpg'

function Post({ imageUrl, username, caption }) {
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
    </div>
  )
}

export default Post
