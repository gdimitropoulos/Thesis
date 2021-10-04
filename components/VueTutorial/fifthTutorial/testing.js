import { shallowMount, mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('HelloWorld.vue', async () => {
  it('renders props.msg when passed', async () => {
    const wrapper = mount(App);

     const todo = wrapper.get('#first p')
     const todo1 = wrapper.get('#second p')
     const todo2 = wrapper.get('#third p')

     expect(todo.text()).toContain('H νέα σχολική χρόνια ξεκινάει απο 11 Οκτωμβρίου')
     expect(todo1.text()).toContain('Αποτελέσματα εξεταστική περιόδου για το μάθημα Βασεις 2')
     expect(todo2.text()).toContain('Νέα έρευνα του πανεπηστημίου Πατρών')
  })
})
