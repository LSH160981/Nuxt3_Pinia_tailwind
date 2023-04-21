import { d as defineStore } from './server.mjs';

const useAppleStore = defineStore("apple", {
  state: () => {
    return {
      food: "apple-pen",
      foodNum: 14
    };
  },
  getters: {},
  actions: {
    addAppleNum() {
      this.foodNum++;
    }
  }
});

export { useAppleStore as u };
