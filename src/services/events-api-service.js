import TokenService from './token-service'
import config from '../config'

const EventsApiService = {
  postEvent(event) {
    return fetch(`${config.API_ENDPOINT}/api/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(event)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
            .then(window.location = `/myevents`)
      )
  }
}

export default EventsApiService;