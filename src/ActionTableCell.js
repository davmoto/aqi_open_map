import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles(() => ({
  li: {
    marginBottom: '0.5rem'
  },
  required: {
    color: 'Red',
    fontWeight: 'bold'
  },
  tableCell: {
    fontSize: '.9rem',
    verticalAlign: 'top',
    width: '10%',
    '&:last-child': {
      paddingRight: 48
    }
  },
  ul: {
    margin: 0,
    padding: 0
  }
}))

export default function ActionTableCell (props) {
  const classes = useStyles()

  return (
    <TableCell
      className={classes.tableCell}
      colSpan={props.colSpan ? props.colSpan : 1}
    >
      <ul className={classes.ul}>
        {props.actions.map((action, j) => {
          if (action.indexOf('<!>') > -1) {
            return (
              <li
                className={classes.li}
                key={j}
              >
                <span className={classes.required}>{action.replace('<!>', '')}</span>
              </li>
            )
          } else {
            return (
              <li
                className={classes.li}
                key={j}
              >
                {action}
              </li>
            )
          }
        })}
      </ul>
    </TableCell>
  )
}
ActionTableCell.propTypes = {
  actions: PropTypes.array,
  colSpan: PropTypes.number
}
