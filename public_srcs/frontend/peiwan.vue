<template>
  <div class="page-recommend__panel p-flex">
    <!-- 左侧 -->
    <swiper :autoplay="{
      delay: playmateConfig.peiwan_delay || 5000,
      disableOnInteraction: true
    }" v-if='playmateConfig.playmates' @slideChange="transitionEnd" :effect="'coverflow'" :coverflowEffect="{
      rotate: 0,
      stretch: 200,
      depth: 700
    }" :centeredSlides="true" slidesPerView="auto" :loop="true" :modules="modules" class="recommend-playmate__swiper">
      <template v-for="item in playmateConfig.playmates">
        <swiper-slide>
          <div class="cover">
            <a :href="`/author/${currentPlaymateUser.id}`" role="button">
              <img :src="item.image" alt="">
            </a>
          </div>
        </swiper-slide>
      </template>
      <img v-if="playmateConfig.peiwan_tag" :src="playmateConfig.peiwan_tag" alt="" class="tag">
      <div class="playmate-detail p-flex">
        <a class="avatar" :href="`/author/${currentPlaymateUser.id}`" role="button">
          <img :src="currentPlaymateUser.avatar" alt="">
        </a>
        <div class="info">
          <p class="nickname ellipsis font-semibold">{{ currentPlaymateUser.name }}</p>

          <div class="flex items-center gap-1 mb-1">
            <UserMetas :is_left="true" :user="currentPlaymateUser" :site_metas="siteMetas" />
          </div>
        </div>
        <Audio :audio_url="currentAudio" v-if="currentAudio && showAudio"/>
        <a class="btn" target="_blank" v-if="playmateConfig.playmates"
          :href="playmateConfig.playmates[swiperSlideIndex].url">{{ playmateConfig.playmates[swiperSlideIndex].text
          }}</a>
      </div>
    </swiper>
    <!-- 右侧 -->
    <div>
      <swiper v-if="playmateConfig.banners" :autoplay="{
        delay: playmateConfig.peiwan_delay || 5000,
        disableOnInteraction: true
      }" loop :pagination="paginationBanner" :centeredSlides="true" :allowTouchMove="true" slidesPerView="auto"
        :watchOverflow="true" :observer="true" :observeParents="true" :observeSlideChildren="true" class="banner-swiper"
        :modules="modules">
        <template v-for="item in playmateConfig.banners" :key="item.image">
          <swiper-slide>
            <a :href="item.url" target="_blank"><img :src="item.image" alt=""></a>
          </swiper-slide>
        </template>
        <div class="banner-swiper__pagination"></div>
      </swiper>
      <div class="activity-zone">
        <div class="type-list p-flex">
          <template v-for="(item, index) in playmateConfig.zones" :key="item.title">
            <div @click="zoneIndex = index" class="type p-flex" :class="{ active: index === zoneIndex }"> {{ item.title
              }}
              <a class="more p-flex" :href="item.url" role="button" target="_blank">更多<i></i></a>
            </div>
          </template>
        </div>
        <div class="playmate-list p-flex">
          <template v-for="user in currentUserList">
            <a class="item" :href="`/author/${user.id}`" role="button">
              <div class="cover">
                <img :src="user.avatar" alt="">
              </div>
              <p class="nickname ellipsis font-semibold">{{ user.name }}</p>

              <div class="flex items-center justify-center gap-1 mb-1">
                <UserMetas :user="user" :site_metas="siteMetas" />
              </div>
              <!-- <div class="career-list p-flex">
                <span v-for="img in user.formatBadges" alt="" :key="img.img" :data-tooltip="img.name">
                  <img :src="img.img">
                </span>
              </div> -->
            </a>
          </template>
        </div>
        <b :style="`background: url('${playmateConfig.zone_tag}') no-repeat;`"></b>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import axios from 'axios';
import { computed, ref } from 'vue';
import UserMetas from './userMetas.vue';
import Audio from './audio.vue';

