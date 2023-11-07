<template>
  <div class="modal">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const openModal = () => {
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
};

onMounted(() => {
  openModal();
});

onBeforeUnmount(() => {
  closeModal();
});
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
  right: 0;
  bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, .85);
	text-align: center;
  z-index: 2;
}
</style>