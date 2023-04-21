/**
 * 这里是测试Pinia的
 *  这里的 defineStore 和 acceptHMRUpdate 在nuxt.config.ts 中已经完成自动引入
 */

export const useAppleStore = defineStore("apple", {
  state: () => {
    return {
      food: "apple-pen",
      foodNum: 14,
    };
  },

  getters: {},

  actions: {
    addAppleNum() {
      // console.log(import.meta);
      this.foodNum++;
    },
  },
});

//  if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAppleStore as any, import.meta.hot));
// }
