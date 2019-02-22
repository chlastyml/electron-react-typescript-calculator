import { createElement } from "react";
import { render } from "react-dom";

import { App } from "./App";

const bootstrap = () => {
  const mountTo = document.querySelector("#app");
  render(createElement(App), mountTo);
};

bootstrap();
