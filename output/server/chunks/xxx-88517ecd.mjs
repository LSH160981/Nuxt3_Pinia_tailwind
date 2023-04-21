import { f as useState } from './server.mjs';

const useCounter = () => {
  return useState("counter", () => {
    {
      console.log("server");
    }
    return 666;
  });
};

export { useCounter as u };
