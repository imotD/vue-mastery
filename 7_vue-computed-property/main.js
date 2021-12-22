var app = new Vue({
  el: "#app",
  data: {
    brand: "Mastery",
    product: "Shock",
    altText: "A Pair of Sock",
    selectVariant: 0,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variatId: 2234,
        variantColor: "green",
        variantImage: "../image/vmSocks-green-onWhite.jpg",
        variantQty: 10
      },
      {
        variatId: 2235,
        variantColor: "blue",
        variantImage: "../image/vmSocks-blue-onWhite.jpg",
        variantQty: 0
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(index) {
      this.selectVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectVariant].variantQty;
    }
  }
});
