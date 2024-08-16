import { makeStyles } from '@material-ui/core/styles'
import './App.css'
import Actions from './Actions'
import AqiApi from './AqiApi'
import Footer from './Footer'
import GaugePanel from './GaugePanel'
import Grid from '@material-ui/core/Grid'
import Header from './Header'
import LineChart from './LineChart'
import Map from './Map'
import Matrix from './Matrix'
import React, { useState, useEffect } from 'react'
import Texture from './Texture'
import WeatherPanel from './WeatherPanel'

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1600,
    paddingLeft: 16,
    paddingRight: 16
  },
  gridContainer: {
    marginBottom: 16
  }
}))

const urlParams = AqiApi.getUrlParams(window.location.href)

let campus = AqiApi.campuses.filter(c => c.id === 'ucla')[0]

if (urlParams.campus) {
  const otherCampus = AqiApi.campuses.filter(c => c.id === urlParams.campus.toLowerCase())
  if (otherCampus.length) {
    campus = otherCampus[0]
  } else {
    alert('No dashboard configuration for ' + urlParams.campus + '.')
  }
}

const codes = []

campus.devices.forEach(obj => {
  codes.push(obj.deviceId)
})

function App () {
  const classes = useStyles()

  const [aqi, _setAqi] = useState(null)

  const [locations, _setLocations] = useState([])

  const [refresh, _setRefresh] = useState(false)

  const [updated, _setUpdated] = useState(AqiApi.formatDate(new Date()))

  const [fail, _setFail] = useState(false)

  const [working, _setWorking] = useState(false)

  useEffect(() => {
    _setWorking(true)
    AqiApi.getOpenMapAqiData(campus.id)
      .then(data => {
        _setWorking(false)
        _setAqi(data.campusAqiAverage)
        _setLocations(data.devices)
      })
      .catch(error => {
        _setWorking(false)
        _setFail(true)
        console.error(error)
      })
    _setUpdated(AqiApi.formatDate(new Date()))
  }, [refresh])

  const handleRefresh = () => {
    if (aqi) {
      _setAqi(null)
    }
    _setRefresh(!refresh)
  }

  return (
    <React.Fragment>
      <Header
        campus={campus}
        handleRefresh={handleRefresh}
      />
      <div className={classes.container}>
        <Grid
          classes={{ root: classes.gridContainer }}
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
          >
            <GaugePanel
              aqi={aqi}
              fail={fail}
              updated={updated}
              working={working}
            />
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
          >
            <LineChart
              codes={codes}
              refresh={refresh}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            md={4}
            sm={12}
            xs={12}
          >
            <Actions
              aqi={aqi}
              fail={fail}
              working={working}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={4}
            sm={12}
            xs={12}
          >
            <Map
              fail={fail}
              locations={locations}
              working={working}
            />
          </Grid>
          <Grid
            item
            lg={3}
            md={4}
            sm={12}
            xs={12}
          >
            <WeatherPanel
              campusId={campus.id}
              refresh={refresh}
            />
          </Grid>
        </Grid>
        <Matrix
          aqi={aqi}
        />
      </div>
      <Footer />
      <Texture />
    </React.Fragment>
  )
}

export default App
