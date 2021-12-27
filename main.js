const app = Vue.createApp({
  data() {
    return {
      apiData: [],
      orders: [],
      filteredGames: [],
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
      this.orders = gameTemplates.map((item) => ({
        ...item,
        image: this.getImageUrl(item.ID),
        name: this.getGameName(item.ID),
      }));
      this.dataLength = this.apiData.GameTemplates.length;

      this.filterGames();
    },
    filterGames() {
      this.filteredGames = this.orders
        .filter((e) => e.name?.toLowerCase().includes(this.searchVal))
        .slice(0, this.counter);
      console.log(this.filteredGames);
    },
    onFilterHandler() {
      this.counter = 60;
      this.filterGames();
    },
    getImageUrl(id) {
      try {
        return this.apiData.GameTemplateImages.find(
          (e) => e.GameTemplateId === id
        ).CdnUrl;
      } catch (err) {}
    },
    getGameName(id) {
      try {
        return this.apiData.GameTemplateNameTranslations.find(
          (e) => e.GameTemplateId === id
        ).Value;
      } catch (err) {}
    },
    showMore() {
      this.counter += 60;
      this.filterGames();
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
