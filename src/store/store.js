import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "1234abcd",
      name: "Tommy Alhamra",
    },
    categories: [
      "sustainbility",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "communitiy",
    ],
    count: 0,
    events: [],
  },
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
  },
});
