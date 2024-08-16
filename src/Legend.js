import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InfoIcon from '@material-ui/icons/Info'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  heading: {
    color: 'White',
    textAlign: 'center'
  },
  iconContainer: {
    cursor: 'pointer',
    minWidth: 28,
    overflow: 'visible',
    position: 'relative',
    '&:hover .hidden': {
      visibility: 'visible'
    }
  },
  infoIcon: {
    color: 'LightGray',
    marginTop: 4
  },
  listItem: {
    alignItems: 'flex-start',
    width: '100%'
  },
  listItemTextRoot: {
    marginBottom: 0,
    marginRight: 8,
    marginTop: 0
  },
  primaryText: {
    color: 'White'
  },
  secondaryText: {
    color: 'LightGray'
  },
  swatchContainer: {
    minWidth: 40
  },
  toolTip: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    boxShadow: '2px 2px 4px rgba(51, 51, 51, 0.9)',
    boxSizing: 'border-box',
    color: 'White',
    display: 'flex',
    fontSize: '0.8rem',
    maxWidth: 128,
    minWidth: 128,
    padding: 8,
    position: 'absolute',
    right: 36,
    top: 0,
    visibility: 'hidden',
    zIndex: 100
  }
}))

export default function Legend () {
  const classes = useStyles()
  const items = AqiApi.aqiMatrix

  // remove comment to suppress 'beyond aqi' category
  // items.pop()

  return (
    <>
      <Typography
        classes={{ root: classes.heading }}
        component="h3"
        variant="subtitle2"
      >
        Air Quality Index
      </Typography>
      <List
        component="ul"
        dense
        disablePadding
      >
        {items.map((l, i) => (
          <React.Fragment key={i}>
            <ListItem classes={{ root: classes.listItem }}>
              <ListItemIcon
                classes={{ root: classes.swatchContainer }}
              >
                <FiberManualRecordIcon
                  fontSize="large"
                  style={{ color: l.colors.bg.cssHex }}
                />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.primaryText,
                  root: classes.listItemTextRoot,
                  secondary: classes.secondaryText
                }}
                primary={l.level}
                secondary={l.range}
              />
              <ListItemIcon classes={{ root: classes.iconContainer }}>
                <InfoIcon
                  classes={{ root: classes.infoIcon }}
                  fontSize="small"
                />
                <div
                  className={classes.toolTip + ' hidden'}
                >
                  {l.whoAffected}
                </div>
              </ListItemIcon>
            </ListItem>
          </React.Fragment>
        ))
        }
      </List>
    </>
  )
}
