<template>
  <div>
    <h1>Event Create {{ user.id }}</h1>
    <p>{{ catLength }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  // * cara memanggil vuex

  // * cara 1
  // computed: mapState({
  //   userName: (state) => state.user.name,
  // }),
  //* cara 2
  // computed: mapState(["user"]),
  //* cara 3
  // computed: {
  //   username() {
  //     return this.$store.state.user.name;
  //   },
  //*cara 4
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["catLength"]),
  },
};
</script>

<style lang="scss" scoped></style>
