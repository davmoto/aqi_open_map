import { makeStyles, useTheme } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import Chart from 'react-google-charts'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import NoData from './NoData'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Working from './Working'

const useStyles = makeStyles(theme => ({
  checked: {},
  container: {
    background: 'linear-gradient( #2B4886 100px, #4480BB 400px)',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    height: 496,
    overflow: 'hidden',
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    padding: 8,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: 448
    }
  },
  heading: {
    color: 'White'
  },
  progress: {
    color: 'White',
    position: 'absolute',
    left: '50%',
    marginLeft: -22,
    marginTop: -22,
    top: '50%'
  },
  radio: {
    '&$checked': {
      color: 'Aqua'
    }
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 32
  },
  radioGroup: {
    color: 'White'
  },
  timeRange: {
    color: 'White'
  }
}))

const radios = [
  {
    label: 'Day',
    shortLabel: 'DY',
    value: 'day'
  },
  {
    label: 'Week',
    shortLabel: 'WK',
    value: 'week'
  },
  {
    label: 'Month',
    shortLabel: 'MO',
    value: 'month'
  },
  {
    label: 'Year',
    shortLabel: 'YR',
    value: 'year'
  }
]

export default function LineChart (props) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))
  const [period, _setPeriod] = useState('day')
  const [chartData, _setChartData] = useState(null)
  const [heading, _setHeading] = useState('Historical Values')
  const [timeRange, _setTimeRange] = useState('')
  const [fontSize, _setFontSize] = useState(11)
  const [lineWidth, _setLineWidth] = useState(8)
  const [slantedText, _setSlantedText] = useState(true)
  const [title, _setTitle] = useState('Hour')
  const [fail, _setFail] = useState(false)
  const [working, _setWorking] = useState(false)
  const [showRadios, _setShowRadios] = useState(false)

  useEffect(() => {
    _setWorking(true)
    _setFail(false)
    _setChartData(null)
    _setShowRadios(false)
    switch (period) {
      case 'day':
        _setHeading('Past 24 Hours')
        break
      case 'week':
        _setHeading('Past Week')
        break
      case 'month':
        _setHeading('Past Month')
        break
      case 'year':
        _setHeading('Past Year')
        break
      default:
    }
    AqiApi.getOpenMapAqiChartData(props.codes, period)
      .then(data => {
        _setWorking(false)
        const data_ = AqiApi.processChartData(data, period)
        const trA = [data_[0][0], data_[data_.length - 1][0]]
        const trStr = AqiApi.formatTimeRange(trA, period)
        _setTimeRange(trStr)
        let format
        const colVals = ['', 'AQI']
        switch (period) {
          case 'day':
            colVals[0] = 'Hour'
            format = 'hour'
            _setFontSize(11)
            _setHeading('Past 24 Hours')
            _setLineWidth(6)
            _setSlantedText(true)
            break
          case 'week':
            colVals[0] = 'Weekday'
            format = 'day'
            _setFontSize(13)
            _setLineWidth(6)
            _setSlantedText(false)
            _setTitle('Day of Week')
            break
          case 'month':
            colVals[0] = 'Date'
            format = 'date'
            _setFontSize(11)
            _setLineWidth(4)
            _setSlantedText(true)
            _setTitle('Date')
            break
          case 'year':
            colVals[0] = 'Month'
            format = 'month'
            _setFontSize(12)
            _setLineWidth(6)
            _setSlantedText(false)
            _setTitle('Month')
            break
          default:
        }
        data_.forEach((dt, i) => {
          data_[i][0] = AqiApi.formatChartDataTime(dt[0], format)
        })
        data_.unshift(colVals)
        _setChartData(data_)
      })
      .catch(error => {
        _setWorking(false)
        _setFail(true)
        console.error(error)
      })
      .finally(() => {
        setTimeout(() => {
          _setShowRadios(true)
        }, 2000)
      })
  }, [period, props.codes, props.refresh])

  const handleChange = (period) => {
    _setPeriod(period)
  }

  return (
    <div
      className={classes.container}>
      <Typography
        classes={{ root: classes.heading }}
        component="h2"
        variant="h5"
      >
        {heading}
      </Typography>
      {chartData && (
        <>
          <Typography
            classes={{ root: classes.timeRange }}
            component="p"
            paragraph
            variant="subtitle2"
          >
            {timeRange}
          </Typography>
          <Chart
            width={'100%'}
            height={'352px'}
            chartType="LineChart"
            data={chartData}
            options={{
              axisTitlesPosition: 'none',
              backgroundColor: 'none',
              chartArea: {
                left: 32,
                height: '87%',
                top: 8,
                width: '100%'
              },
              colors: ['Aqua'],
              fontName: 'Roboto',
              hAxis: {
                slantedText: slantedText,
                slantedTextAngle: 90,
                textStyle: {
                  color: '#FFF',
                  fontSize: fontSize
                },
                title: title
              },
              legend: 'none',
              lineWidth: lineWidth,
              vAxis: {
                minorGridlines: {
                  interval: 0
                },
                textStyle: {
                  color: '#FFF',
                  fontSize: 12
                },
                title: 'AQI PM2.5'
              },
              animation: {
                duration: 1000,
                easing: 'out',
                startup: true
              }
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </>
      )}
      {showRadios && (
        <div className={classes.radioContainer}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Time period"
              classes={{
                root: classes.radioGroup
              }}
              name="period"
              row
              value={period}
            >
              {radios.map((radio, i) => (
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        checked: classes.checked,
                        root: classes.radio
                      }}
                    />
                  }
                  key={i}
                  label={small ? radio.shortLabel : radio.label}
                  onClick={() => handleChange(radio.value)}
                  value={radio.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      )}
      <Working show={working} />
      {fail && (
        <NoData text="Historical values unavailable" />
      )}
    </div>
  )
}

LineChart.propTypes = {
  codes: PropTypes.array,
  refresh: PropTypes.bool
}