const paginationBanner = {
  el: '.banner-swiper__pagination',
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '"></span>';
  },
}
const modules = [EffectCoverflow, Pagination, Autoplay]
const swiperSlideIndex = ref(0)
const zoneIndex = ref(0)
const showAudio = ref(true)
const playmateConfig = ref({
  peiwan_delay: 5000
})
const currentAudio = computed(() => {
  if (!playmateConfig.value.playmates) return {}
  return playmateConfig.value.playmates[swiperSlideIndex.value].audio
})
const currentPlaymateUser = computed(() => {
  if (!playmateConfig.value.playmates) return {}
  return playmateConfig.value.playmates[swiperSlideIndex.value].user
})
function transitionEnd(e) {
  swiperSlideIndex.value = e.realIndex
  showAudio.value = false
  setTimeout(() => {
    showAudio.value = true
  }, 1);
}
const badges = ref([])
const siteMetas = ref([])
async function requestData() {
  const { data } = await axios({
    method: 'post',
    url: '/peiwan/site-opts'
  })
  siteMetas.value = data
  const { playmates } = data;
  const allUserIds = [
    ...playmates.playmates.map(item => item.uid),
    ...playmates.zones.flatMap(zone => zone.uids)
  ];
  const uniqueUserIds = [...new Set(allUserIds.filter(Boolean))];
  if (uniqueUserIds.length > 0) {
    // 5. 使用单个请求获取所有用户数据
    const { data: userData } = await axios.post('/peiwan/query-users', {
      include: uniqueUserIds
    });
    // 6. 创建用户数据映射表提高查找效率
    const userMap = new Map(userData.map(user => [user.id, user]));
    // 7. 优化数据处理逻辑
    playmates.playmates.forEach(item => {
      item.user = userMap.get(item.uid);
    });
    playmates.zones.forEach(zone => {
      zone.users = zone.uids.map(uid => userMap.get(uid)).filter(Boolean);
    });
  }
  playmateConfig.value = data.playmates
  badges.value = data.sc_badges
}
const currentUserList = computed(() => {
  const zoneData = playmateConfig.value.zones?.[zoneIndex.value]
  if (!zoneData?.uids) return []

  const badgeItems = badges.value
  return zoneData.users.map(user => {
    user.formatBadges = badgeItems.filter((badge, index) =>
      user.badges?.[index] === badge.name
    )
    return user
  })
})

requestData()
</script>
<style>
.page-recommend__panel {
  padding: 48px 0;
  justify-content: center;
}

.page-recommend__panel .swiper {
  margin-left: initial;
}

.page-recommend__panel .recommend-playmate__swiper {
  position: relative;
  width: 384px;
  margin-right: 32px;
  overflow: hidden
}

.page-recommend__panel .recommend-playmate__swiper .tag {
  position: absolute;
  top: 0;
  right: 0;
  width: 179px;
  height: 90px;
  z-index: 10
}

.page-recommend__panel .recommend-playmate__swiper .swiper-slide {
  width: 336px;
  cursor: pointer
}

.page-recommend__panel .recommend-playmate__swiper .swiper-slide .cover {
  width: 336px;
  height: 450px;
  border-radius: 16px;
  margin-right: 8px;
  overflow: hidden
}

.page-recommend__panel .recommend-playmate__swiper .swiper-slide .cover img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover
}

.page-recommend__panel .recommend-playmate__swiper .swiper-slide.swiper-slide-active .detail {
  opacity: 1
}

.page-recommend__panel .playmate-detail {
  width: 304px;
  height: 80px;
  padding: 10px 14px 20px 14px;
  margin: 0 auto;
  background: var(--w-bg);
  border-radius: 0 0 8px 8px
}

.page-recommend__panel .playmate-detail .avatar {
  width: 42px;
  height: 42px;
  margin-right: 8px
}

.page-recommend__panel .playmate-detail .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.page-recommend__panel .playmate-detail .info {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.page-recommend__panel .playmate-detail .info .nickname {
  color: hsl(var(--font-color));
  font-size: 14px
}

.page-recommend__panel .playmate-detail .info .career-list img {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  border-radius: 2px
}

.page-recommend__panel .playmate-detail .btn {
  padding: 2px 8px;
  text-align: center;
  color: #fff;
  background: linear-gradient(115deg, #ff00e5, #ff6969);
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer
}


.playmate-swiper__pagination {
  position: absolute;
  left: 0 !important;
  bottom: 2px !important;
  text-align: center;
  z-index: 10
}

.playmate-swiper__pagination .swiper-pagination-bullet {
  width: 40px;
  height: 4px;
  margin: 0 4px;
  background: rgba(0, 0, 0, .3);
  border-radius: 2px 2px 2px 2px
}

.playmate-swiper__pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: linear-gradient(115deg, #ff00e5, #ff6969)
}

.p-flex {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

/* banner swiper */

.page-recommend__panel .banner-swiper {
  position: relative;
  width: 800px;
  height: 240px;
  border-radius: 16px;
  margin-bottom: 24px;
  overflow: hidden
}

.page-recommend__panel .banner-swiper img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  -o-object-fit: cover;
  object-fit: cover
}


.banner-swiper__pagination {
  position: absolute;
  left: 0;
  bottom: 8px;
  text-align: center;
  z-index: 10
}

.banner-swiper__pagination .swiper-pagination-bullet {
  width: 40px;
  height: 4px;
  margin: 0 4px;
  background: rgba(0, 0, 0, .3);
  border-radius: 2px 2px 2px 2px
}

.banner-swiper__pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: rgba(0, 0, 0, .8)
}

/* activity-zone */

.page-recommend__panel .activity-zone {
  position: relative;
  width: 800px;
  height: 266px;
  padding: 15px;
  background: var(--w-bg);
  border-radius: 16px
}

.page-recommend__panel .activity-zone .type {
  width: 174px;
  color: hsl(var(--font-color) / .5);
  font-size: 16px;
  height: 32px;
  padding: 10px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-radius: 16px;
  margin: 0 10px 25px 0;
  transition: .35s;

  background: var(--bg);
  cursor: pointer
}

.page-recommend__panel .activity-zone .type.active {
  background: var(--primary-opacity-1);
  color: #467cfd;
  font-size: 18px
}

.page-recommend__panel .activity-zone .type.active .more {
  color: #467cfd
}

.page-recommend__panel .activity-zone .type.active .more i {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWVJREFUWEftlk1Ow0AMhe1MRQWrcoNygx4hXRR1SU8AnANQVAXuEU7QLtuyCDcoR8gRumKBmjHy0JH4iZQZZ0pUqd5Gmff52TM2QsuBLevDEeCwHBg9bG+4Z17SThaqd5wdGN9TrEHnLIwI2TJVtyEgnAHihHpdrddE0A8J4QzAouOE+qR1biEA8O1M4XA+xY3UDS+AfUB4A1RCIBRRFA0XUyx8nRABhIQQAzAEN+ZJSTkADUzmAicaAViIbkkzAoolEI0BbM0v77YZIF77QgQDYOEfEACb1aM6r2vKYABXCfXev/UDIhTLVF38C0CVODpey8YO8OuoS5rZm8CZu4p/XZwGYcS1zmE3H/hpjhROfB4kMUCVuGQuiABCiYtK8FscAV9PFU6kE9HLgT+ZEz2vnjpmS5KGM8A+xL1KMEo+Bliqtck0QObWMWcHzAjeLaWLNpZSaY3r/vNyoO4wyfcjQOsOfAKZxsUhEICQLQAAAABJRU5ErkJggg==)
}

