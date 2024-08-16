import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import L from 'leaflet'

class AqiApi {
  static get aqiMatrix () {
    return [
      {
        level: 'Good',
        range: '0‐50',
        lowerLimit: 0,
        upperLimit: 50,
        colors: {
          bg: {
            cssHex: 'limegreen',
            rgb: '50, 205, 50'
          },
          text: 'black'
        },
        whoAffected: 'No individuals expected to be affected.',
        actions: {
          outdoorWorkersVolunteers: [
            'No Action Anticipated'
          ],
          classes: [
            'No Action Anticipated'
          ],
          campusOperations: [
            'No Action Anticipated'
          ],
          healthSystemOperations: [
            'No Action Anticipated'
          ],
          athleticsOutdoorRec: [
            'No Action Anticipated'
          ],
          outdoorCampsEvents: [
            'No Action Anticipated'
          ],
          preK12: [
            'No Action Anticipated'
          ]
        }
      },
      {
        level: 'Moderate',
        range: '51‐100',
        lowerLimit: 51,
        upperLimit: 100,
        colors: {
          bg: {
            cssHex: 'yellow',
            rgb: '255, 255, 0'
          },
          text: 'black'
        },
        whoAffected: 'Unusually sensitive individuals (people with lung and heart disease) may be affected.',
        actions: {
          outdoorWorkersVolunteers: [
            'Unusually sensitive people may require work accommodations.'
          ],
          classes: [
            'No Action Anticipated'
          ],
          campusOperations: [
            'No Action Anticipated'
          ],
          healthSystemOperations: [
            'In patient care areas, consider modifying filtered mechanical ventilation systems and/or implementing other controls to reduce outdoor air intake.'
          ],
          athleticsOutdoorRec: [
            'No Action Anticipated'
          ],
          outdoorCampsEvents: [
            'No Action Anticipated'
          ],
          preK12: [
            'No Action Anticipated'
          ]
        }
      },
      {
        level: 'Unhealthy for Sensitive Groups',
        range: '101‐150',
        lowerLimit: 101,
        upperLimit: 150,
        colors: {
          bg: {
            cssHex: 'orange',
            rgb: '255, 165, 0'
          },
          text: 'black'
        },
        whoAffected: 'Sensitive groups including people with heart or lung disease, older adults, pregnant women, and children affected.',
        actions: {
          outdoorWorkersVolunteers: [
            'Workers in sensitive groups may require work accommodations.'
          ],
          classes: [
            'No Action Anticipated'
          ],
          campusOperations: [
            'Consider closing building doors and windows to reduce outdoor air intake'
          ],
          healthSystemOperations: [
            'As feasible, modify filtered mechanical ventilation systems to reduce outdoor air intake in patient care areas.'
          ],
          athleticsOutdoorRec: [
            '<!>Medical/athletic staff/outdoor recreation staff should consult with individuals who fall into the sensitive groups about participation in practice, competition, and/or outdoor events.'
          ],
          outdoorCampsEvents: [
            'At higher end of range, consider moving activities indoors.'
          ],
          preK12: [
            'For longer activities such as athletic practice, take more breaks and do less intense activities.'
          ]
        }
      },
      {
        level: 'Unhealthy',
        range: '151‐200',
        lowerLimit: 151,
        upperLimit: 200,
        colors: {
          bg: {
            cssHex: 'red',
            rgb: '255, 0, 0'
          },
          text: 'white'
        },
        whoAffected: 'Everyone affected.',
        actions: {
          outdoorWorkersVolunteers: [
            '<!>Limit outdoor work and prolonged or heavy exertion if practicable.',
            '<!>Reassign employees who work outdoors for more than one hour or provide N95 respirators for voluntary use.'
          ],
          classes: [
            'Consider academic accommodations for students and faculty with pre‐existing health conditions.',
            'Consider cancelling or moving outdoor classes indoors.'
          ],
          campusOperations: [
            'Consider making N95 respirators and use/care guidance available for voluntary use.',
            'Consider increasing campus-managed shuttle/bus service.',
            'As feasible, modify filtered mechanical ventilation systems to reduce outdoor air intake.' 
          ],
          healthSystemOperations: [
            'Consider making N95 respirators and use/care guidance available for voluntary use.',
            'In patient care areas, consider monitoring indoor air quality and implement mitigation actions if indoor AQI is within this range.' 
          ],
          athleticsOutdoorRec: [
            'Medical/athletic training staff should closely monitor the health of all athletes in practice and competition. Modifications to athletic activities should be considered and implemented as necessary.',
            '<!>Shorten/modify outdoor recreational activity to limit prolonged or heavy exertion.' 
          ],
          outdoorCampsEvents: [
            'Consider cancellation of more intense outdoor events or move events indoors.'
          ],
          preK12: [
            '<!>For all outdoor activities, take more breaks and do less intense activities.',
            'Consider moving longer or more intense activities indoors or rescheduling them to another day or time.'
          ]
        }
      },
      {
        level: 'Very Unhealthy',
        range: '201‐300 ',
        lowerLimit: 201,
        upperLimit: 300,
        colors: {
          bg: {
            cssHex: '#8f3f97',
            rgb: '143, 63, 151'
          },
          text: 'white'
        },
        whoAffected: 'Everyone affected.',
        actions: {
          outdoorWorkersVolunteers: [
            '<!>Suspend outdoor work. If work is absolutely necessary, provide N‐95 respirators for voluntary use.'
          ],
          classes: [
            '<!>Per local procedures and in consultation with the divisional Academic Senate Chair or designee, cancel or restructure classes if current AQI levels have maintained in this range and are expected to continue (academic activities that support clinical operations or research may be excluded from cancellation).'
          ],
          campusOperations: [
            'To the extent possible, curtail campus operations.',
            'Consider monitoring indoor air quality and implement mitigation actions if indoor AQI is within this range.'
          ],
          healthSystemOperations: [
            'To the extent possible, curtail health system operations.',
            'Consider monitoring indoor air quality and implement mitigation actions if indoor AQI is within this range.'
          ],
          athleticsOutdoorRec: [
            '<!>Outdoor athletic activities should be moved indoors or delayed, postponed, or relocated.',
            '<!>Cancel or move indoors outdoor recreational activities.'
          ],
          outdoorCampsEvents: [
            '<!>Cancel outdoor events involving activity (e.g., sports).',
            'Consider cancellation of outdoor events that do not involve activity (e.g., concerts).'
          ],
          preK12: [
            '<!>Close school if current AQI levels have maintained in this range and are expected to continue.'
          ]
        }
      },
      {
        level: 'Very Hazardous',
        range: '301‐500',
        lowerLimit: 301,
        upperLimit: 500,
        colors: {
          bg: {
            cssHex: '#7e0023',
            rgb: '126, 0, 35'
          },
          text: 'white'
        },
        whoAffected: 'Everyone affected.',
        actions: {
          outdoorWorkersVolunteers: [
            '<!>Suspend outdoor work. If work is absolutely necessary, provide N‐95 respirators for voluntary use.'
          ],
          classes: [
            '<!>Per local procedures and in consultation with the divisional Academic Senate Chair or designee, cancel or restructure classes if current AQI levels have maintained in this range and are expected to continue (academic activities that support clinical operations or research may be excluded from cancellation).'
          ],
          campusOperations: [
            'To the extent possible, curtail campus operations.',
            'Consider monitoring indoor air quality and implement mitigation actions if indoor AQI is within this range.'
          ],
          healthSystemOperations: [
            'To the extent possible, curtail health system operations.',
            'Consider monitoring indoor air quality and implement mitigation actions if indoor AQI is within this range.'
          ],
          athleticsOutdoorRec: [
            '<!>Cancel or move indoors all outdoor athletic and recreation events/activities.',
            'Consider cancellation of indoor events/activities based on indoor air quality measurements.'
          ],
          outdoorCampsEvents: [
            '<!>Cancel all outdoor events and camp activities.',
            'Consider cancellation of indoor camps that require participants or families to travel to and from campus.'
          ],
          preK12: [
            '<!>Close school if current AQI levels have maintained in this range and are expected to continue.'
          ]
        }
      },
      {
        level: 'Beyond the AQI',
        range: '>500',
        lowerLimit: 501,
        upperLimit: null,
        colors: {
          bg: {
            cssHex: 'Black',
            rgb: '0, 0, 0'
          },
          text: 'white'
        },
        whoAffected: 'Everyone affected.',
        actions: {
          everyone: [
            'Follow recommendations for the Hazardous Category.',
            '<!>Suspend outdoor work and activities. If outdoor work is absolutely necessary, N95 respirators are mandatory and require training and fit testing.'
          ]
        }
      }
    ]
  }

