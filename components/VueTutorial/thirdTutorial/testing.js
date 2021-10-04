import { shallowMount, mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('HelloWorld.vue', async () => {
  it('renders props.msg when passed', async () => {
    const wrapper = mount(App);
    await wrapper.setData({ message: 'bar' })

  const todo = wrapper.get('[data-test="message"]')
  expect(todo.text()).toContain('bar')
  })
})
