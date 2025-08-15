<script setup>
import { ref, onMounted } from 'vue'

const config_REF = ref({})
// 使用原生js创建一个axios post
function axios(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url)
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.onerror = () => {
      reject(xhr.statusText)
    }
    xhr.send(config.data)
  })
}

async function requestData() {
  axios({
    method: 'post',
    url: '/scottstudio/peiwan/get-config',
  })
    .then((data) => {
      config_REF.value = { ...data };
    })
    .catch((error) => {
      $message.error('读取失败')
    })
}
onMounted(requestData)
</script>

<template>
  <div class="peiwan-section">
  </div>
</template>

<style scoped>

</style>
