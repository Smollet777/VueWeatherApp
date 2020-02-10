<template>
  <div
    id="app"
    :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'warm' : 'cold'"
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for city..."
          v-model.trim="query"
          v-on:keypress="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
          <div class="date">{{new Date() | moment('LLLL') }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{Math.round(weather.main.temp)}}°c</div>
          <div class="weather">{{weather.weather[0].main}}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      api_key: "7581af8da7499cff0f7014b04ceb3cab",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {}
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${
            this.api_key
          }`
        )
          .then(res => res.json())
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
}

#app {
  background-size: cover;
  background-position: top;
  transition: 0.4s;
}

#app.cold {
  background-image: url("./assets/cold-bg.jpg");
}

#app.warm {
  background-image: url("./assets/warm-bg.jpg");
}

main {
  min-height: 100vh;
  padding: 1.5rem;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
}
.search-box,
.weather-wrap {
  max-width: 768px;
  margin: 0 auto;
}

.search-box {
  margin-bottom: 2rem;
}
.search-box .search-bar {
  width: 100%;
  display: block;
  padding: 1rem;
  color: rgba(49, 49, 49, 1);
  font-size: 1.2rem;
  border-radius: 0 1rem;
  border: none;
  appearance: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  transition: 0.4s;
}
.search-box .search-bar:focus {
  border-radius: 1rem 0;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
}

.location-box,
.weather-box {
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.location-box .location {
  font-size: 2rem;
  font-weight: 500;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  font-size: 1.2rem;
  font-weight: 300;
  font-style: italic;
}

.weather-box {
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .temp {
  padding: 10px 25px;
  margin: 30px auto;
  width: fit-content;
  border-radius: 1rem;
  font-size: 8rem;
  font-weight: 900;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  font-size: 3rem;
  font-weight: 700;
  font-style: italic;
}
</style>
