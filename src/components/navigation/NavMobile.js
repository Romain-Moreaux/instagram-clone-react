// dependances
import React from 'react'
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
} from '@material-ui/core'
// images
import avatarImg from '../../images/avatar1.jpg'
import { ReactComponent as AddSvg } from '../../images/add.svg'
import { ReactComponent as SettingsSvg } from '../../images/settings.svg'
import { ReactComponent as HomeSvg } from '../../images/home.svg'

const useStyles = makeStyles((theme) => ({
  navigation: {
    ...theme.displays.showOnMobile,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: theme.borders[0],
  },
  icon: { width: 24, height: 24 },
  user: { border: theme.borders[0] },
}))

function NavBottom() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.navigation}
    >
      <BottomNavigationAction
        className={classes.test}
        icon={<HomeSvg className={classes.icon} />}
      />
      <BottomNavigationAction icon={<SettingsSvg className={classes.icon} />} />
      <BottomNavigationAction icon={<AddSvg className={classes.icon} />} />
      <BottomNavigationAction
        icon={
          <Avatar
            src={avatarImg}
            alt="Romain Moreaux"
            className={classes.icon}
          />
        }
      />
    </BottomNavigation>
  )
}

export default NavBottom
