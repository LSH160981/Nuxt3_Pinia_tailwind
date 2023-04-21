//  [...].ts 所有没有匹配到的路由都会走这里

export default defineEventHandler((event) => {
  return "Hei brother's address is written wrong";
});
