import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Avatar, Button } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import { UserContext } from '../App'
import { db } from '../init-firebase'

const useStyles = makeStyles({
  aside: {
    marginLeft: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: 340,
  },
  suggestionsBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  avatar: {
    marginRight: '6px',
  },
  title: {
    color: '#8e8e8e',
    marginBottom: '12px',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
  },
  subscriberBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  button: {
    color: '#0095f6',
    fontWeight: 600,
    marginLeft: 'auto',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})

function Aside(props) {
  const classes = useStyles(props)
  const user = useContext(UserContext)
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    db.collection('subscribers')
      .orderBy('displayName', 'desc')
      .onSnapshot((snapshot) =>
        setSubscribers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            subscriber: doc.data(),
          }))
        )
      )
  }, [])

  return (
    <aside className={classes.aside}>
      <div className={classes.suggestionsBox}>
        {user && (
          <header className={classes.header}>
            <Avatar
              src={avatarImg}
              alt="Romain Moreaux"
              className={classes.avatar}
            />
            <h3>{user?.displayName}</h3>
          </header>
        )}

        <h4 className={classes.title}>Suggestions for you</h4>
        <div className={classes.userList}></div>
        {subscribers?.map(({ subscriber, id }) => (
          <div key={id} className={classes.subscriberBox}>
            <Avatar
              src={avatarImg}
              alt={subscriber.displayName}
              className={classes.avatar}
            />
            <p>{subscriber.displayName}</p>
            <Button
              className={classes.button}
              onClick={() => console.log('clicked Follow')}
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Aside