  static get campuses () {
    return [
      {
        campus: 'Los Angeles',
        devices: [
          {
            code: 'DZDZD2653',
            dataSource: 'Clarity Node',
            deviceId: 'DZDZD2653',
            locationName: 'Anderson'
          },
          {
            code: 'DKDJZ8833',
            dataSource: 'Clarity Node',
            deviceId: 'DKDJZ8833',
            locationName: 'Sycamore Court Apartments'
          },
          {
            code: 'DJKJK2078',
            dataSource: 'Clarity Node',
            deviceId: 'DJKJK2078',
            locationName: 'Sproul Hall'
          },
          {
            code: 'DKUCV1988',
            dataSource: 'Clarity Node',
            deviceId: 'DKUCV1988',
            locationName: 'Terasaki Life Sciences'
          },
          {
            code: 'DYSEV5920',
            dataSource: 'Clarity Node',
            deviceId: 'DYSEV5920',
            locationName: 'UCLA Ronald Reagan Hospital'
          }
        ],
        id: 'ucla',
        url: 'https://www.ucla.edu/'
      },
      {
        campus: 'San Diego',
        devices: [
          {
            code: 'DKILC3507',
            dataSource: 'Clarity Node',
            deviceId: 'DKILC3507',
            locationName: 'RIMAC Arena'
          },
          {
            code: 'DBWVN5705',
            dataSource: 'Clarity Node',
            deviceId: 'DBWVN5705',
            locationName: 'Price Center'
          },
          {
            code: 'DTTCR6730',
            dataSource: 'Clarity Node',
            deviceId: 'DTTCR6730',
            locationName: 'CRSF (EHS Bldg)'
          },
          {
            code: 'DZQII2860',
            dataSource: 'Clarity Node',
            deviceId: 'DZQII2860',
            locationName: 'Nierenberg Hall'
          }
        ],
        id: 'ucsd',
        url: 'https://ucsd.edu/'
      },
      {
        campus: 'San Francisco',
        devices: [
          {
            code: 'DNQLI9651',
            dataSource: 'Clarity Node',
            deviceId: 'DNQLI9651',
            locationName: 'UCSF Parnassus'
          },
          {
            code: 'DSSIJ1361',
            dataSource: 'Clarity Node',
            deviceId: 'DSSIJ1361',
            locationName: 'UCSF Mission Bay'
          },
          {
            code: 'DUFGE0229',
            dataSource: 'Clarity Node',
            deviceId: 'DUFGE0229',
            locationName: 'UCSF Mount Zion'
          },
          {
            code: 'DKYUH8186',
            dataSource: 'Clarity Node',
            deviceId: 'DKYUH8186',
            locationName: 'UCSF Hunter\'s Point'
          }
        ],
        id: 'ucsf',
        url: 'https://ucsf.edu/'
      },
      {
        campus: 'Santa Barbara',
        devices: [
          {
            code: 'DVCBA7399',
            dataSource: 'Clarity Node',
            deviceId: 'DVCBA7399',
            locationName: 'CNSI Roof Top'
          },
          {
            code: 'DNRYQ4646',
            dataSource: 'Clarity Node',
            deviceId: 'DNRYQ4646',
            locationName: 'SRB Roof Top'
          }
        ],
        id: 'ucsb',
        url: 'https://ucsb.edu/'
      }
    ]
  }

