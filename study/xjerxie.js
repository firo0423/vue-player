class Dispatcher {
  constructor() {
    this.handlers = [];
  }

  listen(handler) {
    this.handlers.push(handler);
  }

  // 输入数组进去
  emit(...args) {
    this.handlers.forEach((handler) => {
      handler(...args);
    });
  }
}

let arr = new Dispatcher();
    console.log(arr);
    arr.listen("1");
    console.log(arr);
    arr.emit(["2", "3", "4"]);
    console.log(arr);