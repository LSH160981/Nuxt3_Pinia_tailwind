import { defineEventHandler, getQuery } from 'h3';

const BASE_URL = "https://www.random.org/integers/";
const random_post = defineEventHandler(async (event) => {
  const q = getQuery(event);
  const req_url = `${BASE_URL}?num=${q.num}&min=${q.min}&max=${q.max}&col=1&base=10&format=plain&rnd=new`;
  let result_data = "";
  await fetch(req_url).then((response) => response.text()).then((result) => {
    result_data = result || "";
  });
  return {
    result_data
  };
});

export { random_post as default };
