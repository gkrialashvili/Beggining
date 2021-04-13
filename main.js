const app = Vue.createApp({
  data() {
    return {
      firstName: "Gio",
      lastName: "Doe",
      gender: "male",
      email: "Doe@gmail.com",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    };
  },
  methods: {
    async getUser() {
      const res = await fetch("https://randomuser.me/api");
      const { results } = await res.json();
      const user = results[0];

      console.log(user);

      (this.firstName = user.name.first),
        (this.lastName = user.name.last),
        (this.gender = user["gender"]),
        (this.email = user.email),
        (this.picture = user.picture.large);
    },
  },
  mounted() {
    this.getUser();
  },
});

app.mount("#app");
