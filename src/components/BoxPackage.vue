<template>
	<div class="box-package box-sidebar">
		<div class="package-branding">
			<span class="package-labelchoosen">Paket yang dipilih:</span>
			<div class="package-name">
				<Image :src="this.package?.icon" className="icon-package" />
				<span class="title-package">{{ this.package?.label }}</span>
			</div>
		</div>
		<div class="package-detail">
			<span class="label-estimate-package">Estimasi Biaya Proteksi</span>
			<span class="estimate-package">
				<span class="price-estimate">{{ this.package?.currency.iso }} {{ this.package?.instalment_monthly.toLocaleString(this.package?.currency.locale) }}</span>
				<span class="suffix-price-estimate">/bulan</span>
			</span>
			<p class="info-estimate-package"><span class="required-info">*</span> Biaya proteksi diatas akan terindex setiap tahunnya menyesuaikan usia anda.</p>
			<ul class="package-info">
				<li :class="{ 'include-package': this.package?.features.includes('transportasi-jenazah') }">Pengurusan transportasi jenazah</li>
				<li :class="{ 'include-package': this.package?.features.includes('rumah-duka') }">Pengurusan rumah duka</li>
				<li :class="{ 'include-package': this.package?.features.includes('akte-kematian') }">Pengurusan akte kematian</li>
				<li :class="{ 'include-package': this.package?.features.includes('reservasi-tpu-tps') }">Reservasi tempat pemakaman (TPU/TPS)</li>
			</ul>
			<div class="package-action">
				<button class="cta-prev-wizard" @click.prevent="prevPackage">Kembali</button>
				<button class="cta-submit-wizard" :class="{ 'prevent-submit':packageInvalid }" @click.prevent="submitPackage">Selanjutnya</button>
			</div>
		</div>
		<div class="payment-info">
			<span class="label-payment-info">Menerima pembayaran melalui:</span>
			<LogoPayments />
		</div>
	</div>
</template>

<script>
	import Image from './Image.vue'
	import LogoPayments from './LogoPayments.vue'

	export default {
		name: 'BoxPackage',
		props: {
			wizard: Object,
			className: String
		},
		computed: {
			package() {
				return this.$store.state.choosenPackage
			}
		},
		components: {
			Image,
			LogoPayments
		},
		methods: {
			prevPackage() {
				this.$emit('prev')
			},
			submitPackage() {
				this.$emit('submit')
			}
		},
	}
</script>

<style scoped>
	.package-labelchoosen {
		@apply inline-block mr-8px;
	}

	.package-branding {
		@apply flexs justify-center p-20px border-b border-gray-300;

		.package-name {
			@apply flexs items-center;
		}

		.icon-package {
			@apply mr-12px w-27px;
		}

		.title-package {
			@apply text-22px font-bold uppercase;
		}
	}

	.package-info {
		@apply px-2px pl-0 list-none;

		li {
			@apply relative block pl-26px pt-2px text-14px first-letter:capitalize not-first:mt-16px;
			@apply before:(content-a text-0px absolute top-0 left-0 w-16px h-16px bg-white border-2 border-gray-300 rounded-full bg-center bg-no-repeat transition duration-300);

			&::before {
				background-size: 8px auto, contain;
				background-image: url(/assets/icons/icon-timesgray300.svg);
			}

			&.include-package {
				
				&:before {
					@apply bg-pink-500 border-pink-500;
					background-image: url(/assets/icons/icon-checkwhite.svg);
				}
			}
		}
	}

	.package-action {
		@apply w-full flexs justify-between mt-44px;

		.cta-prev-wizard {
			width: calc(45% - 10px);
		}

		.cta-submit-wizard {
			width: 55%;
		}
	}

	.payment-info {
		@apply px-30px pt-20px pb-26px border-t border-gray-300;
	}

	.package-detail {
		@apply flex flex-col items-center pt-32px pb-40px px-30px;
	}

	.payment-info {
		
		.label-payment-info {
			@apply block mb-20px text-16px text-center;
		}
	}

	.label-estimate-package {
		@apply relative inline-block pl-28px mb-20px text-14px font-bold text-yellow-400;
		@apply before:(content-a absolute -top-3px left-0 inline-block w-18px h-18px text-0px bg-no-repeat bg-contain bg-center);

		&:before {
			background-image: url(/assets/icons/icon-infoyellow.svg);
		}
	}

	.estimate-package {
		@apply break-all;

		.price-estimate {
			@apply text-46px font-bold uppercase;
			font-size: clamp(40px, 2.4vw, 46px);
		}
	}

	.info-estimate-package {
		font-size: clamp(22px, 2vw, 22px);
		@apply mt-15px text-14px text-center leading-relaxed;

		.required-info {
			@apply text-pink-500;
		}
	}
</style>