import endPoints from "src/constants/endPoints"
import Axios from "axios"

interface SearchByNameInput {
  coordinate: {
    latitude: string
    longitude: string
  }
  place_name: string
}

export const SearchByNameBodyTag = "searchPlacesByName"
export const SearchByNameBody = (input: SearchByNameInput) => ({
  query: `{
    searchPlacesByName(input: {
        coordinate: {
          latitude: "${input.coordinate.latitude}"
          longitude: "${input.coordinate.longitude}"
        }
        place_name: "${input.place_name}"
        limit: 20
    }) {
      name
      address { latitude longitude }
      country
      street_name
      distance
    }
  }`
})



export const SearchPlaces = (input: SearchByNameInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, SearchByNameBody(input))
  .then(res => {
    callback(null, res.data.data[SearchByNameBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}