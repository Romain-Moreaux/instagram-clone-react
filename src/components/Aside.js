import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Avatar, Button } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import { UserContext } from '../App'
import { db } from '../init-firebase'

const useStyles = makeStyles((theme) => ({
  aside: {
    ...theme.displays.flexColumn,
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  suggestionsBox: {
    ...theme.displays.flexColumn,
    padding: theme.spacing(0, 2),
  },
  header: {
    ...theme.displays.flexAlignCenter,
    marginBottom: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  title: {
    color: theme.palette.primary.greyDark,
    marginBottom: theme.spacing(2),
  },
  userList: {
    ...theme.displays.flexColumn,
  },
  subscriberBox: {
    ...theme.displays.flexAlignCenter,
    marginBottom: theme.spacing(2),
  },
  button: {
    color: theme.palette.primary.blue,
    fontWeight: 600,
    marginLeft: 'auto',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

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
