// 完整写法 -- 有些逻辑可以写在这里
export const useCounter = () => {
  return useState("counter", () => {

    // 通过 process 来判断哪些代码 是用户端执行的代码 | 服务器执行
    if (process.server) {
      console.log("server");
    } else if (process.client) {
      console.log("client");
    }

    return 666;
  });
};

// 简写
// export const useCounter = () => useState<number>("counter", () => 666);
