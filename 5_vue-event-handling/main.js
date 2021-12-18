var app = new Vue({
  el: "#app",
  data: {
    product: "Shock",
    image: "../image/vmSocks-green-onWhite.jpg",
    altText: "A Pair of Sock",
    inventory: 100,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variatId: 2234,
        variantColor: "green",
        variantImage: "../image/vmSocks-green-onWhite.jpg"
      },
      {
        variatId: 2235,
        variantColor: "blue",
        variantImage: "../image/vmSocks-blue-onWhite.jpg"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    }
  }
});
