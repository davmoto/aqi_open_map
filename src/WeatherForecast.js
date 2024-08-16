import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NoData from './NoData'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Working from './Working'

const useStyles = makeStyles(theme => ({
  arrowHi: {
    color: 'FireBrick !important',
    fontSize: '1rem',
    marginRight: '.5rem',
    '&::before': {
      content: '"▲"'
    }
  },
  arrowLo: {
    color: 'Blue !important',
    fontSize: '1rem',
    marginRight: '.5rem',
    '&::before': {
      content: '"▼"'
    }
  },
  container: {
    color: 'White',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden',
    width: '100%'
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      overflowY: 'auto'
    }
  },
  day: {
    minWidth: '60%'
  },
  header: {
    zIndex: 2
  },
  heading: {
    color: 'White',
    fontSize: '0.7rem',
    fontWeight: 300,
    letterSpacing: '0.08333em',
    lineHeight: 1,
    paddingBottom: 4,
    paddingLeft: 16,
    textTransform: 'uppercase'
  },
  icon: {
    backgroundSize: 'cover',
    borderRadius: 4,
    display: 'block',
    height: 32,
    width: 32
  },
  iconContainer: {
    cursor: 'pointer',
    height: 32,
    minWidth: 32,
    overflow: 'visible',
    position: 'relative',
    '&:hover .hidden': {
      visibility: 'visible'
    }
  },
  list: {
    marginBottom: 16
  },
  row: {
    paddingBottom: 2,
    paddingTop: 2
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
    lineHeight: 1.3,
    maxWidth: 160,
    minWidth: 160,
    padding: 8,
    position: 'absolute',
    right: 36,
    top: 0,
    visibility: 'hidden',
    zIndex: 100
  }
}))

export default function WeatherForecast ({ campusId }) {
  const classes = useStyles()
  const now = new Date()
  const [elevate, _setElevate] = useState(false)
  const [error, _setError] = useState(null)
  const [periods, _setPeriods] = useState(null)
  const [working, _setWorking] = useState(false)

  const onScroll = (e) => {
    _setElevate(e.target.scrollTop > 0)
  }

  useEffect(() => {
    if (campusId) {
      _setWorking(true)
      AqiApi.getWeatherForecast(campusId)
        .then(data => {
          _setWorking(false)
          _setPeriods(data.periods)
        })
        .catch(error => {
          _setWorking(false)
          _setError(new Error('Weather forecast unavailable'))
          console.error(error)
        })
    }
  }, [campusId])

  return (
    <div className={classes.container}>
      {periods &&
        <>
          <Box
            boxShadow={elevate ? 3 : 0}
            classes={{ root: classes.header }}
          >
            <Typography
              classes={{ root: classes.heading }}
              componenent="h3"
              variant="h6"
            >
              Extended Forecast
            </Typography>
          </Box>
          <div
            className={classes.content}
            onScroll={onScroll}
          >
            <List
              classes={{ root: classes.list }}
              dense
              disablePadding
            >
              {periods.map((p, i) => {
                if (new Date(p.endTime) > now) {
                  return (
                    <ListItem
                      classes={{ root: classes.row }}
                      key={i}
                    >
                      <ListItemText
                        classes={{ root: classes.day }}
                        primary={p.name}
                        primaryTypographyProps={{
                          variant: 'body1'
                        }}
                      />
                      <ListItemText
                        primaryTypographyProps={{
                          variant: 'body1'
                        }}
                        style={{ flexGrow: 1 }}
                      >
                        <span
                          className={clsx({
                            [classes.arrowHi]: p.isDaytime,
                            [classes.arrowLo]: !p.isDaytime
                          })}
                        ></span>
                        {p.temperature}&deg;
                      </ListItemText>
                      <ListItemIcon
                        classes={{ root: classes.iconContainer }}
                      >
                        <div
                          className={classes.toolTip + ' hidden'}
                        >
                          {p.detailedForecast}
                        </div>
                        <i
                          className={classes.icon}
                          style={{ backgroundImage: 'url(' + p.icon + ')' }}
                        ></i>
                      </ListItemIcon>
                    </ListItem>
                  )
                } else {
                  return null
                }
              })}
            </List>
          </div>
        </>
      }
      <Working show={working} />
      {Boolean(error) && (
        <NoData text={error} />
      )}
    </div>
  )
}

WeatherForecast.propTypes = {
  campusId: PropTypes.string
}
