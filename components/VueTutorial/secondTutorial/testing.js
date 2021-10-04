import { shallowMount, mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(App)

  const todo = wrapper.get('[data-test="message"]')

  expect(todo.text()).toContain('Hello World')
  })
})
