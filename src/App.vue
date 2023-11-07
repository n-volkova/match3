<template>
  <div :class="current">
    <div class="header">
      <div
        class="logo"
        @click="returnToLanding"
      />
    </div>

    <div class="main">
      <transition name="fade">
        <component
          :is="currentComponent"
          @play="play"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import fancyLog from '@/utils/fancyLog';
import Match3 from '@/pages/Match3.vue';
import Landing from '@/pages/Landing.vue';

onMounted(() => {
  fancyLog();
});

const current = ref('landing');
const currentComponent = computed(() => current.value === 'landing' ? Landing : Match3);

const play = () => {
  current.value = 'match3';
};

const returnToLanding = () => {
  if (current.value === 'match3') {
    current.value = 'landing';
  }
};
</script>

<style lang="scss">
@import 'styles/fonts.scss';
@import 'styles/main.scss';
@import 'styles/animations.scss';

html {
  background-color: #000;
}

#app {
  min-height: -webkit-fill-available;
  padding-bottom: 1px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
  overflow-x: hidden;

  @media (max-width: 1250px) {
    min-height: 100vh;
  }

  .match3 {
    user-select: none;
  }

  .landing {
    position: relative;
  }
}

.header {
  height: 63px;
  
  @media (min-width: 1250px) {
    width: 100%;
  }
}

.logo {
  position: absolute;
  width: 143px;
  height: 16px;
  background: url('@/assets/logo.svg') no-repeat;
  background-size: contain;
  z-index: 2;
  cursor: pointer;

  @media (min-width: 1250px) {
    top: 50px;
    left: 43px;
  }
  
  @media (max-width: 1249px) {
    top: 32px;
    left: 23px;
  }
}

.play-btn {
  display: block;
  height: 60px;
  background: #01F185;
  box-shadow: 0 0 13px 0 rgba(64,253,1,0.46);
  border-radius: 5px;
  font-size: 20px;
  color: #000;
  letter-spacing: -0.56px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}

.message {
  @media (max-width: 1249px) {
    padding: 0 20px;
  }

  p {
    max-width: 500px;
    width: 100%;
    margin-bottom: 20px;
    font-family: 'pragmatica';
    line-height: 24px;
    font-size: 18px;

    @media (max-width: 1249px) {
      font-size: 17px;
    }
  }

  .send-btn {
    font-weight: 600;

    &:nth-of-type(2) {
      margin-top: 20px;
    }
  }
}
</style>
