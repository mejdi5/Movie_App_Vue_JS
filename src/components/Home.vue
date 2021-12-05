<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AddMovie from './AddMovie.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Home',
  components: {
    AddMovie,
    PulseLoader
  },
  computed: {
    ...mapState(['movies', 'filteringWord', 'filteringRating']),
    ...mapGetters(['filteredMovies'])
  },
  mounted () {
    this.$store.dispatch('getMovies')
  },
  methods: {
    ...mapActions(['deleteMovie', 'setFilteringWord', 'setFilteringRating'])
  }
}
</script>

<template>
<div>
  <PulseLoader v-if="movies.length === 0"/>
  <div class="Search">
    <div class="search">
      <label>Search By Name</label>
      <input type="text" placeholder="movie name ..." :value="filteringWord" @change="setFilteringWord" />
    </div>
    <div class="search">
      <label>Search By Rate</label>
      <input class="rate" type="text" placeholder="movie rate ..." :value="filteringRating" @change="setFilteringRating" />
    </div>
  </div>
  <div v-for='movie in filteredMovies' :key='movie._id'>
    <div class="grid-container">
      <div class="grid-item">
        <img :src="movie.imgUrl" :alt="movie._id"/>
        <button @click="deleteMovie(movie._id)">X</button>
        <h3>{{ movie.title }}</h3>
        <p>Rate: {{movie.rate}}</p>
        <p>Date: {{ movie.date }}</p>
        <p>Description: {{ movie.description }}</p>
        <p>Category: {{ movie.category }}</p>
      </div>
    </div>
  </div>
  <AddMovie />
</div>
</template>

<style>
    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto;
      background-color: #2196F3;
      padding: 10px;
    }
    .grid-item {
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.8);
      padding: 20px;
      font-size: 30px;
      text-align: center;
    }
    button {
      float: right
    }
    .search {
      display: flex;
      justify-content: space-around;
      width: 30%;
      margin-left: 40%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .Search {
      margin-top: 20px;
      margin-bottom: 20px;
    }
</style>
