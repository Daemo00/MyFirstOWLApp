import { Component, xml, useRef, onMounted, useState } from "@odoo/owl";
import { Task } from "../Task/Task";
import { useStore } from "../../Store";
import "./Root.css";

export class Root extends Component {
  static template = xml/* xml */ `
    <div class="todo-app">
      <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
      <div class="task-list">
        <t t-foreach="displayedTasks" t-as="task" t-key="task.id">
          <Task task="task"/>
        </t>
      </div>
      <div class="task-panel" t-if="store.tasks.length">
        <div class="task-counter">
          <t t-esc="displayedTasks.length"/>
          <t t-if="displayedTasks.length lt store.tasks.length">
              / <t t-esc="store.tasks.length"/>
          </t>
          task(s)
        </div>
        <div>
          <span t-foreach="['all', 'active', 'completed']"
            t-as="f" t-key="f"
            t-att-class="{active: filter.value===f}"
            t-on-click="() => this.setFilter(f)"
            t-esc="f"/>
        </div>
      </div>
    </div>`;
  static components = { Task };

  setup() {
    const inputRef = useRef("add-input");
    onMounted(() => inputRef.el.focus());
    this.store = useStore();
    this.filter = useState({ value: "all" });
  }

  get displayedTasks() {
    const tasks = this.store.tasks;
    switch (this.filter.value) {
      case "active":
        return tasks.filter((t) => !t.isCompleted);
      case "completed":
        return tasks.filter((t) => t.isCompleted);
      case "all":
        return tasks;
    }
    return tasks;
  }

  setFilter(filter) {
    this.filter.value = filter;
  }

  addTask(ev) {
    if (ev.key === "Enter") {
      this.store.addTask(ev.target.value);
      ev.target.value = "";
    }
  }
}