  static getOpenMapAqiChartData (codeArr, period) {
    const baseUrl = 'https://openmap.clarity.io/api/measurements'
    const codeStr = period === 'year' ? codeArr[0] : codeArr.join()
    const dTRange = this.getTimeRange(period)
    let timeSpan = '&timespan='
    if (period === 'hour') {
      timeSpan = ''
    } else if (period === 'day') {
      timeSpan += 'hour'
    } else {
      timeSpan += 'day'
    }
    let qs = 'startTime=' + dTRange[0] + '&endTime=' + dTRange[1] + '&deviceId=' + codeStr + '&aqi=pm2_5ConcMass'
    qs += timeSpan !== '' ? timeSpan : ''
    const url = baseUrl + '?' + qs
    return new Promise((resolve, reject) => {
      const controller = new AbortController()
      const signal = controller.signal
      const timeoutId = setTimeout(() => {
        controller.abort()
        reject(new Error('getAqiData request timed out'))
      }, 30000)
      const opt = {
        method: 'GET'
      }
      fetch(url, { ...opt, ...signal })
        .then(response => {
          clearTimeout(timeoutId)
          if (response.ok) {
            response.json()
              .then(json => {
                return resolve(json)
              })
              .catch(error => {
                return reject(error)
              })
          } else {
            reject(new Error('getAqiData response not ok'))
          }
        })
        .catch(error => {
          clearTimeout(timeoutId)
          return reject(error)
        })
    })
  }

