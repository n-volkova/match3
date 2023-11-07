<template>
  <Modal>
    <div class="modal-container share-modal">
      <div
        class="close-btn"
        @click="$emit('close')"
      />
      <div class="score-text">
        Ваш результат
      </div>
      <div class="score-share">
        {{ globalScore }}
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
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import Modal from '@/components/match3/Modal.vue';

const props = defineProps({
  inviteUrl: {
    type: String,
    required: true
  },
  globalScore: {
    type: String,
    required: true
  },
});

const fbLink = computed(() => `https://www.facebook.com/sharer.php?u=${props.inviteUrl}&hashtag=%23&quote=Мой результат — ${props.globalScore} очков!`);
const vkLink = computed(() => `https://vk.com/share.php?url=${props.inviteUrl}&title=Мой результат — ${props.globalScore} очков!`);
const twitterLink = computed(() => `https://twitter.com/intent/tweet?hashtags=рокетбанк&&related=rocketbank&text=Мой результат — ${props.globalScore} очков!&tw_p=tweetbutton&url=${props.inviteUrl}&via=rocketbank`);

</script>

<style lang="scss" scoped>
.share-modal {
  position: relative;
  margin-top: 0;
  background: #FFFFFF;
  box-shadow: 0 10px 70px 0 rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  color: #000;
  
  @media (max-width: 1249px) {
    max-width: 800px;
    margin: 67px 20px 0;
    padding: 40px 43px 30px;
  }

  @media (min-width: 1250px) {
    padding: 60px 43px 50px;
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

  .score-text {
    font-weight: 600;
    
    @media (max-width: 1249px) {
      font-size: 20px;
    }
    
    @media (min-width: 1250px) {
      font-size: 24px;
    }
  }

  .modal-text {
    line-height: 1.2;

    @media (max-width: 1249px) {
      font-size: 16px;
    }

    @media (min-width: 1250px) {
      padding: 0 10px;
      font-size: 20px;
    }
  }

  .score-share {
    font-weight: 600;
    margin-bottom: 20px;

    @media (max-width: 1249px) {
      font-size: 57px;
			line-height: 1;
    }

    @media (min-width: 1250px) {
      font-size: 65px;
      letter-spacing: -1.9px;
      line-height: 1.2;
    }

    &:after {
      content: 'очков';
      display: block;
      font-size: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #000;
      letter-spacing: -0.7px;

      @media (max-width: 1249px) {
        font-size: 20px;
      }
    }
  }
}

.social {
	display: flex;
	justify-content: center;
	align-items: center;

  @media (max-width: 1249px) {
    margin-top: 14px;
  }

  @media (min-width: 1250px) {
    margin-top: 26px;
  }

	a {
		display: block;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain;

    @media (max-width: 1249px) {
      height: 28px;
    }

    @media (min-width: 1250px) {
      height: 36px;
    }
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