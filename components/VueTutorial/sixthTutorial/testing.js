import { flushPromises, mount,  } from "@vue/test-utils"
import App from "../../src/App.vue"
import router from "../../src/router/index"


describe("App", () => {
  it("renders a child component via routing", async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
      stubs: ['router-link']
    })
    await wrapper.find('#first').find('.myclass').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('I am on the first page')
  })
})