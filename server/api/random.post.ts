/**
 * https://www.random.org/integers/?num=5&min=-1&max=1000&col=1&base=10&format=plain&rnd=new
 */
const BASE_URL = "https://www.random.org/integers/";
export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  //   console.log(q.num);
  const req_url = `${BASE_URL}?num=${q.num}&min=${q.min}&max=${q.max}&col=1&base=10&format=plain&rnd=new`;

  let result_data = "";
  await fetch(req_url)
    .then((response) => response.text())
    .then((result) => {
      result_data = result || "";
    });

  return {
    result_data,
  };
});
