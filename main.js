const app = Vue.createApp({
  data() {
    return {
      apiData: [],
      orders: [],
      dataLength: 0,
      counter: 60,
      selected: "",
      searchVal: "",
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
      if (this.searchVal !== "")
        this.orders = gameTemplates
          .slice(0, this.counter)
          .map((item) => ({
            ...item,
            image: this.getImageUrl(item.ID),
            name: this.getGameName(item.ID),
          }))
          .filter((e) => e.name?.toLowerCase().includes(this.searchVal));
      else
        this.orders = gameTemplates.slice(0, this.counter).map((item) => ({
          ...item,
          image: this.getImageUrl(item.ID),
          name: this.getGameName(item.ID),
        }));
      console.log(this.orders);
      this.dataLength = this.apiData.GameTemplates.length;
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
    showMore() {
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

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsiveClass: true,
  items: 2,
  autoplay: true,
  autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 2,
    },
  },
});

$(document).ready(function () {
  $(".js-example-basic-single").select2({
    placeholder: "All Providers",
    width: "100px",
  });
});
