import { makeStyles } from '@material-ui/core/styles'
import aqLogo from './aq_logo.svg'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Refresh from './Refresh'
import UCILogo from './UCI_logo.svg'
import UCLALogo from './UCLA_logo_wht.svg'
import UCSBLogo from './UCSB_logo.svg'
import UCSDLogo from './UCSD_logo.svg'
import UCSFLogo from './UCSF_logo.svg'

const useStyles = makeStyles(theme => ({
  aqLogo: {
    height: 40
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1600,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16
  },
  logo: {
    cursor: 'pointer',
    marginLeft: 16,
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      height: 36
    },
    [theme.breakpoints.up('md')]: {
      height: 40
    }
  },
  refreshContainer: {
    display: 'flex',
    flexGrow: 2,
    justifyContent: 'flex-end'
  }
}))

export default function Header (props) {
  const classes = useStyles()
  const [logo, _setLogo] = useState(UCLALogo)

  useEffect(() => {
    if (props.campus.id === 'uci') {
      _setLogo(UCILogo)
    } else if (props.campus.id === 'ucsb') {
      _setLogo(UCSBLogo)
    } else if (props.campus.id === 'ucsd') {
      _setLogo(UCSDLogo)
    } else if (props.campus.id === 'ucsf') {
      _setLogo(UCSFLogo)
    }
    document.title = props.campus.id.toUpperCase() + ' AirQual'
  }, [props.campus.id])

  const handleHome = (url) => {
    window.open(url)
  }

  return (
    <div className={classes.container}>
      <img
        alt={props.campus.id.toUpperCase() + ' AirQual'}
        className={classes.aqLogo}
        src={aqLogo}
      />
      <img
        alt={props.campus.id.toUpperCase()}
        className={classes.logo}
        onClick={() => handleHome(props.campus.url)}
        src={logo}
      />
      <div className={classes.refreshContainer}>
        <Refresh handleRefresh={props.handleRefresh} />
      </div>
    </div>
  )
}

Header.propTypes = {
  campus: PropTypes.object,
  handleRefresh: PropTypes.func
}
