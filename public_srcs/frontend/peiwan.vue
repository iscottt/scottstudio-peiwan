<template>
  <div class="page-recommend__panel p-flex">
    <!-- 左侧 -->
    <swiper :pagination="pagination" :effect="'coverflow'" :coverflowEffect="{
      rotate: 0,
      stretch: 200,
      depth: 700
    }" :centeredSlides="true" slidesPerView="auto" :loop="true" :modules="modules" class="recommend-playmate__swiper">
      <swiper-slide>
        <div class="cover"><img
            src="https://res.kedou8.com/yww/coverMain/18/42/b3/1842b39a64a9499aaccb2231bd8012ff_400x400.jpg" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cover"><img
            src="https://res.kedou8.com/yww/coverMain/61/a7/fc/61a7fc19d61fe544b3aac75ff562a515_400x400.jpg" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cover">
          <img
            src="https://res.kedou8.com/yww/coverMain/e0/92/64/e092642b7f586184bb0c9ff55914f3ef_400x400.jpg" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cover">
          <img
            src="https://res.kedou8.com/yww/coverMain/e0/92/64/e092642b7f586184bb0c9ff55914f3ef_400x400.jpg" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cover">
          <img
            src="https://res.kedou8.com/yww/coverMain/e0/92/64/e092642b7f586184bb0c9ff55914f3ef_400x400.jpg" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cover">
          <img
            src="https://res.kedou8.com/yww/coverMain/e0/92/64/e092642b7f586184bb0c9ff55914f3ef_400x400.jpg" alt="">
        </div>
      </swiper-slide>

      <div class="playmate-swiper__pagination"></div>
      <img src="https://res.kedou8.com/voice-assets/img/icon2.c7d260ff.png" alt="" class="tag">
      <div class="playmate-detail p-flex">
        <div class="avatar"><img
            src="https://res.kedou8.com/yww/kedouAvatar/avatar/43/c7/4b/43c74b97e1dfb77c4ca4832a60d1d84b_400x400.jpg"
            alt=""></div>
        <div class="info">
          <p class="nickname ellipsis">美乐蒂狮家③仙女</p>
          <div class="career-list p-flex">
            <img src="https://res.kedou8.com/yww/career/000/010/013/1543477672654996178.jpg" alt="">
            <img src="https://res.kedou8.com/yww/career/000/010/013/1542885931171732016.jpg" alt="">
            <img src="https://res.kedou8.com/yww/career/000/010/013/1542886014556260364.jpg" alt="">
            <img src="https://res.kedou8.com/yww/career/000/010/013/1542886103972345420.jpg" alt="">
          </div>
        </div>
        <div class="btn">下单</div>
      </div>
    </swiper>
    <!-- 右侧 -->
    <div>
      <swiper :autoplay="true" loop :pagination="paginationBanner" :centeredSlides="true" :allowTouchMove="true" slidesPerView="auto" :watchOverflow="true" :observer="true" :observeParents="true" :observeSlideChildren="true" class="banner-swiper" :modules="modules">
        <swiper-slide><img src="https://res.kedou8.com/yww/default/11/60/81/116081c442737bd762d9bc9200d40ec4.jpg"
            alt=""></swiper-slide>
        <swiper-slide><img src="https://res.kedou8.com/yww/default/f8/1a/67/f81a676aa32a8559b861149febd1c685.jpg"
            alt=""></swiper-slide>
        <swiper-slide><img src="https://res.kedou8.com/yww/default/010/000/110/1612264042555325980.jpg"
            alt=""></swiper-slide>
            <div class="banner-swiper__pagination"></div>
      </swiper>
      <div class="activity-zone">
        <div class="type-list p-flex">
          <div class="type p-flex active"> 9.9元专区 <div class="more p-flex">更多<i></i></div>
          </div>
          <div class="type p-flex"> 30-15专区 <div class="more p-flex">更多<i></i></div>
          </div>
          <div class="type p-flex"> 买3送1专区 <div class="more p-flex">更多<i></i></div>
          </div>
        </div>
        <div class="playmate-list p-flex">
          <div class="item">
            <div class="cover">
              <img
                src="https://res.kedou8.com/yww/userCover/1a/f2/b9/1af2b9133d237c9c8f41e40280fa4b63.jpg" alt=""></div>
            <p class="nickname ellipsis">辞酒🍷起驾回宫</p>
            <div class="career-list p-flex"><img
                src="https://res.kedou8.com/yww/career/020/010/400/1625741594966316362.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/020/010/400/1633101172469321223.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542885931171732016.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886103972345420.jpg" alt=""></div>
          </div>
          <div class="item">
            <div class="cover"><img
                src="https://res.kedou8.com/yww/userCover/65/94/f9/6594f943bf0ad8b0350305af94c37895.jpg" alt=""></div>
            <p class="nickname ellipsis">美美💕梦绘山河</p>
            <div class="career-list p-flex"><img
                src="https://res.kedou8.com/yww/career/020/010/400/1625741594966316362.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542885931171732016.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886014556260364.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/020/010/400/1633101159369756468.jpg" alt=""></div>
          </div>
          <div class="item">
            <div class="cover"><img
                src="https://res.kedou8.com/yww/coverMain/b9/6d/3f/b96d3fd3e0b554439e35f16411dae266_400x400.jpg" alt="">
            </div>
            <p class="nickname ellipsis">小冷🍬</p>
            <div class="career-list p-flex"><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886167738401213.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886103972345420.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/cf/6d/99/cf6d99e4fb06f4fd96d7857f0806e931.jpg" alt=""></div>
          </div>
          <div class="item">
            <div class="cover"><img
                src="https://res.kedou8.com/yww/coverMain/ac/2b/31/ac2b310633066e770575f5bfe6fddb2a_400x400.jpg" alt="">
            </div>
            <p class="nickname ellipsis">魔王千分王者包c</p>
            <div class="career-list p-flex"><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886167738401213.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886103972345420.jpg" alt=""></div>
          </div>
          <div class="item">
            <div class="cover"><img
                src="https://res.kedou8.com/yww/coverMain/43/e9/e1/43e9e1b759d0e81ae0f39e795f22009b_400x400.jpg" alt="">
            </div>
            <p class="nickname ellipsis">糖一☔️</p>
            <div class="career-list p-flex"><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886138084894953.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886103972345420.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/013/1542886167738401213.jpg" alt=""><img
                src="https://res.kedou8.com/yww/career/000/010/033/1563365135324721535.jpg" alt=""></div>
          </div>
        </div><b></b>
      </div>
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      pagination: {
        el: '.playmate-swiper__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      paginationBanner: {
        el: '.banner-swiper__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      modules: [EffectCoverflow, Pagination],
    };
  },
};
</script>
<style>
.page-recommend__panel {
  padding: 48px 0;
  background: #F3F5F6;
  justify-content: center;
}
.page-recommend__panel .swiper{
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
  background: #fff;
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
  border-radius: 50%
}

