import { createApp, nextTick, watch } from 'vue';

import Peiwan from './peiwan.vue';
import axios from 'axios';

function init() {
  if (localStorage.getItem('peiwanConfig')) {
    const config = JSON.parse(localStorage.getItem('peiwanConfig'));
    const selector = config.peiwan_selector;
    initVue(selector)
    return
  }
  axios({
    method: 'post',
    url: '/scottstudio/peiwan/get-config',
  })
    .then(({ data }) => {
      localStorage.setItem('peiwanConfig', JSON.stringify(data));
      const selector = data.peiwan_selector;
      init(selector)
    })
    .catch((error) => {
      console.error('Error fetching configuration:', error);
    });
}
function initVue(selector) {
  const selectors = selector.split(',');
  selectors.forEach(async (selector) => {
    const wrapper = document.querySelector(selector);
    if (wrapper) {
      const dom = document.createElement('div');
      wrapper.parentNode.insertBefore(dom, wrapper.nextSibling);
      await nextTick()
      const appImg = createApp(Peiwan);
      appImg.mount(dom);
    } else {
      if (window.location.pathname === '/') {
        setTimeout(() => {
          initVue(selector)
        }, 350);
      }
    }
  })
}
window.addEventListener('load', init, false);

// 存储前一个href值
let previousHrefPeiwan = window.location.href;
function handlePopState() {
  const currentHrefPeiwan = window.location.href;
  if (currentHrefPeiwan !== previousHrefPeiwan) {
    // 更新前一个href值
    previousHrefPeiwan = currentHrefPeiwan;
    init()
  }
}
setInterval(() => {
  handlePopState()
}, 1000);
