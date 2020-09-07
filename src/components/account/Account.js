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
  page: {
    ...theme.displays.flexColumn,
    flex: 1,
    justifyContent: 'center',
  },
  navigation: {
    marginTop: 'auto',
  },
  settings: { backgroundColor: 'orange' },
}))

function Account() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <div className={classes.page}>
      <div className={classes.settings}></div>
      <div className={classes.navigation}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction icon={<HomeSvg />} />
          <BottomNavigationAction icon={<SettingsSvg />} />
          <BottomNavigationAction icon={<AddSvg />} />
          <BottomNavigationAction
            icon={
              <Avatar
                src={avatarImg}
                alt="Romain Moreaux"
                className={classes.user}
              />
            }
          />
        </BottomNavigation>
      </div>
    </div>
  )
}

export default Account
