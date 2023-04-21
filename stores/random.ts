/**
 * 获取随机数
 *num=5&min=-1&max=1000&col=1&base=10&format=plain&rnd=new
 */
export const useRandomStore = defineStore("random", {
  state: () => {
    return {
      params: {
        num: 5,
        min: 0,
        max: 100,
        // col: 1,
        // base: 10,
        // format: "plain",
        // rnd: "new",
      },
      random_data: [],
    };
  },

  getters: {},

  actions: {
    get_random() {
      useFetch("/api/random", {
        method: "POST",
        params: this.params,
      }).then((res) => {
        // console.log(res.data.value);
        if (res.data.value) {
          // 由于返回的数据是 [36\n17\n80\n22\n64\n ]<-- 是这样的
          // split 分割数组 map(Number) 类型转换  <-- 但是不够会出bug 末尾多一个元素0
          // 在分割前前 要先去掉空格 不然map(Number) 会把空格转化成0
          this.random_data = res.data.value.result_data.trim().split("\n").map(Number) as [];
        }
      });
    },
  },
});

//  if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAppleStore as any, import.meta.hot));
// }
