import React, { useState, useEffect } from 'react'
import Post from './components/Post'
import { db, auth } from './init-firebase'
import ImageUpload from './components/ImageUpload'
import InstagramEmbed from 'react-instagram-embed'
import { SignUp, SignIn } from './components/authModals'
import Header from './components/Header'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  app: {
    backgroundColor: '#fafafa',
  },
  main: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  listPosts: {},
  aside: {
    marginLeft: '20px',
  },
})

function App() {
  const [posts, setPosts] = useState()
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const classes = useStyles()

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

  console.log('user', user)
  return (
    <div className={classes.app}>
      <SignUp setOpen={setOpenSignUp} open={openSignUp} />
      <SignIn setOpen={setOpenSignIn} open={openSignIn} />

      <Header
        user={user}
        setOpenSignIn={setOpenSignIn}
        setOpenSignUp={setOpenSignUp}
      />
      <div className={classes.main}>
        <div className={classes.listPosts}>
          {posts?.map(({ post, id }) => (
            <Post
              user={user}
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              timestamp={post.timestamp}
              ouwnerId={post.userId}
            />
          ))}
        </div>
        <div className={classes.aside}>
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
        <ImageUpload user={user} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  )
}

export default App
