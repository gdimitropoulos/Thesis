import { shallowMount, mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('HelloWorld.vue', async () => {
  it('renders props.msg when passed', async () => {
    const wrapper = mount(App);
    await wrapper.setData({ mydata: 'bar' })

     const todo = wrapper.get('[data-test="message"]')
     expect(todo.text()).toContain('Nέα πανεπιστημίου Πατρών')
     await wrapper.setData({ mydata: 'newss' })

     const todos = wrapper.get('[data-test="message"]')
     expect(todos.text()).toContain('Nέα πανεπιστημίου Πατρών')
  })
})
