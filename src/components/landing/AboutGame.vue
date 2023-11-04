<template>
  <div class="about-game">
    <div class="col">
      <img src="@/assets/demo.gif" />
    </div>
    <div class="col">
      <h3>Конечно, подарим</h3>
      <p>За то, что сыграете в три в ряд — великий и&nbsp;красивый тайм-киллер</p>
      <p>Зарабатывайте очки, собирая как можно больше одинаковых стрелочек подряд</p>
      <p>Среди набравших 10&nbsp;000 очков мы разыграем 10 паков: сумка&nbsp;+ носки&nbsp;+ кардхолдер</p>
      <p>Итоги розыгрыша объявим 30 февраля</p>

      <div
        class="play-btn"
        @click="$emit('play')"
      >
        Играть
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-game {
	display: flex;

	@media (max-width: 1249px) {
		flex-direction: column;
	}

	h3 {
		margin-bottom: 25px;
		text-align: left;
		line-height: 1.75;

		@media (max-width: 1249px) {
			padding: 0;
			font-size: 27px;
		}
		
		@media (min-width: 1250px) {
			font-size: 40px;
		}
	}

	.col {
		p {
			font-size: 18px;
			margin-bottom: 20px;
		}

		&:nth-of-type(1) { 
			@media (max-width: 1249px) {
				width: auto;
				margin-left: -34px;
				margin-right: -34px;

				img {
					display: block;
					width: 100%;
					max-width: 600px;
					height: auto;
					margin-bottom: 66px;
					margin-left: auto;
					margin-right: auto;
				}
			}

			@media (min-width: 1250px) {
				width: 591px;
				height: 451px;
				margin-right: 113px;
			}
		}

		&:nth-of-type(2) { 
			@media (max-width: 1249px) {
				width: 100%;
			}

			@media (min-width: 1250px) {
				width: 400px;   
			}
		}
	}

	.play-btn {
		display: inline-block;
		height: 70px;
		background: #01F185;
		box-shadow: 0 0 13px 0 rgba(64, 253, 1, 0.46);
		border-radius: 5px;
		font-size: 20px;
		color: #000;
		letter-spacing: -0.56px;
		text-align: center;
		line-height: 70px;

		@media (max-width: 1249px) {
			width: 100%;
			margin-top: 35px;
			margin-bottom: 139px;
		}

		@media (min-width: 1250px) {
			width: 220px;
			margin-top: 50px;
			margin-bottom: 200px;
		}
	}
}
</style>