import { makeStyles } from '@material-ui/core/styles'
import ActionsList from './ActionsList'
import AqiApi from './AqiApi'
import Box from '@material-ui/core/Box'
import NoData from './NoData'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import StopIcon from '@material-ui/icons/Stop'
import Typography from '@material-ui/core/Typography'
import Working from './Working'

const useStyles = makeStyles(theme => ({
  container: {
    background: 'linear-gradient( #2B4886 100px, #4480BB 400px)',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    height: 432,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: 432
    }
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflowY: 'auto',
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0
  },
  header: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    zIndex: 2
  },
  heading: {
    color: 'White'
  },
  required: {
    color: 'White'
  },
  requiredContainer: {
    alignItems: 'center',
    display: 'flex'
  }
}))

export default function Actions (props) {
  const classes = useStyles()
  const level = props.aqi ? AqiApi.getAqiLevel(props.aqi) : null
  let hasRequired = false

  if (level) {
    Object.keys(level.actions).forEach(key => {
      level.actions[key].forEach(action => {
        if (action.indexOf('<!>') > -1) {
          hasRequired = true
        }
      })
    })
  }

  const [elevate, _setElevate] = useState(false)

  const onScroll = (e) => {
    _setElevate(e.target.scrollTop > 0)
  }

  return (
    <div className={classes.container}>
      <Box
        boxShadow={elevate ? 3 : 0}
        classes={{ root: classes.header }}
      >
        <Typography
          classes={{ root: classes.heading }}
          component="h3"
          variant="h5"
        >
          Actions to Take at This Level
        </Typography>
        {hasRequired === true && (
          <div className={classes.requiredContainer}>
            <StopIcon
              fontSize="large"
              style={{ color: 'rgba(255, 0, 0, 0.8' }}
            />
            <Typography
              classes={{ root: classes.required }}
              component="span"
              variant="caption"
            >
              Required
            </Typography>
          </div>
        )}
      </Box>
      <div
        className={classes.content}
        onScroll={onScroll}
      >
        {level && (
          Object.keys(level.actions).map((group, i) => {
            return (
              <ActionsList
                actions={level.actions[group]}
                groupId={group}
                key={i}
              />
            )
          })
        )}
      </div>
      <Working show={props.working} />
      {props.fail && (
        <NoData text="Actions unavailable" />
      )}
    </div>
  )
}
Actions.propTypes = {
  aqi: PropTypes.number,
  fail: PropTypes.bool,
  working: PropTypes.bool
}
