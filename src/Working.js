import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(() => ({
  circularProgress: {
    color: 'White',
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
    top: '50%',
    zIndex: 1001
  }
}))

export default function Working ({ show }) {
  const classes = useStyles()

  return (
    <>
      {show && (
        <CircularProgress
          classes={{ root: classes.circularProgress }}
          size={40}
          thickness={3}
        />
      )}
    </>
  )
}

Working.propTypes = {
  show: PropTypes.bool
}
