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
    //* alias - kalau kita nulis path sesuai alias dia kan tetap esekusi path utamanya walaupun berbeda
  },
  {
    path: "/event",
    redirect: { name: "event-show" }
    //* redirect - kalau kita nulis path dia kan langsung mengganti ke path yang rujukannya
  },
  {
    path: "/event/:name",
    name: "event-create",
    props: true,
    //* cara mudah untuk mendapatkan nilai dari $route.params dengan menambahkan props:true
    component: EventCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
