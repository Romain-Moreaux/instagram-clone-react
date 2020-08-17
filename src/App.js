import React, { useState, useEffect } from 'react'
import './App.css'
import Post from './components/Post'
import { db, auth } from './init-firebase'
import ImageUpload from './components/imagesUpload/ImageUpload'
import InstagramEmbed from 'react-instagram-embed'
import { SignUp, SignIn } from './components/authModals'
import Header from './components/Header'

function App() {
  const [posts, setPosts] = useState()
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [user])

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
    <div className="app">
      <SignUp setOpen={setOpenSignUp} open={openSignUp} />
      <SignIn setOpen={setOpenSignIn} open={openSignIn} />

      <Header
        user={user}
        setOpenSignIn={setOpenSignIn}
        setOpenSignUp={setOpenSignUp}
      />
      <div className="app__posts">
        <div className="app__postLeft">
          {posts?.map(({ post, id }) => {
            console.log(
              'post',
              new Date(post.timestamp.seconds * 1000) - new Date(Date.now())
            )
            return (
              <Post
                user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                timestamp={post.timestamp}
              />
            )
          })}
        </div>
        <div className="app__postRight">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  )
}

export default App
