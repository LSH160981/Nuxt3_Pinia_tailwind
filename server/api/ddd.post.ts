export default defineEventHandler(async (event) => {
  event.node.req.headers.token && console.log(event.node.req.headers.token);

  const body = await readBody(event);
  return {
    state: 200,
    body,
  };
});
