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
    eventsTotal: 0,
    event: {},
  },
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, event) {
      state.events = event;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((res) => {
            commit("SET_EVENT", res.data);
          })
          .catch((err) => {
            console.log("There was error", err.response);
          });
      }
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((res) => {
          commit("SET_EVENTS_TOTAL", parseInt(res.headers["x-total-count"]));
          commit("SET_EVENTS", res.data);
        })
        .catch((err) => {
          console.log("There was an error:" + err.res);
        });
    },
  },
});
