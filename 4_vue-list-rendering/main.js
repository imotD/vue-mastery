var app = new Vue({
  el: "#app",
  data: {
    product: "Shock",
    image: "/image/vmSocks-green-onWhite.jpg",
    altText: "A Pair of Sock",
    inventory: 100,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variatId: 2234,
        variantColor: "green"
      },
      {
        variatId: 2235,
        variantColor: "blue"
      }
    ]
  }
});
