import { nextTick } from "../helpers";
import { setup } from "../../src/main";

describe("Root", () => {
  test("Add a Task", async () => {
    let taskName = "Test task";

    await setup();
    await nextTick();

    let app = document.body.querySelector(".todo-app");
    let input = app.querySelector("input");
    input.value = taskName;
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    await nextTick();

    let task = app.querySelector(".task");
    let taskLabel = task.querySelector("label");
    expect(taskLabel.innerHTML).toBe(taskName);
  });
});