  static getOpenMapAqiData (campusId) {
    const baseUrl = 'https://openmap.clarity.io/api/measurements'
    const campus = AqiApi.campuses.filter(c => c.id === campusId)[0]
    const deviceIds = []
    campus.devices.forEach(obj => {
      deviceIds.push(obj.deviceId)
    })
    let qs = '?deviceId=' + deviceIds.join()
    const dTRange = this.getTimeRange('hour')
    qs += '&startTime=' + dTRange[0]
    qs += '&timespan=hour&aqi=pm2_5ConcMass'
    const url = baseUrl + qs
    return new Promise((resolve, reject) => {
      const controller = new AbortController()
      const signal = controller.signal
      const timeoutId = setTimeout(() => {
        controller.abort()
        reject(new Error('getOpenMapAqiData request timed out'))
      }, 15000)
      const opt = {
        method: 'GET'
      }
      fetch(url, { ...opt, ...signal })
        .then(response => {
          clearTimeout(timeoutId)
          if (response.ok) {
            response.json()
              .then(json => {
                const g = json.reduce((r, a) => {
                  r[a.deviceId] = [...r[a.deviceId] || [], a]
                  return r
                }, {})
                const latestData = []
                for (const prop in g) {
                  latestData.push(g[prop].pop())
                }
                const devices = []
                latestData.forEach(obj => {
                  if (obj.characteristics.pm2_5ConcMass) {
                    const campusDevice = campus.devices.filter(d => d.deviceId === obj.deviceId)[0]
                    const aqi = this.pm25ToAqi(obj.characteristics.pm2_5ConcMass.value)
                    const aqiProps = this.getAqiLevel(aqi)
                    const deviceId = campusDevice.deviceId
                    const location = obj.device.location
                    const locationName = campusDevice.locationName
                    const pm25ConcMass = obj.characteristics.pm2_5ConcMass.value
                    const time = obj.time
                    devices.push({
                      aqi: aqi,
                      aqiProps: aqiProps,
                      deviceId: deviceId,
                      location: location,
                      locationName: locationName,
                      pm25ConcMass: pm25ConcMass,
                      time: time
                    })
                  }
                })
                const aqis = devices.map(obj => obj.aqi)
                const getAverage = (array) => array.reduce((a, b) => a + b) / array.length
                const campusAqiAvg = Math.round(getAverage(aqis))
                return resolve({
                  campusAqiAverage: campusAqiAvg,
                  devices: devices
                })
              })
              .catch(error => {
                return reject(error)
              })
          } else {
            reject(new Error('getOpenMapAqiData response not ok'))
          }
        })
        .catch(error => {
          clearTimeout(timeoutId)
          return reject(error)
        })
    })
  }

