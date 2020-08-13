import React, { useState, useEffect } from 'react'
import './App.css'
import InstaLogo from './images/logo_insta.png'
import Post from './components/post/Post'
import { db, auth } from './init-firebase'
import { Modal, makeStyles, Button, Input } from '@material-ui/core'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState([])
  const [openSignIn, setOpenSignIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const signUp = (e) => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({ displayName: username })
      )
      .catch((error) => alert(error.message))
    setOpen(false)
  }
  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('authUser', authUser)
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [username, user])

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
  console.log(user)

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <img src={InstaLogo} alt="" className="app__headerImage" />
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <img src={InstaLogo} alt="" className="app__headerImage" />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img src={InstaLogo} alt="" className="app__headerImage" />
        <p>{user && user.displayName}</p>
      </div>
      <h1>Instagram clone React</h1>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        </>
      )}

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
