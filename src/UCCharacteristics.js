import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const items = [
  'The matrix is designed for use when wildfire smoke conditions result in worsening and unhealthy air quality. It does not apply if there is a direct threat of wildfire and/or other significant hazard to the location, or for smog‐related air quality conditions.',
  'Required actions are in bolded red text. These are definitive actions that must take place when ‐ but not before ‐ the corresponding AQI threshold is met.',
  'Non‐bolded actions are recommended for consideration and should be implemented at the location’s discretion.',
  'The matrix is not a stand‐alone document. It should be used in conjunction with existing local response plans, protocols, and procedures including the Emergency Operations Plan, Crisis Management Plan, and Continuity of Operations Plans.',
  'If building indoor air quality is measured at a level consistent with the AQI thresholds, applicable mitigation measures should be implemented if feasible, and required actions listed in the matrix should be taken.',
  'Contractors working at UC locations should follow the advice of their own employers.',
  'The Pre‐K‐12 actions apply to UC‐managed facilities only.',
  'The matrix incorporates actions required by Cal/OSHA Section 5141.1.',
  'University sponsored outdoor events held at off‐campus locations are subject to actions associated with that location’s AQI levels.',
  'Actions for athletic practice and competition were based on current National Collegiate Athletic Association (NCAA) guidance. Decisions regarding the cancellation and/or rescheduling of athletic competitions should be made in accordance with the NCAA. Rescheduling of athletic and recreation competitions may take place when the AQI lowers to an acceptable level.',
  'Locations should ensure timely communication of AQI‐based decisions and expected actions via multiple and redundant communication methods.',
  'Higher AQI thresholds automatically incorporate all guidance and actions associated with lower AQI levels.'
]

const useStyles = makeStyles(() => ({
  container: {
    marginRight: 24
  }
}))

export default function UCCharacteristics (props) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classes.container}>
      <Typography
        component="h2"
        gutterBottom
        variant={small ? 'subtitle2' : 'h6'}
      >
          Key characteristics:
      </Typography>
      <ul>
        {items.map((item, i) => {
          return (
            <li
              key={i}
            >
              <Typography
                component="span"
                variant={small ? 'body2' : 'body1'}
              >{item}</Typography>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
