import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import NoData from './NoData'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Working from './Working'

const useStyles = makeStyles(() => ({
  condition: {
    '& .type': {
      color: 'White',
      fontSize: '0.7rem',
      fontWeight: 300,
      letterSpacing: '0.08333em',
      lineHeight: 1,
      textTransform: 'uppercase'
    },
    '&.first': {
      minWidth: '60%'
    },
    '& .value': {
      color: 'White',
      fontSize: '1.3rem',
      fontWeight: 400,
      letterSpacing: '0em',
      lineHeight: 1.334
    }
  },
  container: {
    height: 'auto',
    position: 'relative'
  },
  containerAtmos: {
    position: 'relative'
  },
  containerTemp: {
    alignItems: 'center',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    color: 'White',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      display: 'block',
      paddingBottom: '50%'
    }
  },
  description: {
    textAlign: 'center',
    textShadow: '3px 3px 3px #000000'
  },
  temp: {
    fontSize: '4rem',
    lineHeight: 1,
    marginLeft: '1rem',
    textAlign: 'center',
    textShadow: '3px 3px 3px #000000'
  }
}))

export default function WeatherCurrent ({ campusId }) {
  const classes = useStyles()
  const [desc, _setDesc] = useState(null)
  const [error, _setError] = useState(null)
  const [humidity, _setHumidity] = useState('N/A')
  const [imgUrl, _setImgUrl] = useState(null)
  const [pressure, _setPressure] = useState('N/A')
  const [temp, _setTemp] = useState(null)
  const [visibility, _setVisibility] = useState('N/A')
  const [wind, _setWind] = useState('N/A')
  const [working, _setWorking] = useState(false)

  useEffect(() => {
    if (campusId) {
      _setWorking(true)
      AqiApi.getTempWind(campusId)
        .then(tempWind => {
          return tempWind
        })
        .then(tempWind => {
          _setTemp(tempWind.temperature)
          _setDesc(tempWind.shortForecast)
          _setImgUrl(tempWind.icon.replace('size=medium', 'size=large'))
          _setImgUrl(tempWind.icon.replace(',0', ''))
          const wA = []
          if (tempWind.windDirection) {
            wA.push(tempWind.windDirection)
          }
          if (tempWind.windSpeed) {
            wA.push(tempWind.windSpeed)
          }
          if (wA.length) {
            _setWind(wA.join(' '))
          } else {
            _setWind('N/A')
          }
          AqiApi.getPressHumid(campusId)
            .then(pressHumid => {
              _setWorking(false)
              if (pressHumid.barometricPressure.value) {
                _setPressure(AqiApi.paToInHg(pressHumid.barometricPressure.value) + ' inHg')
              }
              if (pressHumid.visibility.value) {
                _setVisibility(AqiApi.mToMi(pressHumid.visibility.value) + ' mi')
              }
              if (pressHumid.relativeHumidity.value) {
                _setHumidity(Math.round(pressHumid.relativeHumidity.value) + '%')
              }
            })
            .catch(error => {
              console.error(error)
              _setWorking(false)
            })
        })
        .catch(error => {
          _setWorking(false)
          _setError(new Error('Current weather unavailable'))
          console.error(error)
        })
    }
  }, [campusId])

  return (
    <div className={classes.container}>
      {temp &&
        <>
          <div
            className={classes.containerTemp}
            style={imgUrl ? {
              backgroundImage: 'url(' + imgUrl + ')'
            } : null}
          >
            <div className={classes.tempContainer}>
              <Typography
                classes={{ root: classes.temp }}
                component="div"
                variant="h2"
              >
                {temp}&deg;
              </Typography>
              <Typography
                classes={{ root: classes.description }}
                component="p"
                variant="subtitle1"
              >
                {desc}
              </Typography>
            </div>
          </div>
          <div className={classes.containerAtmos}>
            <List dense>
              <ListItem>
                <ListItemText
                  classes={{
                    primary: 'type',
                    root: classes.condition,
                    secondary: 'value'
                  }}
                  className="first"
                  primary="Wind"
                  secondary={wind}
                />
                <ListItemText
                  classes={{
                    primary: 'type',
                    root: classes.condition,
                    secondary: 'value'
                  }}
                  primary="Pressure"
                  secondary={pressure}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  classes={{
                    primary: 'type',
                    root: classes.condition,
                    secondary: 'value'
                  }}
                  className="first"
                  primary="Visibility"
                  secondary= {visibility}
                />
                <ListItemText
                  classes={{
                    primary: 'type',
                    root: classes.condition,
                    secondary: 'value'
                  }}
                  primary="Humidity"
                  secondary={humidity}
                />
              </ListItem>
            </List>
          </div>
        </>
      }
      <Working show={working} />
      {Boolean(error) &&
        <NoData text={error.message} />
      }
    </div>
  )
}

WeatherCurrent.propTypes = {
  campusId: PropTypes.string
}
