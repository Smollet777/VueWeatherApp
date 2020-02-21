export default {
  state: {
    api_key: "7581af8da7499cff0f7014b04ceb3cab",
    url_base: "https://api.openweathermap.org/data/2.5/",
    weather: {
      name: String,
      sys: {
        country: String
      },
      main: {
        temp: Number
      },
      weather: [{
        main: String
      }
      ]
    },
    fetches: {
      cityname: query =>
        fetch(
          `${this.url_base}weather?q=${query}&units=metric&APPID=${this.api_key}`
        ),
      coordinates: ({ lat, lng }) =>
        fetch(
          `${this.url_base}weather?lat=${lat}&lon=${lng}&units=metric&APPID=${this.api_key}`
        )
    }
  },
  actions: {
    fetchWeather(ctx, method, ...args) {
      ctx.state.fetches[method](...args)
        .then(res => res.json())
        .then(res => ctx.commit('updateWeather', res));
    }
  },
  mutations: {
    updateWeather(state, newWeather) {
      state.weather = newWeather
    }
  },
  getters: {
    weather(state) {
      return state.weather
    },
    apiKey(state) {
      return state.api_key
    },
    urlBase(state) {
      return state.url_base
    }
  }
}