.page-recommend__panel .activity-zone .type .more {
  color: #979797;
  font-size: 12px
}

.page-recommend__panel .activity-zone .type .more i {
  width: 16px;
  height: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUtJREFUWEftlrFtwzAQRe8qSp2zQbKBR7BH8ASJOp2WUScCaqRMkBGcDZIRMoJbFcIFJ8iAbQgQ70RHCOBrVBDUf/z85BFh5cKV9eEB8L8c8N6/SWaIqI2VnWAHvPc7ADiOwi0RZTEgggHKstwkSfIFAM8xIYIBRNR7L+LiwgCBiN/OuX2WZSerGyqAe0CoAaYgAOAHAPZEJF9VmQBiQpgBBEKCmabpkZm347LVTiwCuID4YGY5plIqiMUA5w2vqqpFxFctRDQAEb6EQMRTnudPc4mMBtA0zabruqs8ENHLnwBMiYcey8UOyO2IiBJC00lYBDB1NTPzQXMhmQFi9QUTQCzxoaHNpfR2fEL80zl3sHZEFcCtODO/F0UxvJKsFQxwD3HVFtR1ve37Xl5EEGPlZ8eCHRhb8HqPUusez81TOTD3M8v4A2B1B34B0W+dIfXK7q4AAAAASUVORK5CYII=) no-repeat 50%;
  background-size: contain
}

.page-recommend__panel .activity-zone b {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 330px;
  height: 120px;
  background-size: contain !important;
  pointer-events: none
}

/* playlist */
.playmate-list {
  overflow-x: auto;
  overflow-y: hidden;
}

.playmate-list .item {
  margin: 0 16px;
  cursor: pointer
}

.playmate-list .item .cover {
  margin: 0 auto 8px;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden
}

.playmate-list .item .cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playmate-list .item .nickname {
  font-size: 14px;
  text-align: center;
  margin-bottom: 8px
}

.playmate-list .item .career-list {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center
}

.playmate-list .item .career-list img {
  width: 18px;
  height: 18px;
  margin: 0 3px;
  border-radius: 2px
}

/* 移动端 */
@media screen and (max-width: 768px) {
  .page-recommend__panel {
    flex-direction: column;
  }

  .page-recommend__panel .recommend-playmate__swiper {
    margin-right: 0;
    margin-bottom: 24px;
  }

  .page-recommend__panel .banner-swiper {
    width: calc(100vw - 48px);
    margin: 0 auto;
    margin-bottom: 24px;
  }

  .page-recommend__panel .activity-zone {
    width: calc(100vw - 48px);
    height: auto;
    margin: 0 auto;
  }

  .page-recommend__panel .activity-zone .type-list {
    width: 50%;
    overflow-x: auto;
  }

  .page-recommend__panel .activity-zone .type {
    flex-shrink: 0;
    width: auto;
    gap: 12px;
  }

  .playmate-list {
    gap: 12px;
  }

  .playmate-list .item {
    margin: 0;
    flex-shrink: 0;
  }

  .playmate-list .item .cover {
    width: 60px;
    height: 60px;
  }

  .page-recommend__panel .activity-zone .type.active {
    font-size: 15px;
  }
}
</style>