import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../travelItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    travelguideData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const url = `https://apis.ccbp.in/tg/packages`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const modifiedData = responseData.packages.map(item => ({
        id: item.id,
        description: item.description,
        imageUrl: item.image_url,
        name: item.name,
      }))

      this.setState({
        travelguideData: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderImagesContainer = () => {
    const {travelguideData} = this.state
    return (
      <ul className="travel-list-container">
        {travelguideData.map(item => (
          <TravelItem key={item.id} data={item} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" height="50px" width="50px" />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderImagesContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="page-heading">Travel Guide</h1>
        {this.renderAll()}
      </div>
    )
  }
}

export default Home
