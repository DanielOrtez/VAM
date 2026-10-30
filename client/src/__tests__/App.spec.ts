import {describe, expect, it, vi} from 'vite-plus/test'

import {mount} from '@vue/test-utils'
import App from '../App.vue'
import {createTestingPinia} from '@pinia/testing'
import router from "@/router";

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