.page-recommend__panel .playmate-detail .info {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.page-recommend__panel .playmate-detail .info .nickname {
  color: #2a2a2a;
  font-size: 14px
}

.page-recommend__panel .playmate-detail .info .career-list img {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  border-radius: 2px
}

.page-recommend__panel .playmate-detail .btn {
  width: 72px;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background: linear-gradient(115deg, #ff00e5, #ff6969);
  border-radius: 16px;
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
    background: rgba(0,0,0,.3);
    border-radius: 2px 2px 2px 2px
}

.banner-swiper__pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: rgba(0,0,0,.8)
}
/* activity-zone */

.page-recommend__panel .activity-zone {
    position: relative;
    width: 800px;
    height: 266px;
    padding: 15px;
    background: #fff;
    border-radius: 16px
}

.page-recommend__panel .activity-zone .type {
    width: 174px;
    color: #979797;
    font-size: 16px;
    height: 32px;
    padding: 10px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-radius: 16px;
    margin: 0 10px 25px 0;
    background-color: #f0f0f0;
    cursor: pointer
}

.page-recommend__panel .activity-zone .type.active {
    background: #edf2ff;
    color: #467cfd;
    font-size: 20px
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
    background: url(https://res.kedou8.com/voice-assets/img/bg3.cd018f56.png) no-repeat;
    background-size: contain;
    pointer-events: none
}

/* playlist */

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
    height: 100%
}

.playmate-list .item .nickname {
    color: #2a2a2a;
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

</style>