<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  audio_url: {
    type: String,
    default: '',
  },
})

// 响应式数据
const isPlay = ref(false)
const totalTime = ref(0)
const currentTime = ref(0)
const audio = ref(null)

// 计算属性
const formatCurrentTime = computed(() => formatTime(currentTime.value))

// 生命周期
onMounted(() => {
  audio.value.src = props.audio_url
})

// 方法
function play() {
  audio.value.play()
  isPlay.value = true
}

function pause() {
  audio.value.pause()
  isPlay.value = false
}

function togglePlay() {
  isPlay.value ? pause() : play()
}

function loadingFinish() {
  totalTime.value = audio.value.duration
}

function update() {
  currentTime.value = audio.value.currentTime
}

// 工具函数
function formatTime(value) {
  const minute = String(Math.floor(value / 60)).padStart(2, '0')
  const second = String(Math.floor(value % 60)).padStart(2, '0')
  return `${minute}:${second}`
}

</script>

<template>
  <div class="audio-container">
    <div class="flex items-center gap-1" @click="togglePlay">
      <span v-if="!isPlay" class="icon">
        <i class="fa-solid fa-circle-play play-icon" aria-hidden="true" />
      </span>
      <span v-else class="icon">
        <i class="fa-solid fa-circle-pause pause-icon" aria-hidden="true" />
      </span>
      <div v-if="isPlay" class="time font-small">
        {{ formatCurrentTime }}
      </div>
      <div v-else class="name">
        试听
      </div>
    </div>
    <audio ref="audio" style="display: none" controls @timeupdate="update" @ended="pause" @canplay="loadingFinish" />
  </div>

</template>

<!-- 样式部分保持不变 -->

<style scoped>
.audio-container {
  padding: 2px 8px;
  text-align: center;
  color: #fff;
  background: linear-gradient(115deg, #ff00e5, #5813f7);
  border-radius: 16px;
  font-size: 12px;
  margin-right: 4px;
  transition: .35s;
  cursor: pointer
}

.icon {
  font-size: 12px;
  color: #fff;
}

.icon:hover {
  cursor: pointer;
}

.time {
  color: #fff;
}

input[type='range'] {
  outline: none;
  -webkit-appearance: none;
  /*清除系统默认样式*/
  width: 100% !important;
  background: -webkit-linear-gradient(#10a9ff, #10a9ff) no-repeat, #dddddd;
  /*背景颜色，俩个颜色分别对应上下*/
  background-size: 0% 100%;
  /*设置左右宽度比例，这里可以设置为拖动条属性*/
  height: 2px;
  /*横条的高度，细的真的比较好看嗯*/
  padding: 0;
  cursor: ew-resize;
  transition: none;
}

/*拖动块的样式*/
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  /*清除系统默认样式*/
  height: 10px;
  /*拖动块高度*/
  width: 3px;
  /*拖动块宽度*/
  background: var(--primary-color);
  /*拖动块背景*/
  border-radius: 8px;
}
</style>
