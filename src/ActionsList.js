import { makeStyles } from '@material-ui/core/styles'
import AqiApi from './AqiApi'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  action: {
    display: 'block',
    paddingLeft: 4
  },
  groupTitle: {
    color: 'White',
    fontWeight: 'normal'
  },
  li: {
    color: 'White',
    '&>.required': {
      backgroundColor: 'rgba(255, 0, 0, 0.8)'
    },
    '&:not(:last-child)>.required': {
      marginBottom: 4
    }
  },
  ul: {
    listStyle: 'square',
    paddingLeft: 24,
    marginTop: 0
  }
}))

export default function ActionsList (props) {
  const classes = useStyles()

  return (
    <>
      <Typography
        classes={{ root: classes.groupTitle }}
        color="primary"
        component="h3"
        gutterBottom={false}
        variant="subtitle1"
      >
        {AqiApi.getGroupTitle(props.groupId)}
      </Typography>
      <ul className={classes.ul}>
        {props.actions.map((action, i) => (
          <li
            className={classes.li}
            key={i}
          >
            <Typography
              classes={{ root: classes.action }}
              className={clsx({
                required: (action.indexOf('<!>') !== -1)
              })}
              component="span"
              variant="body2"
            >
              {action.replace('<!>', '')}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  )
}
ActionsList.propTypes = {
  actions: PropTypes.array,
  groupId: PropTypes.string
}
