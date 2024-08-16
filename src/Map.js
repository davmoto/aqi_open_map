import { makeStyles, useTheme } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import clsx from 'clsx'
import NoData from './NoData'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Working from './Working'

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    height: 432,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    '&.small': {
      height: 432
    }
  },
  map: {
    borderRadius: '10px',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 500
  },
  mapHeading: {
    left: 16,
    position: 'absolute',
    top: 8,
    textShadow: '1px 1px 2px #fff',
    zIndex: 1500
  }
}))

let aqiLayer = null

export default function Map (props) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))
  const [map, _setMap] = useState(null)

  useEffect(() => {
    _setMap(AqiApi.getMap('map'))
  }, [])

  useEffect(() => {
    if (props.locations.length && map) {
      if (aqiLayer && map.hasLayer(aqiLayer)) {
        map.removeLayer(aqiLayer)
        aqiLayer = null
      }
      aqiLayer = AqiApi.getDeviceMarkers(props.locations, map)
      setTimeout(() => {
        aqiLayer.addTo(map)
        map.fitBounds(aqiLayer.getBounds(), { padding: [40, 40] })
      }, 500)
    }
  }, [props.locations, map])

  return (
    <div
      className={
        clsx(classes.container, {
          small: small
        })
      }
    >
      <Typography
        classes={{ root: classes.mapHeading }}
        component="h3"
        gutterBottom
        variant="h5"
      >
        Monitoring Locations
      </Typography>
      <div
        className={classes.map}
        id="map"
      ></div>
      <Working show={props.working} />
      {props.fail && (
        <NoData text="Monitoring locations unavailable" />
      )}
    </div>
  )
}

Map.propTypes = {
  fail: PropTypes.bool,
  locations: PropTypes.array,
  working: PropTypes.bool
}
