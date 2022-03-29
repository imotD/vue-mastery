import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "1234abcd",
      name: "Tommy Alhamra",
    },
    categories: [
      "Web Design",
      "Web Developer",
      "Front End Developer",
      "Software Enginger",
    ],
  },
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
  },
  mutations: {},
  actions: {},
});
