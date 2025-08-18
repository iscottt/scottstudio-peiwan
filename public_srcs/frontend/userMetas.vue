<script setup>
import { computed, ref } from 'vue';
function isBeautifulID(id) {
  if (id <= 99)
    return true
  const beautifulList = [111, 123, 222, 234, 321, 333, 345, 432, 444, 456, 520, 521, 543, 555, 567, 654, 666, 678, 765, 777, 789, 876, 888, 920, 921, 987, 999, 1111, 1234, 1314, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2222, 2345, 4321, 3333, 3456, 4321, 4444, 4567, 5200, 5210, 5432, 5555, 5678, 6543, 6666, 6789, 7654, 7777, 8765, 8888, 9876, 9999]
  if (beautifulList.includes(id))
    return true
  return false
}
const props = defineProps({
  user: {
    type: Object,
    default: {}
  },
  vipLevel: {
    type: Object,
    default: {}
  },
  site_metas:{
    type: Object,
    default: {}
  },
  is_left:{
    type: Boolean,
    default: false
  }
})
const levelImgMap = computed(() => {
  if (!props.site_metas.sc_levels)
    return {}
  return props.site_metas.sc_levels.map(item => item.img)
})
const userLevelName = computed(() => {
  const scLevels = computed(() => props.site_metas.sc_levels ?? [])
  const userLevel = ref(Math.max(props.user.author_level || props.user.level || 0, 0))

  if (scLevels.value.length === 0)
    return ''

  // 处理等级越界情况
  const safeLevel = Math.min(userLevel.value, scLevels.value.length) - 1
  const validIndex = Math.max(safeLevel, 0)

  return scLevels.value[validIndex]?.level || ''
})
const lastLevel = computed(() => {
  if (!props.site_metas.sc_levels || !props.site_metas.sc_levels.length)
    return ''
  return props.site_metas.sc_levels[props.site_metas.sc_levels.length - 1].img
})
const vipLevel = computed(() => {
  const user_vip_level = props.vipLevel
  const vipTypeList = props.site_metas.sonare_vip_config_types || []
  const findOne = vipTypeList.find(item => item.level === user_vip_level)
  return findOne || {}
})
const userID = computed(() => {
  return props.user.id
})
// 展开查看所有徽章
function showBadgesModal() {
  window.$dialog.alert({
    component: markRaw(BadgeModal),
    user: props.user,
    userID,
  })
}

const showLastLevel = computed(() => {
  if (!props.site_metas.sc_levels || !props.site_metas.sc_levels.length)
    return false
  const level = props.user.author_level || props.user.level
  return level > props.site_metas.sc_levels.length
})

const currentBadge = computed(() => {
  if (!props.site_metas.sc_badges)
    return {}
  const wear = props.user.wear_badge
  const current = props.site_metas.sc_badges.find(item => item.name === wear)
  return current || {}
})

</script>

