<template>
	<div class="box-package" :class="className">
		<div class="package-branding">
			<span class="package-labelchoosen">Paket yang dipilih:</span>
			<div class="package-name">
				<Image :src="this.package?.icon" className="icon-package" />
				<span class="title-package">{{ this.package?.label }}</span>
			</div>
		</div>
		<div class="package-detail">
			<Info>Estimasi Biaya Proteksi</Info>
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
				<button class="cta-submit-wizard" :class="{ 'prevent-submit':packageInvalid }" @click.prevent="submitPackage">{{ labelNext }}</button>
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
	import Info from './Info.vue'

	export default {
		name: 'BoxPackage',
		props: {
			wizard: Object,
			labelNext: {
				type: String,
				default: 'Selanjutnya'
			},
			className: String
		},
		computed: {
			package() {
				return this.$store.state.choosenPackage
			}
		},
		components: {
			Image,
			LogoPayments,
			Info
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
	.box-sidebar {
		@apply sticky top-20px;
	}

	.package-labelchoosen {
		@apply inline-block mr-8px;
	}

	.package-branding {
		@apply flexs justify-center py-20px px-4px border-b border-gray-300;

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
		@apply px-2px pl-0 text-14px leading-relaxed list-none;

		li {
			@apply relative block pl-26px first-letter:capitalize not-first:mt-10px;
			@apply before:(content-a text-0px absolute top-2px left-0 w-16px h-16px bg-white border-2 border-gray-300 rounded-full bg-center bg-no-repeat transition duration-300);

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
			@apply <md:(w-full);
		}

		.cta-submit-wizard {
			width: 55%;
			@apply <md:(w-full mt-10px);
		}
	}

	.package-detail {
		@apply flex flex-col items-center;
		@apply <xl:(px-20px py-30px);
		@apply xl:(pt-32px pb-40px px-30px);

		.info-text {
			@apply text-14px font-bold mb-20px;
			@apply before:(-top-1px);
		}
	}

	.payment-info {
		@apply border-t border-gray-300;
		@apply <xl:(px-20px py-30px);
		@apply xl:(px-30px pt-20px pb-26px);

		.label-payment-info {
			@apply block mb-20px text-16px text-center;
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