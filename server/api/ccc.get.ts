export default defineEventHandler((event) => {
  // 获取 参数
  const query = getQuery(event);
  return {
    state: 200,
    query,
  };
});
