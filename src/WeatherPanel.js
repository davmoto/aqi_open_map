import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import WeatherCurrent from './WeatherCurrent'
import WeatherForecast from './WeatherForecast'

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
      height: 'auto'
    }
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  heading: {
    color: 'White',
    fontSize: '0.7rem',
    fontWeight: 300,
    letterSpacing: '0.08333em',
    lineHeight: 1,
    paddingLeft: 16,
    textTransform: 'uppercase'
  }
}))

export default function WeatherPanel (props) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <WeatherCurrent
        campusId={props.campusId}
        refresh={props.refresh}
      />
      <WeatherForecast
        campusId={props.campusId}
        refresh={props.refresh}
      />
    </div>
  )
}

WeatherPanel.propTypes = {
  campusId: PropTypes.string,
  refresh: PropTypes.bool
}
