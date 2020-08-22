import React, { useContext } from 'react'
import { makeStyles, Avatar } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import { UserContext } from '../App'

const useStyles = makeStyles({
  aside: {
    marginLeft: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  suggestionsBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px 12px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '6px',
  },
  title: {
    color: '#8e8e8e',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
  },
})

function Aside(props) {
  const classes = useStyles(props)
  const user = useContext(UserContext)

  return (
    <aside className={classes.aside}>
      <div className={classes.suggestionsBox}>
        <header className={classes.header}>
          <Avatar
            src={avatarImg}
            alt="Romain Moreaux"
            className={classes.avatar}
          />
          <h3>{user?.displayName}</h3>
        </header>
        <h4 className={classes.title}>Suggestions for you</h4>
        <div className={classes.userList}></div>
      </div>
    </aside>
  )
}

export default Aside