<template>
  <!-- 靓号 -->
  <span v-if="isBeautifulID(userID)" :data-tooltip="site_metas.somnia_liang_tooltip">
    <img v-if="site_metas.somnia_beautiful_url" :src="site_metas.somnia_beautiful_url"
      class="h-3 img-liang">
    <SvgIcon v-else icon="icon-liang" size="14" />
  </span>
  <span v-if="userID" class="!text-xs !text-[--error-color] flex items-center gap-1"
    :data-tooltip="`ID${isBeautifulID(userID) ? '靓' : ''}号:${userID}`">
    <span class="blogger-tag warn !font-bold">ID:{{ userID }}</span>
  </span>
  <!-- 会员徽章 -->
  <div v-if="vipLevel.name && is_left" :data-tooltip="vipLevel.name">
    <img :src="vipLevel.img" class="h-4">
  </div>
  <template v-if="user.badges">
    <!-- 自定义徽章 -->
    <div v-if="isUser"
      class="bg-[--bg] rounded-full hover:bg-[--primary-opacity-1] hover:text-[--primary-color] transition font-small px-1 cursor-pointer !flex items-center leading-[1.5]"
      @click="showBadgesModal">
      <!-- <BadgeIcon class="h-4" /> -->
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.25577 0.425175C8.71692 0.161661 9.28304 0.16166 9.74419 0.425173L16.1192 4.06803C16.5866 4.3351 16.875 4.83211 16.875 5.3704V12.6294C16.875 13.1677 16.5866 13.6647 16.1192 13.9318L9.74419 17.5746C9.28304 17.8382 8.71692 17.8382 8.25577 17.5746L1.88079 13.9318C1.41343 13.6647 1.125 13.1677 1.125 12.6294V5.37039C1.125 4.83211 1.41343 4.3351 1.88079 4.06803L8.25577 0.425175Z"
          fill="url(#paint0_linear_73405_116510)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M9.74419 0.425173C9.28304 0.16166 8.71692 0.161661 8.25577 0.425175L1.88079 4.06803C1.41343 4.3351 1.125 4.83211 1.125 5.37039V12.6294C1.125 13.1677 1.41343 13.6647 1.88079 13.9318L8.25577 17.5746C8.71692 17.8382 9.28304 17.8382 9.74419 17.5746L16.1192 13.9318C16.5866 13.6647 16.875 13.1677 16.875 12.6294V5.3704C16.875 4.83211 16.5866 4.3351 16.1192 4.06803L9.74419 0.425173ZM9.36419 1.70226C9.13768 1.57642 8.86224 1.57642 8.63573 1.70226L2.63575 5.0356C2.39765 5.16787 2.24998 5.41884 2.24998 5.69121V12.3086C2.24998 12.581 2.39765 12.832 2.63575 12.9642L8.63573 16.2976C8.86224 16.4234 9.13768 16.4234 9.36419 16.2976L15.3642 12.9642C15.6023 12.832 15.75 12.581 15.75 12.3086V5.69122C15.75 5.41884 15.6023 5.16787 15.3642 5.0356L9.36419 1.70226Z"
          fill="url(#paint1_linear_73405_116510)" />
        <path
          d="M8.70846 4.68121C8.82721 4.43946 9.17271 4.43948 9.29143 4.68125L10.429 6.99788C10.476 7.09368 10.5674 7.16022 10.6732 7.17576L13.2224 7.55025C13.4877 7.58924 13.5938 7.91417 13.4024 8.10155L11.5554 9.90956C11.4795 9.98381 11.4449 10.0904 11.4628 10.1949L11.8982 12.7462C11.9434 13.011 11.6642 13.2123 11.4262 13.0865L9.15196 11.8846C9.0569 11.8343 8.94307 11.8343 8.84801 11.8846L6.57375 13.0865C6.33578 13.2123 6.05662 13.011 6.10181 12.7462L6.5372 10.1949C6.55504 10.0904 6.52044 9.98381 6.44459 9.90956L4.59755 8.10153C4.40613 7.91416 4.51225 7.58923 4.7776 7.55024L7.32631 7.17576C7.43211 7.16022 7.52344 7.0937 7.57048 6.99792L8.70846 4.68121Z"
          fill="url(#paint2_linear_73405_116510)" />
        <defs>
          <linearGradient id="paint0_linear_73405_116510" x1="3.75" y1="1.32409" x2="14.547" y2="16.0931"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#525356" />
            <stop offset="1" stop-color="#16171B" />
          </linearGradient>
          <linearGradient id="paint1_linear_73405_116510" x1="12.2156" y1="17.7723" x2="4.35267" y2="1.69032"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#D9A763" />
            <stop offset="1" stop-color="#FBEAC4" />
          </linearGradient>
          <linearGradient id="paint2_linear_73405_116510" x1="10.988" y1="13.3945" x2="7.21734" y2="4.40623"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#D9A763" />
            <stop offset="1" stop-color="#FBEAC4" />
          </linearGradient>
        </defs>
      </svg>
      <span v-if="user.badges.length" class="mx-1">徽章墙 {{ user.badges.length }}枚</span>
      <span v-else class="mx-1">暂无徽章</span>
    </div>
    <span v-else :data-tooltip="currentBadge.name">
      <img :src="currentBadge.img" class="h-4">
    </span>
  </template>
  <!-- 等级 -->
  <div v-if="user.author_level || user.level" :data-tooltip="userLevelName">
    <img v-if="showLastLevel" class="h-4" :src="lastLevel" alt="">
    <img v-else class="h-4" :src="levelImgMap[(user.author_level || user.level) - 1]">
  </div>
</template>

