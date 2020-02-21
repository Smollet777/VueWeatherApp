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
          v-on:keypress.enter="fetchByCityName"
        />
      </div>
      <template v-if="noLocation">
        <h3>Enable geolocation to fetch data automatically</h3>
      </template>
      <div class="weather-wrap" v-if="typeof weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
          <!-- <div class="date">{{new Date() | moment('LLLL') }}</div> -->
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
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      noLocation: true,
      query: ""
    };
  },
  beforeMount() {
    //this.fetchByCoordinates();
  },
  methods: {
    fetchByCityName() {
      this.$store.dispatch("fetchWeather", "cityname", this.query);
      //this.fetchWeather("cityname", this.query);
    },
    async fetchByCoordinates() {
      try {
        const { lat, lng } = await this.$getLocation();
        this.noLocation = false;
        this.fetchWeather("coordinates", { lat, lng });
      } catch (error) {
        this.noLocation = true;
      }
    },
    setResults(results) {
      console.log(results);
      this.weather = results;
    }
  },
  computed: mapGetters(["weather"])
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
  color: rgba(255, 255, 255, 1);
  text-align: center;
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
