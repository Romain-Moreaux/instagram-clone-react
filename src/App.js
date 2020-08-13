import React, { useState, useEffect } from 'react'
import './App.css'
import InstaLogo from './images/logo_insta.png'
import Post from './components/post/Post'
import { db } from './init-firebase'

const draftDatas = [
  {
    caption: 'Whaou it works',
    username: 'Moreaux Romain',
    imageUrl:
      'https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117288606_317013972784626_2838647863132176500_n.jpg?_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=qKpobtYmD-AAX9Nr2Bd&oh=2d2beb2b4b3711bcf8eaaf9fe7e34c60&oe=5F5CCB0F',
  },
  {
    caption: 'villa Savoye',
    username: 'Géraldine Moriamé',
    imageUrl:
      'https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117406441_696371014251331_308603981686645960_n.jpg?_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=J1F5_qMs7ocAX9Tslme&oh=bce007d896d62505f1e0c48fffb4bd18&oe=5F5F7957',
  },
  {
    caption: 'Awesome way to train frontend development',
    username: 'Tito malte',
    imageUrl:
      'https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-15/e35/117353395_4158041650934816_3068225322505517041_n.jpg?_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=TwC-4TFkwvYAX8fHcl3&oh=efe8c9f17f1b807726dae290b9b2843c&oe=5F5D8D62',
  },
]

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    )
  }, [])
  console.log(posts)

  return (
    <div className="app">
      <div className="app__header">
        <img src={InstaLogo} alt="" className="app__headerImage" />
      </div>
      <h1>Instagram clone React</h1>
      {posts &&
        posts.map(({ post, id }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
    </div>
  )
}

export default App
