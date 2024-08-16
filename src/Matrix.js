import { makeStyles } from '@material-ui/core/styles'
import ActionTableCell from './ActionTableCell'
import AqiApi from './AqiApi'
import PropTypes from 'prop-types'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import UCCharacteristics from './UCCharacteristics'
import UCRevisionHistory from './UCRevisionHistory'

const useStyles = makeStyles(theme => ({
  container: {
    background: 'White',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    marginTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 0,
    paddingTop: 8
  },
  heading: {
    paddingRight: 16
  },
  required: {
    color: 'red',
    fontWeight: 'bold'
  },
  table: {
    '& td': {
      fontSize: '0.9rem'
    },
    '& th': {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      lineHeight: 1.5,
      verticalAlign: 'bottom'
    },
    [theme.breakpoints.down('md')]: {
      '& th': {
        color: 'red',
        fontSize: '0.8rem'
      },
      '& td': {
        fontSize: '0.8rem'
      }
    }
  },
  tableWrapper: {
    marginBottom: 32,
    maxHeight: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden'
  }
}))

export default function Matrix (props) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography
        classes={{ root: classes.heading }}
        component="h2"
        gutterBottom
        variant="h5"
      >
        University of California AQI‐Based Decision‐Making Matrix for Wildfire Smoke Events (Version 1.1)
      </Typography>
      <Typography
        classes={{ root: classes.required }}
        component="p"
        paragraph
        variant="caption"
      >
        Required action in bolded red text
      </Typography>
      <div className={classes.tableWrapper}>
        <Table
          aria-label="University of California AQI‐Based Decision‐Making Matrix for Wildfire Smoke Events"
          className={classes.tableWrapper}
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>Levels of Health Concern</TableCell>
              <TableCell>Current PM2.5 AQI Value</TableCell>
              <TableCell>Who is Affected?</TableCell>
              <TableCell align="center" colSpan="7">Actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="3"></TableCell>
              <TableCell>Outdoor Workers/<br />Volunteers</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell>Campus Operations</TableCell>
              <TableCell>Health System Operations</TableCell>
              <TableCell>Athletics &amp; Outdoor Rec</TableCell>
              <TableCell>Outdoor Camps/<br />Events</TableCell>
              <TableCell>Pre‐K‐12</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AqiApi.aqiMatrix.map((category, i) =>
              <TableRow
                key={i}
                style={
                  (category.upperLimit !== null && props.aqi >= category.lowerLimit && props.aqi <= category.upperLimit) || (category.upperLimit === null && props.aqi >= category.lowerLimit)
                    ? { backgroundColor: 'rgba(' + category.colors.bg.rgb + ', 0.2' }
                    : null
                }
              >
                <TableCell style={{
                  backgroundColor: category.colors.bg.cssHex,
                  color: category.colors.text,
                  textAlign: 'center',
                  verticalAlign: 'top'
                }}>
                  {category.level}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  verticalAlign: 'top',
                  whiteSpace: 'nowrap'
                }}>
                  {category.range}
                </TableCell>
                <TableCell style={{ verticalAlign: 'top', width: '10%' }}>
                  {category.whoAffected}
                </TableCell>
                {category.upperLimit !== null &&
                  <>
                    <ActionTableCell
                      actions={category.actions.outdoorWorkersVolunteers}
                    />
                    <ActionTableCell
                      actions={category.actions.classes}
                    />
                    <ActionTableCell
                      actions={category.actions.campusOperations}
                    />
                    <ActionTableCell
                      actions={category.actions.healthSystemOperations}
                    />
                    <ActionTableCell
                      actions={category.actions.athleticsOutdoorRec}
                    />
                    <ActionTableCell
                      actions={category.actions.outdoorCampsEvents}
                    />
                    <ActionTableCell
                      actions={category.actions.preK12}
                    />
                  </>
                }
                {category.upperLimit === null &&
                  <ActionTableCell
                    actions={category.actions.everyone}
                    colSpan={7}
                  />
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <UCCharacteristics />
      <UCRevisionHistory />
    </div>
  )
}
Matrix.propTypes = {
  aqi: PropTypes.number
}
