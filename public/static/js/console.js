const genericStyle = "font-weight: 800; padding: 2px 5px; color: black;";

const createData = (type, color) => {
  return [
    `%cVtuberWiki%c${type.toUpperCase()}%c`,
    genericStyle + "border-radius: 25px 0 0 25px; background: #05c896;",
    genericStyle + `border-radius: 0 25px 25px 0; background: #${color};`,
    "color: unset;",
  ];
};
class CustomConsole {
  constructor() {
    return new Proxy(console, {
      get: (target, prop) => {
        if (typeof target[prop] === "function") {
          return this._overrideMethod(target, prop);
        }
        return target[prop];
      },
    });
  }

  _overrideMethod(target, methodName) {
    return (...args) => {
      let msg;
      switch (methodName) {
        case "log":
          msg = createData("info", "5050ff");
          target[methodName](...msg, ...args);
          break;

        case "warn":
          msg = createData("warning", "ffcd00");
          target[methodName](...msg, ...args);
          break;

        case "error":
          msg = createData("error", "ff5050");
          target[methodName](...msg, ...args);
          break;

        case "debug":
          msg = createData("debug", "1f00ff");
          target[methodName](...msg, ...args);
          break;

        default:
          msg = createData("unkown", "bb00ff");
          target[methodName](...msg, ...args);
          break;
      }
    };
  }
}

// Override the global console
console = new CustomConsole();