import { makeStyles } from '@material-ui/core/styles'
import Gauge from './Gauge'
import Grid from '@material-ui/core/Grid'
import Legend from './Legend'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Summary from './Summary'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
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
      height: 'auto',
      minHeight: 448
    }
  },
  description: {
    color: 'White'
  },
  heading: {
    color: 'White'
  },
  link: {
    color: 'White'
  },
  updated: {
    color: 'White'
  }
}))

export default function GaugePanel (props) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <>
        <Typography
          classes={{ root: classes.heading }}
          component="h2"
          variant="h5"
        >
          Campus Air Quality
        </Typography>
        <Typography
          classes={{ root: classes.description }}
          component="p"
          paragraph
          variant="body2"
        >
          Real-time <Link href="https://www.epa.gov/pm-pollution/particulate-matter-pm-basics" classes={{ root: classes.link }}target="_blank">US EPA Air Quality Index for particulate (PM2.5) air matter</Link>.
        </Typography>
      </>
      <Grid container>
        <Grid
          item
          lg={8}
          md={6}
          sm={12}
          xs={12}
          style={{ position: 'relative' }}
        >
          <Typography
            classes={{ root: classes.updated }}
            component="p"
            paragraph
            variant="subtitle2"
          >
            {props.updated}
          </Typography>
          {props.aqi !== null && (
            <Gauge
              aqi={props.aqi}
              fail={props.fail}
              working={props.working}
            />
          )}
          {props.aqi === null && (
            <Gauge
              aqi={0}
              fail={props.fail}
              working={props.working}
            />
          )}
          <Summary aqi={props.aqi} />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
          xs={12}
        >
          <Legend />
        </Grid>
      </Grid>
    </div>
  )
}
GaugePanel.propTypes = {
  aqi: PropTypes.number,
  fail: PropTypes.bool,
  updated: PropTypes.string,
  working: PropTypes.bool
}
