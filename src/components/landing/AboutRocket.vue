<template>
  <div class="about-rocket">
    <h3>Рокетбанк − это:</h3>
    <div class="card" />
    <div class="row">
      <div class="col">
        <div class="title">
          Бесплатная карта
        </div>
        <div class="text">
          Мы не берём комиссию за выпуск, доставку и&nbsp;обслуживание карты
        </div>
      </div>
      <div class="col">
        <div class="title">
          Выгодный кешбэк
        </div>
        <div class="text">
          Кешбэк до 20% у партнёров и 1% с&nbsp;остальных покупок
        </div>
      </div>
      <div class="col">
        <div class="title">
          Процент на остаток
        </div>
        <div class="text">
          Каждый месяц начисляем 4,5% годовых в&nbsp;рублях на&nbsp;любой остаток по&nbsp;карте
        </div>
      </div>
    </div>
    <p class="cities">
      <strong>Бесплатно доставим карту в города:</strong> Москва, Санкт-Петербург, Барнаул, Волгоград, Воронеж, Екатеринбург, Ижевск, Иркутск, Казань, Калининград, Краснодар, Красноярск, Набережные Челны, Нижний Новгород, Новосибирск, Омск, Оренбург, Пермь, Ростов-на‑Дону, Самара, Саратов, Сочи, Тольятти, Томск, Тула, Тюмень, Уфа, Челябинск и&nbsp;Ярославль
    </p>
  </div>
  <p class="license">
    КИВИ Банк (АО), qiwi.com, лицензия Банка России № 2241 от 22.01.2015 филиал Рокетбанк.
  </p>
</template>


<style lang="scss" scoped>
.about-rocket {
	text-align: center;

	h3 {
		@media (max-width: 1249px) {
			margin-bottom: 43px;
			font-size: 34px;
		}

		@media (min-width: 1250px) {
			margin-bottom: 77px;
			font-size: 40px;
			line-height: 1.75;
		}
	}

	.card {
		background-image: url('@/assets/card.png');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;

		@media (max-width: 1249px) {
			height: 177px;
			margin: 0 auto 66px;
		}

		@media (min-width: 1250px) {
			width: 502px;
			height: 319px;
			margin: 0 auto 94px;
		}
	}

	.row {
		@media (max-width: 1249px) {
			flex-direction: column;
			margin-bottom: 40px;
		}

		@media (min-width: 1250px) {
			margin-bottom: 50px;
		}
	}

	.col {
		@media (max-width: 1249px) {
			width: 100%;
			margin-bottom: 29px;
		}

		@media (min-width: 1250px) {
			width: 30%;
		}
	}

	.title {
		font-size: 30px;
		letter-spacing: -1.45px;
		line-height: 46px;
		font-weight: 600;

		@media (max-width: 1249px) {
			margin-bottom: 10px;
		}
	}

	.text {
		font-size: 18px;
		letter-spacing: -0.47px;
		line-height: 24px;
	}
}

.cities, .license {
	text-align: center;

	@media (max-width: 1249px) {
		margin-bottom: 18px;
	}

	@media (min-width: 1250px) {
		width: 860px;
		margin: 0 auto 20px;
	}
}
</style>