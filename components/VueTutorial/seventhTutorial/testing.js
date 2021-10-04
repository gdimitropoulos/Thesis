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
    })
    await wrapper.findAll('.tweet')[0].find('a').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('I am on the first page')
    await wrapper.find('a').trigger('click')
    await flushPromises()
    await wrapper.findAll('.tweet')[1].find('a').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('I am on the second page')
    console.log(wrapper.html())
    await wrapper.find('a').trigger('click')
    await flushPromises()
    await wrapper.findAll('.tweet')[2].find('a').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('I am on the third page')
    console.log(wrapper.html())
  })
})