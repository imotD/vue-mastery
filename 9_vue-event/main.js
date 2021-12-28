Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
        <div class="product-image">
          <img :src="image" :alt="altText" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p> -->
          <p v-else style="text-decoration: line-through">Out of Stock</p>
          <p> Shipping : {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>

          <div
            v-for="(variant,index) in variants"
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor:variant.variantColor }"
            @mouseover="updateProduct(index)"
          ></div>

          <button
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
            @click="addToCart"
          >
            Add to cart
          </button>        
        </div>
      </div>
  `,
  data() {
    return {
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
      ]
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectVariant].variatId);
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
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  }
});
