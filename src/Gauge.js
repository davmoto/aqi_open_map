import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import GaugeChart from 'react-gauge-chart'
import NoData from './NoData'
import PropTypes from 'prop-types'
import React from 'react'
import Working from './Working'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginBottom: 24,
    position: 'relative',
    width: '100%'
  }
}))

const getColors = () => {
  const colors = []
  AqiApi.aqiMatrix.forEach((obj, i) => {
    if (i < AqiApi.aqiMatrix.length - 1) {
      colors.push(obj.colors.bg.cssHex)
    }
  })
  return colors
}

const colors = getColors()

export default function Gauge (props) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <GaugeChart
        id="aqi_gauge"
        animDelay={0}
        arcPadding={0.0}
        arcWidth={0.35}
        colors={colors}
        cornerRadius={0}
        formatTextValue={value => props.aqi >= 500 ? props.aqi : Math.round(value * AqiApi.getGaugeDivisor(props.aqi) * 0.01)}
        marginInPercent={0.01}
        needleBaseColor={'#333333'}
        needleColor={'#333333'}
        nrOfLevels={colors.length}
        percent={AqiApi.getGaugePercent(props.aqi)}
      />
      <Working show={props.working} />
      {props.fail && (
        <NoData />
      )}
    </div>
  )
}
Gauge.propTypes = {
  aqi: PropTypes.number,
  fail: PropTypes.bool,
  working: PropTypes.bool
}
