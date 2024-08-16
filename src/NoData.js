import { makeStyles } from '@material-ui/core/styles'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(220, 20, 60, 0.7)',
    borderRadius: 4,
    boxShadow: '2px 2px 4px rgba(51, 51, 51, 0.9)',
    boxSizing: 'border-box',
    display: 'flex',
    left: '50%',
    marginLeft: -64,
    padding: 8,
    position: 'absolute',
    top: 108,
    width: 128,
    zIndex: 502
  },
  heading: {
    color: 'White',
    fontSize: '0.8rem'
  },
  icon: {
    color: 'White',
    marginRight: 8
  }
}))

export default function NoData ({ text }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <ErrorOutlineIcon className={classes.icon} />
      <Typography
        classes={{ root: classes.heading }}
        component="h4"
        variant="body1"
      >
        {text || 'Air quality data unavailable'}
      </Typography>
    </div>
  )
}

NoData.propTypes = {
  text: PropTypes.string
}
