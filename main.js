const app = Vue.createApp({
  data() {
    return {
      apiData: [],
      orders: [],
      counter: 60,
    };
  },
  methods: {
    async getGames() {
      const response = await fetch(
        "https://betwill.com/api/game/getgametemplates/1/1/1"
      );
      const data = await response.json();
      this.apiData = data;
      const gameTemplates = data.GameTemplates.sort(
        (a, b) => a.DefaultOrdering - b.DefaultOrdering
      );
      this.orders = gameTemplates.slice(0, this.counter).map((item) => ({
        ...item,
        image: this.getImageUrl(item.ID),
        name: this.getGameName(item.ID),
      }));
    },
    getImageUrl(id) {
      return this.apiData.GameTemplateImages.find(
        (e) => e.GameTemplateId === id
      ).CdnUrl;
    },
    getGameName(id) {
      return this.apiData.GameTemplateNameTranslations.find(
        (e) => e.GameTemplateId === id
      ).Value;
    },
    clickThis() {
      this.counter += 60;
      this.getGames();
      console.log(this.counter);
    },
  },
  mounted() {
    this.getGames();
  },
});

app.mount("#app");
