import { shallowMount, mount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("HelloWorld.vue", async () => {
  it("renders props.msg when passed", async () => {
    const wrapper = mount(App);

    const todo = await wrapper.findAll(".tweet p")[0];
    const todo1 = await wrapper.findAll(".tweet p")[1];
    const todo2 = await wrapper.findAll(".tweet p")[2];
    const todo3 = await wrapper.findAll(".tweet h3")[0];
    const todo4 = await wrapper.findAll(".tweet h3")[1];
    const todo5 = await wrapper.findAll(".tweet h3")[2];
    expect(todo.text()).toContain(
      "H νέα σχολική χρόνια ξεκινάει απο 11 Οκτωμβρίου"
    );
    expect(todo1.text()).toContain(
      "Αποτελέσματα εξεταστική περιόδου για το μάθημα Βασεις 2"
    );
    expect(todo2.text()).toContain("Νέα έρευνα του πανεπηστημίου Πατρών");

    expect(todo3.text()).toContain("Έναρξη μαθημάτων");
    expect(todo4.text()).toContain("Ανακοίνωση βαθμολογιών");
    expect(todo5.text()).toContain("Αποτελέσματα έρευνας");
  });
});
