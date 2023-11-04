<template>
  <div class="bg-container">
    <div
      class="bg-back"
      data-rellax-speed="-7"
    />
    <div
      class="bg-front"
      data-rellax-speed="2"
    />
  </div>

  <div class="landing-container">
    <div class="landing-header">
      <h1>Игра не на жизнь,<br />а на&nbsp;мерч</h1>
      <p>Не прошло и полугода от нового года. <br />Это самый свежий мерч!</p>
    </div>

    <AboutMerch />
    <AboutGame @play="$emit('play')" />
    <AboutRocket />
  </div>
</template>
 
<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import Rellax from 'rellax';
import AboutMerch from '@/components/landing/AboutMerch.vue';
import AboutGame from '@/components/landing/AboutGame.vue';
import AboutRocket from '@/components/landing/AboutRocket.vue';

const bgFront = ref(null);
const bgBack = ref(null);

onMounted(() => {
  bgFront.value = new Rellax('.bg-front', {
    breakpoints: [],
    vertical: true,
    horizontal: false
  });

  bgBack.value = new Rellax('.bg-back', {
    breakpoints: [],
    vertical: true,
    horizontal: false
  });
});

onBeforeUnmount(() => {
  bgFront.value.destroy();
  bgBack.value.destroy();
});
</script>

<style lang="scss" scoped>
.bg-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;

	@media (max-width: 1249px) {
		height: 100vh;
		opacity: .35;
	}
}

.bg-front, .bg-back {
	position: absolute;
	background-repeat: no-repeat;
	pointer-events: none;
	z-index: 0;

	@media (max-width: 1249px) {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-position: top center;
	}
}

.bg-front {
	@media (max-width: 1249px) {
		background-image: url('@/assets/hanged-arrows-front.png');
		background-size: 123%;
	}

	@media (min-width: 1250px) {
		top: -53px;
		left: 604px;
		width: 866px;
		height: 906px;
		background-image: url('@/assets/hanged-arrows-front.png');
	}
}

.bg-back {
	@media (max-width: 1249px) {
		background-image: url('@/assets/hanged-arrows-back.png');
		background-size: 72%;
		background-position-x: 91%;
	}
	
	@media (min-width: 1250px) {
		top: -40px;
		left: 858px;
		width: 514px;
		height: 597px;
		background-image: url('@/assets/hanged-arrows-back.png');
	}
}

.landing-container {
	color: #B4DDE4;

	@media (max-width: 1249px) {
		position: relative;
		padding: 32px 34px 30px;
	}

	@media (min-width: 1250px) {
		position: relative;
		width: 1200px;
		margin: 0 auto 40px;
	}

	.landing-header {
		@media (max-width: 1249px) {
			text-align: center;
		}

		@media (min-width: 1250px) {
			padding-bottom: 267px;
		}

		h1 {
			font-weight: 600;

			@media (max-width: 1249px) {
				margin-top: 144px;
				margin-bottom: 15px;
				font-size: 36px;
				line-height: 49px;
				letter-spacing: -1.6px;
			}
			
			@media (min-width: 1250px) {
				margin-top: 272px;
				margin-bottom: 30px;
				font-size: 72px;
				line-height: 85px;
				letter-spacing: -2.25px;
			}
		}

		p {
			font-size: 18px;
			line-height: 1.3;

			@media (max-width: 1249px) {
				margin-bottom: 119px;
				letter-spacing: -.47px;
			}
		}
	}

	h3 {
		text-align: center;

		@media (max-width: 1249px) {
			padding: 0 20px;
			margin-bottom: 31px;
			letter-spacing: -1.31px;
			font-size: 34px;
			line-height: 40px;
		}

		@media (min-width: 1250px) {
			margin-bottom: 51px;
			letter-spacing: -1.93px;
			font-size: 50px;
			line-height: 1.25;
		}
	}
}

.landing-header {
	z-index: 1;
}
</style>
