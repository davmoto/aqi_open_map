import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  level: {
    color: 'White',
    marginTop: '1rem',
    textAlign: 'center'
  },
  whoAffected: {
    color: 'White',
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center'
  }
}))

export default function Summary ({ aqi }) {
  const classes = useStyles()

  const [level, _setLevel] = useState(null)

  useEffect(() => {
    _setLevel(aqi !== null ? AqiApi.getAqiLevel(aqi) : null)
  }, [aqi])

  return (
    <>
      {level && (
        <>
          <Typography
            classes={{ root: classes.level }}
            component="h3"
            gutterBottom
            variant="h4"
          >
            {level.level}
          </Typography>
          <Typography
            classes={{ root: classes.whoAffected }}
            component="p"
            gutterBottom
            paragraph
            variant="subtitle1"
          >
            {level.whoAffected}
          </Typography>
        </>
      )}
    </>
  )
}
Summary.propTypes = {
  aqi: PropTypes.number
}
