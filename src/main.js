import { mount } from "@odoo/owl";
import { Root } from "./components/Root/Root";
import { createTaskStore } from "./TaskList";

export function setup() {
  const env = {
    store: createTaskStore(),
  };
  mount(Root, document.body, { dev: true, env });
  return env;
}

setup();
