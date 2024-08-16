import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(() => ({
  container: {
    '& div': {
      background: 'transparent url(svg/bgd_octagon.svg) no-repeat left top',
      backgroundSize: 'cover',
      opacity: 0.05,
      position: 'absolute'
    },
    position: 'fixed',
    zIndex: -1
  },
  container_1: {
    height: 320,
    left: 0,
    top: 240,
    width: 320
  },
  container_2: {
    height: 200,
    right: 0,
    top: 48,
    width: 200
  },
  earth: {
    height: 72,
    left: 48,
    top: 176,
    width: 72
  },
  jupiter: {
    bottom: 0,
    height: 184,
    left: 0,
    width: 184
  },
  mars: {
    height: 56,
    left: 16,
    top: 216,
    width: 56
  },
  pluto_1: {
    height: 32,
    left: 72,
    opacity: 0.05,
    top: 160,
    width: 32
  },
  pluto_2: {
    height: 32,
    right: 0,
    top: 0,
    width: 32
  },
  sun: {
    height: 320,
    left: 0,
    top: 0,
    width: 320
  },
  venus: {
    height: 63,
    right: 16,
    top: 8,
    width: 64
  }
}))

export default function Texture (props) {
  const classes = useStyles()

  return (
    <>
      <div aria-hidden="true" className={classes.container_1 + ' ' + classes.container}>
        <div className={classes.mars}></div>
        <div className={classes.earth}></div>
        <div className={classes.pluto_1}></div>
        <div className={classes.sun}></div>
      </div>
      <div aria-hidden="true" className={classes.container_2 + ' ' + classes.container}>
        <div className={classes.pluto_2}></div>
        <div className={classes.venus}></div>
        <div className={classes.jupiter}></div>
      </div>
    </>
  )
}
