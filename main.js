const app = Vue.createApp({
  data() {
    return {
      Thisimages: [],
      orders: [],
    };
  },
  methods: {
    async getUser() {
      const response = await fetch(
        "https://betwill.com/api/game/getgametemplates/1/1/1"
      );
      const data = await response.json();
      this.orders = data.GameTemplates.sort(
        (a, b) => a.DefaultOrdering - b.DefaultOrdering
      );
      // this.Thisimages = data.GameTemplateImages.slice(0, 10);
      this.Thisimages = data.GameTemplateImages.sort(
        (a, b) => this.orders.ID(a) - this.orders.ID(b)
      );

      console.log(this.orders);
    },
  },
  mounted() {
    this.getUser();
  },
});

app.mount("#app");
