import { mount } from '@vue/test-utils'

import App from '../../src/App.vue'


    describe('Foo', () => {
      it('renders a div', async () => {
        const wrapper = await mount(App, {
          propsData: {
          }
        })
        console.log(wrapper.text())
        expect(wrapper.text()).toContain('Hello World')
      })
    })


