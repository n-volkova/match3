<template>
  <h3>Смотрите, что&nbsp;есть</h3>
  <div class="about-merch">
    <div class="col">
      <div class="img img--cardholder" />
      <div class="title">
        Кардхолдер
      </div>
      <div class="description">
        Одёжка для карты
      </div>
    </div>
    <div class="col">
      <div class="img img--fanny" />
      <div class="title">
        Сумка
      </div>
      <div class="description">
        На пояс
      </div>
    </div>
    <div class="col">
      <div class="img img--socks" />
      <div class="title">
        Носки
      </div>
      <div class="description">
        А точнее, целая пара
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
	text-align: center;

	@media (max-width: 1249px) {
		font-size: 27px;
		margin-bottom: 25px;
	}

	@media (min-width: 1250px) {
		margin-bottom: 50px;
		font-size: 40px;
	}
}

.about-merch {
	display: flex;
	justify-content: space-between;
	z-index: 1;

	@media (max-width: 1249px) {
		flex-direction: column;
		margin: 0 auto 20px;
	}

	@media (min-width: 1250px) {
		width: 940px;
		margin: 0 auto 162px;
	}

	.col {
		text-align: center;

		@media (max-width: 1249px) {
			width: auto;
		}
		
		@media (min-width: 1250px) {
			width: 279px;
		}
	}

	.img {
		height: 251px;
		border-radius: 10px;
		background-repeat: no-repeat;
		background-size: cover;

		@media (max-width: 1249px) {
			max-width: 250px;
			margin: 0 auto 30px;
		}
		
		@media (min-width: 1250px) {
			width: 100%;
			margin-bottom: 30px;
		}

		&--cardholder {
			background-image: url('@/assets/cardholder.jpg');
		}

		&--fanny {
			background-image: url('@/assets/fanny.jpg');
		}
		
		&--socks {
			background-image: url('@/assets/socks.jpg');
		}
	}

	.title {
		font-weight: 600;
		font-size: 25px;
		margin-bottom: 10px;
		letter-spacing: -1.2px;
	}

	.description {
		font-size: 18px;
		letter-spacing: -0.87px;

		@media (max-width: 1249px) {
			margin-bottom: 34px;
		}
	}
}
</style>