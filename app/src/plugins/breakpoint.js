import { reactive, onMounted, onUnmounted } from 'vue'

const state = reactive({
  isMobile: window.innerWidth <= 600
})

function update() {
  state.isMobile = window.innerWidth <= 600
}

window.addEventListener('resize', update)

export default {
  install(app) {
    app.config.globalProperties.$breakpoint = state
  }
}