  static processChartData (data, period) {
    const data_ = data.filter(obj => typeof (obj.characteristics.pm2_5ConcMass) !== 'undefined')
    const g = data_.reduce((r, a) => {
      let cVal
      if (period === 'year') {
        let date = new Date(a.time)
        date = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0)
        cVal = date.toString()
      } else {
        cVal = a.time
      }
      r[cVal] = [...r[cVal] || [], a]
      return r
    }, {})
    let chartData = []
    const initVals = { avg: 0, n: 0 }
    for (const prop in g) {
      const avg = g[prop].reduce(AqiApi.averageAqi, initVals).avg
      chartData.push([prop, Math.round(avg)])
    }
    chartData.forEach((row, i) => {
      chartData[i][0] = new Date(row[0])
    })
    chartData = chartData.sort((a, b) => a[0] - b[0])
    return chartData
  }

  static getDeviceMarkers (objects, map) {
    const getMarker = (coord, bgColor) => {
      return L.circleMarker(coord, {
        fillColor: bgColor,
        fillOpacity: 0.7,
        radius: 80,
        stroke: false
      })
    }
    const getPopUpHtml = (obj) => {
      let html = '<div class="popup popup-feature">'
      html += '<h1 class="popup-h1">' + obj.locationName + '</h1>'
      html += '<div class="aqi-popup-category" style="background-color:' + obj.aqiProps.colors.bg.cssHex + '; color:' + obj.aqiProps.colors.text + ';">AQI: ' + Math.round(obj.aqi) + ' - ' + obj.aqiProps.level + '</div>'
      html += '<table>'
      html += '<tr><th style="text-align: bottom; vertical-align: bottom;">Device ID</th><td style="text-align: bottom;">' + obj.deviceId + '</td></tr>'
      html += '<tr><th style="text-align: bottom; vertical-align: bottom;">PM2.5</th><td style="text-align: bottom;">' + obj.pm25ConcMass.toFixed(1) + ' µg/m<sup>3</sup></td></tr>'
      const formattedDate = this.formatDate(new Date(obj.time))
      html += '<tr><th>Updated</th><td>' + formattedDate + '</td></tr>'
      html += '</table>'
      html += '<div class="popup-links">'
      html += '<div class="popup-link-left">'
      html += '<a href="https://maps.google.com/maps?q=&layer=c&cbll=' + obj.location.coordinates.slice().reverse().join() + '" target="_blank">'
      html += '<i class="popup-link-icon street_view" aria-hidden="true"></i>'
      html += 'street view</a>'
      html += '</div>'
      html += '</div>'
      html += '</div>'
      return html
    }
    const onClick = (obj, map) => {
      L.popup({
        autoPanPadding: [64, 64],
        closeOnClick: true,
        keepInView: true,
        maxWidth: 256,
        minWidth: 240,
        maxHeight: 288,
        offset: [0, 0]
      })
        .setLatLng(obj.location.coordinates.slice().reverse())
        .setContent(getPopUpHtml(obj))
        .openOn(map)
    }
    const markers = []
    objects.forEach(obj => {
      if (obj.aqiProps) {
        const marker = getMarker(obj.location.coordinates.slice().reverse(), obj.aqiProps.colors.bg.cssHex)
        marker.on('click', () => {
          onClick(obj, map)
        })
        markers.push(marker)
      }
    })
    const featureGroup = L.featureGroup(markers)
    return (featureGroup)
  }

  static getMap (div) {
    const map = L.map(div)
      .setView([34.0700461, -118.4470284], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    map.zoomControl.setPosition('topright')

    return map
  }

  static getAqiLevel (aqi) {
    let level = null
    if (aqi) {
      if (aqi > 500) {
        level = this.aqiMatrix.filter(obj => obj.upperLimit === null)[0]
      } else {
        level = this.aqiMatrix.filter(obj => aqi >= obj.lowerLimit && aqi <= obj.upperLimit)[0]
      }
    }
    return level
  }

  static getAqiProps (aqi) {
    const level = this.aqiMatrix.filter(obj => aqi >= obj.lowerLimit && aqi <= obj.upperLimit)[0]
    return {
      aqi: aqi,
      bgColor: level.bgColor,
      color: level.color,
      level: level.level
    }
  }

  static averageAqi ({ avg, n }, obj) {
    return {
      avg: (AqiApi.pm25ToAqi(obj.characteristics.pm2_5ConcMass.value) + n * avg) / (n + 1),
      n: n + 1
    }
  }

  static averagePm25ConcMass ({ avg, n }, obj) {
    return {
      avg: (obj.characteristics.pm2_5ConcMass.value + n * avg) / (n + 1),
      n: n + 1
    }
  }

  static Linear (AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
    var linear
    var Conc = parseFloat(Concentration)
    var a
    a = ((Conc - Conclow) / (Conchigh - Conclow)) * (AQIhigh - AQIlow) + AQIlow
    linear = Math.round(a)
    return linear
  }

  static pm25ToAqi (c) {
    let index
    if (c >= 0 && c < 12.1) {
      index = this.Linear(50, 0, 12, 0, c)
    } else if (c >= 12.1 && c < 35.5) {
      index = this.Linear(100, 51, 35.4, 12.1, c)
    } else if (c >= 35.5 && c < 55.5) {
      index = this.Linear(150, 101, 55.4, 35.5, c)
    } else if (c >= 55.5 && c < 150.5) {
      index = this.Linear(200, 151, 150.4, 55.5, c)
    } else if (c >= 150.5 && c < 250.5) {
      index = this.Linear(300, 201, 250.4, 150.5, c)
    } else if (c >= 250.5 && c < 350.5) {
      index = this.Linear(400, 301, 350.4, 250.5, c)
    } else if (c >= 350.5 && c < 500.5) {
      index = this.Linear(500, 401, 500.4, 350.5, c)
    } else {
      index = null
    }
    return index
  }

  static getGaugeDivisor (aqi) {
    let dv
    if (aqi === 0) {
      dv = 1
    } else if (aqi >= 0 && aqi < 210) {
      dv = 311
    } else if (aqi >= 500) {
      dv = 500
    } else if (aqi >= 210 && aqi < 500) {
      const arr = [
        [210, 307],
        [220, 314],
        [230, 321],
        [240, 327],
        [250, 333],
        [260, 339],
        [270, 345],
        [280, 350],
        [290, 355],
        [300, 360],
        [310, 368],
        [320, 376],
        [330, 384],
        [340, 392],
        [350, 400],
        [360, 407],
        [370, 415],
        [380, 422],
        [390, 429],
        [400, 436],
        [410, 443],
        [420, 450],
        [430, 457],
        [440, 463],
        [450, 470],
        [460, 476],
        [470, 482],
        [480, 488],
        [490, 494],
        [500, 500]
      ]
      for (let i = 0; i < arr.length; i++) {
        const l = arr[i][0]
        const u = arr[i + 1][0]
        if (aqi === l) {
          dv = arr[i][1]
          break
        } else if (aqi >= l && aqi < u) {
          dv = arr[i + 1][1]
          break
        }
      }
    }
    return dv
  }

  static getGaugePercent (aqi) {
    let prct
    if (aqi === 0) {
      prct = 0
    } else if (aqi >= 500) {
      prct = 1.01
    } else {
      prct = aqi / this.getGaugeDivisor(aqi)
    }
    return prct
  }

  static getTimeRange (period) {
    let dt = new Date()
    dt.setHours(dt.getHours() - 1)
    let start = new Date()
    if (period === 'hour') {
      start.setHours(dt.getHours() - 1)
    } else if (period === 'day') {
      start.setHours(dt.getHours() -25)
    } else if (period === 'week') {
      start.setDate(dt.getDate() - 8)
    } else if (period === 'month') {
      start.setMonth(dt.getMonth() - 1)
    } else if (period === 'year') {
      start.setYear(dt.getYear() - 1)
    }
    start = start.toISOString()
    const end = dt.toISOString()
    return [start, end]
  }

  static formatChartDataTime (time, format) {
    const d = new Date(time)
    let string
    if (format === 'hour') {
      string = d.toLocaleTimeString('en-US', {
        hour: '2-digit'
      }).replace(/^0+|\s+|M/g, '')
    } else if (format === 'day') {
      string = d.toLocaleDateString('en-US', {
        weekday: 'short'
      }).toUpperCase()
    } else if (format === 'date') {
      string = d.toLocaleDateString('en-US', {
        date: 'short'
      }).replace(/\/(\d{4})/, '')
    } else if (format === 'month') {
      string = d.toLocaleDateString('en-US', {
        month: 'short'
      }).toUpperCase()
    }
    return string
  }

  static formatDate (date) {
    var opt = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return date.toLocaleTimeString('en-us', opt)
  }

  static formatTimeRange (rangeA, period) {
    let opt
    if (period === 'day') {
      opt = {
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        month: 'numeric',
        weekday: 'short',
        year: '2-digit'
      }
    } else if (period === 'week') {
      opt = {
        day: 'numeric',
        month: 'numeric',
        weekday: 'short',
        year: 'numeric'
      }
    } else if (period === 'month') {
      opt = {
        day: 'numeric',
        month: 'numeric',
        weekday: 'short',
        year: 'numeric'
      }
    } else if (period === 'year') {
      opt = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    }
    rangeA.forEach((dt, i) => {
      rangeA[i] = dt.toLocaleDateString('en-us', opt)
    })
    const rangeStr = rangeA.join(' to ')
    return rangeStr
  }

  static formatAddress (obj) {
    const strA = []
    for (const prop in obj) {
      ['ADD1', 'ADD2', 'CTYSTZP'].forEach(field => {
        if (prop === field && obj[prop] !== null) {
          strA.push(obj[prop])
        }
      })
    }
    if (strA.length) {
      return strA.join('<br />')
    } else {
      return null
    }
  }

  static formatTelephone (str) {
    const regEx = /(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g;
    if (str && str.length) {
      var matches = str.match(regEx)
      if (matches && matches.length) {
        matches.forEach(match => {
          str = str.replace(match, '<a href="tel:+1' + match.replace(/\D/g, '') + '">' + match + '</a>')
        })
        return str
      } else {
        return str
      }
    } else {
      return null
    }
  }

  static getGroupTitle (groupId) {
    let title
    switch (groupId) {
      case 'outdoorWorkersVolunteers':
        title = 'Outdoor Workers/Volunteers'
        break
      case 'classes':
        title = 'Classes'
        break
      case 'campusOperations':
        title = 'Campus Operations'
        break
      case 'healthSystemOperations':
        title = 'Health System Operations'
        break
      case 'athleticsOutdoorRec':
        title = 'Athletics & Outdoor Rec'
        break
      case 'outdoorCampsEvents':
        title = 'Outdoor Camps/Events'
        break
      case 'preK12':
        title = 'Pre‐K‐12'
        break
      default:
        title = ''
    }
    return title
  }

  static get weatherUrls () {
    return [
      {
        campus: 'Irvine',
        id: 'uci',
        urls: {
          forecast: 'https://api.weather.gov/gridpoints/SGX/38,57/forecast',
          forecast_: 'https://api.weather.gov/gridpoints/SGX/38,58/forecast',
          forecastHourly: 'https://api.weather.gov/gridpoints/SGX/38,58/forecast/hourly',
          latest: 'https://api.weather.gov/stations/KSNA/observations/latest'
        }
      },
      {
        campus: 'Los Angeles',
        id: 'ucla',
        urls: {
          forecast: 'https://api.weather.gov/gridpoints/LOX/147,46/forecast',
          forecast_: 'https://api.weather.gov/gridpoints/LOX/147,46/forecast',
          forecastHourly: 'https://api.weather.gov/gridpoints/LOX/147,46/forecast/hourly',
          latest: 'https://api.weather.gov/stations/KLAX/observations/latest'
        }
      },
      {
        campus: 'San Diego',
        id: 'ucsd',
        urls: {
          forecast: 'https://api.weather.gov/gridpoints/SGX/54,21/forecast',
          forecast_: 'https://api.weather.gov/gridpoints/SGX/54,20/forecast',
          forecastHourly: 'https://api.weather.gov/gridpoints/SGX/54,20/forecast/hourly',
          latest: 'https://api.weather.gov/stations/E3170/observations/latest'
        }
      },
      {
        campus: 'San Francisco',
        id: 'ucsf',
        urls: {
          forecast: 'https://api.weather.gov/gridpoints/MTR/86,126/forecast',
          forecast_: 'https://api.weather.gov/gridpoints/MTR/82,104/forecast',
          forecastHourly: 'https://api.weather.gov/gridpoints/MTR/82,104/forecast/hourly',
          latest: 'https://api.weather.gov/stations/SFOC1/observations/latest'
        }
      },
      {
        campus: 'Santa Barbara',
        id: 'ucsb',
        urls: {
          forecast: 'https://api.weather.gov/gridpoints/LOX/100,71/forecast',
          forecast_: 'https://api.weather.gov/gridpoints/LOX/100,71/forecast',
          forecastHourly: 'https://api.weather.gov/gridpoints/LOX/100,71/forecast/hourly',
          latest: 'https://api.weather.gov/stations/KSBA/observations/latest'
        }
      }
    ]
  }

  static getCampusWeatherUrls (campusId) {
    const campus = this.weatherUrls.filter(u => u.id === campusId)
    return campus[0] || null
  }

  static getWeatherData (campusId, type) {
    const opt = {
      cache: 'no-cache'
    }
    const controller = new AbortController()
    const signal = controller.signal
    const campus = this.getCampusWeatherUrls(campusId)
    const url = type === 'forecast'
      ? campus.urls.forecast_ : type === 'latest'
        ? campus.urls.latest : type === 'hourly'
          ? campus.urls.forecastHourly
          : campus.urls.forecast_
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        controller.abort()
        reject(new Error('getWeatherData request timed out'))
      }, 10000)
      fetch(url, { ...opt, ...signal })
        .then(response => {
          clearTimeout(timeoutId)
          response.json()
            .then(json => {
              resolve(json)
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          clearTimeout(timeoutId)
          reject(error)
        })
    })
  }

  static getTempWind (campusId) {
    const getPeriod = (periods) => {
      const now = new Date()
      const p = periods.filter(p => now >= new Date(p.startTime) && now < new Date(p.endTime))
      return p[0]
    }
    return new Promise((resolve, reject) => {
      this.getWeatherData(campusId, 'hourly')
        .then(data => {
          if (data.properties) {
            resolve(getPeriod(data.properties.periods))
          } else {
            this.getWeatherData(campusId, 'forecast')
              .then(data => {
                if (data.properties) {
                  resolve(getPeriod(data.properties.period))
                } else {
                  reject(new Error('GetTempWind using forecastHourly service returned no data'))
                }
              })
              .catch(() => {
                reject(new Error('GetTempWind using forecast service error'))
              })
          }
        })
        .catch(() => {
          reject(new Error('GetTempWind forecastHourly error'))
        })
    })
  }

  static getPressHumid (campusId) {
    return new Promise((resolve, reject) => {
      this.getWeatherData(campusId, 'latest')
        .then(data => {
          if (data.properties) {
            resolve(data.properties)
          } else {
            reject(new Error('GetPressHumid returned no data'))
          }
        })
        .catch(() => {
          reject(new Error('GetPressHumid error'))
        })
    })
  }

  static getWeatherForecast (campusId) {
    return new Promise((resolve, reject) => {
      this.getWeatherData(campusId, 'forecast')
        .then(data => {
          if (data.properties) {
            resolve(data.properties)
          } else {
            reject(new Error('GetWeatherForecast returned no data'))
          }
        })
        .catch(() => {
          reject(new Error('GetWeatherForecast error'))
        })
    })
  }

  static degreesToCompass (deg) {
    const cardA = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
    return cardA[Math.floor((deg + 11.25) / 22.5)]
  }

  static cToF (c) {
    return Math.round(c * 1.8 + 32)
  }

  static paToInHg (pa) {
    return (pa * 0.0002953).toFixed(2)
  }

  static kmToMi (km) {
    return Math.round(km * 0.62)
  }

  static mToMi (m) {
    return Math.round(m * 0.00062137)
  }

  static getUrlParams (locHref) {
    const vars = {}
    locHref.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
    return vars
  }
}

export default AqiApi
