var eventBus = new Vue();

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
        <product-tabs :reviews="reviews"></product-tabs>            
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
      ],
      reviews: []
    };
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
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

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">
        {{error}}
      </li>
    </ul>

  </p>
  
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <span v-for="(tab , index) in tabs" :key='index' class="tab" :class="{activeTab: selectedTab === tab}" @click="selectedTab = tab">
      {{tab}}
    </span>

      <div v-show="selectedTab === 'Reviews'">          
        <p v-if="!reviews.length">There are no reviews yes.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>{{review.review}}</p>
            <p>{{review.rating}}</p>
          </li>
        </ul>

        </div>    
        <product-review v-show="selectedTab === 'Make a Review'"></product-review>
  </div>

  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
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
