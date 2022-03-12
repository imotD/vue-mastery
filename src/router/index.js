import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";

Vue.use(VueRouter);
//* cara menganti route dengan 2 opsi -> dari menggunakan alias atau redirect
const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event-us",
    name: "event-show",
    component: EventShow,
    alias: "/event"
  },
  // {
  //   path: "/event",
  //   redirect: { name: "event-show" }
  // },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
