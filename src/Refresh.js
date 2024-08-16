import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#C3D7EE'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

export default function Refresh ({ handleRefresh }) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classes.container}>
      <Button
        classes={{ root: classes.button }}
        onClick={handleRefresh}
        size={small ? 'medium' : 'large'}
        startIcon={<RefreshIcon />}
        variant="contained"
      >
        Refresh
      </Button>
    </div>
  )
}

Refresh.propTypes = {
  handleRefresh: PropTypes.func
}
