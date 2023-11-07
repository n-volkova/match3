<template>
  <Modal>
    <div class="modal-container">
      <div class="score-text">
        Поздравляем! Вы набрали
      </div>
      <div class="score-max">
        {{ globalScore }}
      </div>

      <div class="modal-text">
        И теперь участвуете в розыгрыше нового мерча от Рокетбанка. Ждите итоги 30 февраля на&nbsp;этой странице и делитесь игрой с друзьями
      </div>

      <div
        class="resume-btn"
        @click="$emit('close')"
      >
        Продолжить игру
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from '@/components/match3/Modal.vue';

defineProps({
  globalScore: {
    type: String,
    required: true
  },
});
</script>

<style lang="scss" scoped>
.modal-container {
  @media (max-width: 1249px) {
    max-width: 800px;
    margin: 0 20px;
    text-align: center;
  }
  
  @media (min-width: 1250px) {
    width: 530px;
    margin: 0 auto;
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

.score-text {
  font-weight: 600;
  
  @media (max-width: 1249px) {
    font-size: 20px;
  }
  
  @media (min-width: 1250px) {
    font-size: 30px
  }
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

  @media (max-width: 1249px) {
    font-size: 44px;
    line-height: 1.4;
  }

  @media (min-width: 1250px) {
    font-size: 100px;
  }

  &:before {
    content: '';
    margin-right: 5px;
    vertical-align: middle;
    background: url('@/assets/star.svg') no-repeat;
    background-size: contain;

    @media (max-width: 1249px) {
      width: 40px;
      height: 40px;
    }

    @media (min-width: 1250px) {
      width: 71px;
      height: 71px;
    }
  }
}

.resume-btn {
  padding: 0 16px;
	background: #01F185;
	box-shadow: 0 0 13px 0 rgba(64,253,1,0.46);
	border-radius: 5px;
	color: #000000;
	font-weight: 600;
	cursor: pointer;
  
  @media (max-width: 1249px) {
    height: 60px;
    margin-top: 20px;
    margin-bottom: 25px;
    line-height: 60px;
    font-size: 17px;
  }

  @media (min-width: 1250px) {
    width: 232px;
    height: 70px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 60px;
    line-height: 70px;
    font-size: 20px;
  }
}
</style>