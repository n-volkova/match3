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

    <transition
      name="fade"
      mode="out-in"
    >
      <div
        class="modal 10k"
        v-if="modalVisible"
      >
        <div class="modal-container">
          <div class="grats">
            Поздравляем! Вы набрали
          </div>
          <div class="score-max">
            {{ formatNumber(maxScore) }}
          </div>

          <div class="modal-text">
            И теперь участвуете в розыгрыше нового мерча от Рокетбанка. Ждите итоги 30 февраля на&nbsp;этой странице и делитесь игрой с друзьями
          </div>

          <div
            class="resume-btn"
            @click="modalVisible = false"
          >
            Продолжить игру
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="fade"
      mode="out-in"
    >
      <div
        class="modal share-modal"
        v-if="shareModalVisible"
      >
        <div class="modal-container">
          <div
            class="close-btn"
            @click="shareModalVisible = false"
          />
          <div class="grats">
            Ваш результат
          </div>
          <div class="score-share">
            {{ formatNumber(globalScore) }}
          </div>

          <div class="modal-text">
            Вы можете поделиться им со своими друзьями
          </div>

          <div class="social">
            <a
              :href="fbLink"
              alt="фейсбук"
              target="_blank"
            />
            <a
              :href="vkLink"
              alt="вконтакте"
              target="_blank"
            />
            <a
              :href="twitterLink"
              alt="твиттер"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import Facade from '@/core/Facade';
import '@/core/Lib/PixiExtra';
import Emitter from '@/core/Lib/Emitter.js';

const animatedScore = ref(0);
const displayedScore = ref(0);
const maxScore = ref(10000);
const maxReached = ref(false);
const interval = ref();
const shareModalVisible = ref(false);
const modalVisible = ref(false);

const globalScore = ref(0);
const progressPercent = computed(() => globalScore.value / 10000 * 100);
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(Math.round(number));

const inviteUrl = 'https://n-volkova.github.io/match3/';

const fbLink = computed(() => `https://www.facebook.com/sharer.php?u=${inviteUrl}&hashtag=%23&quote=Мой результат — ${globalScore.value} очков!`);
const vkLink = computed(() => `https://vk.com/share.php?url=${inviteUrl}&title=Мой результат — ${globalScore.value} очков!`);
const twitterLink = computed(() => `https://twitter.com/intent/tweet?hashtags=рокетбанк&&related=rocketbank&text=Мой результат — ${globalScore.value} очков!&tw_p=tweetbutton&url=${inviteUrl}&via=rocketbank`);

Emitter.on('score', score => {
  globalScore.value = score;

  clearInterval(interval.value);
  if (score >= maxScore.value && !maxReached.value) {
    maxReached.value = true;
    modalVisible.value = true;
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
	margin: 20px auto 0;
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

.modal {
	min-height: 100vh;
	min-height: -webkit-fill-available;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .85);
	text-align: center;

	&.share-modal {
		.modal-container {
			position: relative;
			margin-top: 0;
			background: #FFFFFF;
			box-shadow: 0 10px 70px 0 rgba(0, 0, 0, 0.75);
			border-radius: 15px;
			color: #000;
		}

		.close-btn {
			position: absolute;
			top: 14px;
			right: 16px;
			width: 24px;
			height: 24px;
			background: url('@/assets/close-black.svg') no-repeat;
			background-size: contain;
			cursor: pointer;
		}
	}

	.grats {
		font-weight: 600;
	}

	.score-max {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.2;
		letter-spacing: -2.92px;
		text-align: center;
		font-weight: 600;
		color: #FFBF08;

		&:before {
			content: '';
			margin-right: 5px;
			vertical-align: middle;
			background: url('@/assets/star.svg') no-repeat;
			background-size: contain;
		}
	}
}

@media (min-width: 1250px) {
	.modal-container {
		width: 530px;
		margin: 0 auto;

		.grats {
			font-size: 30px;
		}

		.score-max {
			font-size: 100px;

			&:before {
				width: 71px;
				height: 71px;
			}
		}

		.modal-text {
			padding: 0 10px;
			line-height: 1.2;
			font-size: 20px;
		}

		.resume-btn {
			width: 232px;
			margin-left: auto;
			margin-right: auto;

			height: 70px;
			margin-top: 50px;
			margin-bottom: 60px;
			line-height: 70px;
			font-size: 20px;
		}
		.social {
			margin-top: 26px;

			a {
				height: 36px;
			}
		}
	}

	.share-modal {
			.modal-container {
				padding: 60px 43px 50px;
			}
			.grats {
				font-size: 24px;
			}
			.score-share {
				font-size: 65px;
				letter-spacing: -1.9px;
				font-weight: 600;
				line-height: 1.2;
				margin-bottom: 20px;
				
				&:after {
					content: 'очков';
					display: block;
					font-size: 24px;
					padding-bottom: 20px;
					border-bottom: 1px solid #000;
					letter-spacing: -0.7px;
				}
			}
	}
}

@media (max-width: 1249px) {
	.modal-container {
		max-width: 800px;
		margin: 67px 20px 0;
		text-align: center;

		.grats {
			font-size: 20px;
		}

		.score-max {
			font-size: 44px;
			line-height: 1.4;

			&:before {
				width: 40px;
				height: 40px;
			}
		}

		.modal-text {
			line-height: 1.2;
			font-size: 16px;
		}

		.resume-btn {
			height: 60px;
			margin-top: 20px;
			margin-bottom: 25px;
			line-height: 60px;
			font-size: 17px;
		}

		.social {
			margin-top: 14px;

			a {
				height: 28px;
			}
		}
	}

	.share-modal {
		.modal-container {
			padding: 40px 43px 30px;
		}
		.score-share {
			font-size: 57px;
			font-weight: 600;
			line-height: 1;
			margin-bottom: 20px;

			&:after {
				content: 'очков';
				display: block;
				font-size: 20px;
				padding-bottom: 20px;
				border-bottom: 1px solid #000;
			}
		}
	}
}

.resume-btn {
	padding: 0 16px;
	font-size: 20px;
	background: #01F185;
	box-shadow: 0 0 13px 0 rgba(64,253,1,0.46);
	border-radius: 5px;
	color: #000000;
	font-weight: 600;
	cursor: pointer;
}

.social {
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		display: block;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain;
	}

	a:nth-child(1) {
		width: 35px;
		background-image: url('@/assets/fb.svg');
	}

	a:nth-child(2) {
		width: 57px;
		margin-left: 32px;
		background-image: url('@/assets/vk.svg');
	}

	a:nth-child(3) {
		width: 43px;
		margin-left: 34px;
		background-image: url('@/assets/tw.svg');
	}
}
</style>
