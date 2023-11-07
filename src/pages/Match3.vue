<template>
  <div class="game-container">
    <div
      class="score-container"
      :class="maxReached && 'completed'"
      id="score"
    >
      <div class="row">
        <div class="col left">
          <div class="score">
            {{ formatNumber(animatedScore) }}
          </div>
          <div
            class="share-btn"
            @click="shareModalVisible = true"
          />
          <div class="score-text">
            Очков собрано
          </div>
        </div>
        <div class="col right">
          <div class="score-max">
            {{ formatNumber(maxScore) }}
          </div>
          <div class="score-text">
            Для участия в розыгрыше
          </div>
        </div>
      </div>
      <div
        class="progress-container"
        :class="maxReached ? 'completed' : ''"
      >
        <div class="progress" />
        <div
          class="progress-mask"
          :style="`width: ${maxReached ? 0 : 100 - progressPercent}%`"
        />
      </div>
    </div>
    <transition name="fade">
      <MaxScoreModal
        v-if="maxScoreModalVisible"
        :global-score="formatNumber(globalScore)"
        @close="maxScoreModalVisible = false"
      />
    </transition>
    
    <transition name="fade">
      <ShareModal
        v-if="shareModalVisible"
        :invite-url="inviteUrl"
        :global-score="formatNumber(globalScore)"
        @close="shareModalVisible = false"
      />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import Facade from '@/core/Facade';
import '@/core/Lib/PixiExtra';
import Emitter from '@/core/Lib/Emitter.js';
import ShareModal from '@/components/match3/ShareModal.vue';
import MaxScoreModal from '@/components/match3/MaxScoreModal.vue';

const animatedScore = ref(0);
const displayedScore = ref(0);
const maxScore = ref(10000);
const maxReached = ref(false);
const interval = ref();
const shareModalVisible = ref(false);
const maxScoreModalVisible = ref(false);

const globalScore = ref(0);
const progressPercent = computed(() => globalScore.value / 10000 * 100);
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(Math.round(number));

const inviteUrl = 'https://n-volkova.github.io/match3/';

Emitter.on('score', score => {
  globalScore.value = score;

  clearInterval(interval.value);
  if (score >= maxScore.value && !maxReached.value) {
    maxReached.value = true;
    maxScoreModalVisible.value = true;
  }

  interval.value = window.setInterval(function() {
    if (displayedScore.value !== score) {
      let change = (score - animatedScore.value) / 10;
      change = change >= 0 ? Math.ceil(change) : Math.floor(change);
      animatedScore.value = animatedScore.value + change;
    }
  }.bind(this), 20);
});

onMounted(() => {
  new Facade();
  window.scrollTo(0, 0);
});

onBeforeUnmount(() => {
  Emitter.all.clear();
});
</script>

<style lang="scss" scoped>
canvas {
	margin-top: 40px;
}

.score-container {
	padding: 19px 20px 23px;
	margin: 20px auto 20px;
	border: 1px solid rgba(255,255,255,0.20);
	border-radius: 9px;

	@media (min-width: 768px) {
		width: 639px;
	}

	@media (max-width: 767px) {
		width: auto;
		padding: 19px 10px 23px;
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 0;
	}

	&.completed {
		border: 1px solid #FFBF08;
	}

	.row {
		display: flex;
		align-items: flex-start;
	}

	.col {
		width: 50%;

		&.left {
			text-align: left;
		}

		&.right {
			text-align: right;
		}
	}

	.score {
		display: inline-block;
		vertical-align: middle;
		margin-right: 7px;
		font-weight: 600;
		font-size: 30px;
		line-height: 1.2;
	}

	.share-btn {
		display: inline-block;
		vertical-align: middle;
		width: 21px;
		height: 21px;
		background: url('@/assets/share-btn.svg') no-repeat;
		background-size: contain;
		cursor: pointer;
	}

	.score-text {
		margin-top: 4px;
		margin-bottom: 10px;
		font-size: 16px;
		line-height: 1.2;
		color: rgba(255, 255, 255, .5);
	}

	.score-max {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-weight: 600;
		letter-spacing: -.97px;
		font-size: 30px;
		line-height: 1.2;
		color: #FFBF08;

		&:before {
			content: '';
			width: 23px;
			height: 23px;
			margin-right: 5px;
			vertical-align: middle;
			background: url('@/assets/star.svg') no-repeat;
			background-size: contain;
		}
	}
}

.progress-container {
	position: relative;
	width: 100%;
	height: 10px;
	border: 1px solid rgba(255,255,255,0.20);
	border-radius: 5px;
	transition: background-color .3s linear;
	overflow: hidden;

	&.completed {
		background-color: #FFBF08;

		.progress {
			background-image: none;
		}
	}

	.progress {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(270deg, #8D29FF 0%, #28BAFF 100%);
		border-radius: 5px;
	}

	.progress-mask {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		background-color: #000;
		transition: width .3s linear;
	}
}
</style>
