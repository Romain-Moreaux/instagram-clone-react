// dependances
import React from 'react'
import { makeStyles, Typography, Box, Tab, Tabs } from '@material-ui/core'
// Components
import Header from '../Header'
import NavBottom from '../navigation/NavMobile'
import Footer from '../Footer'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 0),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  menu: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: theme.borders[0],
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  indicator: { left: 0, backgroundColor: theme.palette.primary.black },
  tab: { textTransform: 'none', textAlign: 'left', fontFamily: 'inherit' },
  label: {
    alignItems: 'flex-start',
  },
  selected: { fontWeight: 600 },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function Settings() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.menu}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs"
              classes={{ indicator: classes.indicator, root: classes.tabs }}
            >
              <Tab
                classes={{
                  root: classes.tab,
                  wrapper: classes.label,
                  selected: classes.selected,
                }}
                label="Update profile"
                {...a11yProps(0)}
              />
              <Tab
                classes={{ root: classes.tab, wrapper: classes.label }}
                label="Change password"
                {...a11yProps(1)}
              />
              <Tab
                classes={{ root: classes.tab, wrapper: classes.label }}
                label="Manage contact"
                {...a11yProps(2)}
              />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.panel}>
              Update profile
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.panel}>
              Change password
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.panel}>
              Manage contact
            </TabPanel>
          </div>
        </div>
      </div>
      <Footer />
      <NavBottom />
    </>
  )
}

export default Settings
