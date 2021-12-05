import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    filteringWord: '',
    filteringRating: 1
  },
  getters: {
    filteredMovies (state) {
      return state.movies
        .filter(movie => movie.title.toLowerCase().trim().startsWith(state.filteringWord.toLowerCase().trim()))
        .filter(movie => movie.rate >= state.filteringRating)
    }
  },
  mutations: {
    SET_MOVIES (state, movies) {
      state.movies = movies
    },
    DELETE_MOVIE (state, amount) {
      state.movies = state.movies.filter(movie => movie._id !== amount)
    },
    ADD_MOVIE (state, newMovie) {
      state.movies = [...state.movies, newMovie]
    },
    SET_FILTERING_WORD (state, event) {
      state.filteringWord = event.target.value
    },
    SET_FILTERING_RATING (state, event) {
      isNaN(Number(event.target.value)) === false
        ? state.filteringRating = Number(event.target.value)
        : alert('Movie rate must be a number')
    }
  },
  actions: {
    getMovies ({ commit }) {
      axios
        .get('https://movie-app-gmc.herokuapp.com/api/movies')
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
    },
    deleteMovie ({ commit }, amount) {
      commit('DELETE_MOVIE', amount)
    },
    addMovie ({ commit }, newMovie) {
      commit('ADD_MOVIE', newMovie)
    },
    setFilteringWord ({ commit }, event) {
      commit('SET_FILTERING_WORD', event)
    },
    setFilteringRating ({ commit }, event) {
      commit('SET_FILTERING_RATING', event)
    }
  }
})
