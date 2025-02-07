import { createStore } from 'vuex'

export default createStore({
  state: {
    visitedRestaurants: {},
  },
  mutations: {
    VISIT_RESTAURANT(state, restaurantName) {
      if (state.visitedRestaurants[restaurantName]) {
        state.visitedRestaurants[restaurantName] += 1
      } else {
        state.visitedRestaurants[restaurantName] = 1
      }
    },
  },
  actions: {
    visitRestaurant({ commit }, restaurantName) {
      commit('VISIT_RESTAURANT', restaurantName)
    },
  },
  getters: {
    getVisitedRestaurants: (state) => state.visitedRestaurants,
  },
})
