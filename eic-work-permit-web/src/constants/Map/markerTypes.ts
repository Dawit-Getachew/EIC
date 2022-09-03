enum MarkerTypes {
  ORIGIN = "ORIGIN",
  DESTINATION = "DESTINATION",
  DEFAULT = "DEFAULT"
}

export const getMarkerColor = (markerType: string) => {
  console.log('type', markerType)
  switch(markerType) {
    case MarkerTypes.ORIGIN: {
      return 'red'
    }

    case MarkerTypes.DESTINATION: {
      return 'blue'
    }

    case MarkerTypes.DEFAULT: {
      return 'black'
    }

    default: {
      return 'green'
    }
  }
}

export default MarkerTypes