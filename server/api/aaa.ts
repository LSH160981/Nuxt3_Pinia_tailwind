/**
 * 要访问必须写在server这个目录下
    一定要暴露  defineEventHandler  这个函数
    这个函数return出来一些数据 当然给我们也可以使用 event.node.res.end(数据)
    的方式返回数据
  */

export default defineEventHandler((event) => {
  // 这里操作的代码都将在服务器中执行
  // console.log("New request: " + event.node.req.url);

  // return {
  //   name: "nuxt",
  //   gender: "man",
  //   age: 18,
  //   url: event.path,
  // };
  let arr = [{ age: 15 }, { name: "lisi" }];
  let response_data = JSON.stringify(arr);
  event.node.res.end(response_data);
});
