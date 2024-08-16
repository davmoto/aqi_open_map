import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const revs = [
  {
    date: '10/30/2019',
    description: [
      'Removed "PM2.5 (24hr avg; μg/m3)" column',
      'Renamed "Current AQI Value" column to "Current PM2.5 AQI Value"'
    ],
    version: '1.1'
  }
]

const useStyles = makeStyles(() => ({
  container: {
    marginRight: 24,
    maxWidth: '640px'
  },
  ul: {
    margin: 0,
    padding: 0
  }
}))

export default function RevisionHistory (props) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Typography
        component="h2"
        gutterBottom
        variant={small ? 'subtitle2' : 'h6'}
      >
          Revision History
      </Typography>
      <div className={classes.container}>
        <Table
          aria-label="Revision History"
          className={classes.table}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Revision Date</TableCell>
              <TableCell>Change Made</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revs.map((rev, i) => {
              return (
                <TableRow
                  key={i}
                >
                  <TableCell>
                    <Typography
                      component="span"
                      variant="body2"
                    >
                      {rev.version}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      variant="body2"
                    >
                      {rev.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <ul className={classes.ul}>
                      {rev.description.map((desc, j) => {
                        return (
                          <li key={j}>
                            <Typography
                              component="span"
                              variant="body2"
                            >
                              {desc}
                            </Typography>
                          </li>
                        )
                      })}
                    </ul>
                    {rev.whoAffected}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
RevisionHistory.propTypes = {
  refresh: PropTypes.bool
}
