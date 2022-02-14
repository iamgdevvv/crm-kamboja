<template>
	<section class="entry-wizard entry-wizard__packagewizard" :class="className">
		<div class="header-wizard-content">
			<h3 class="title-wizard-content">Pilih paket proteksi pemakaman</h3>
		</div>
		<article class="wizard-content">
			<ul v-if="dataPackages.length" class="options-package">
				<li v-for="data in dataPackages" :key="data.value" class="option-package">
					<div class="package-box" :class="{ 'package--selected':packageSelected(data.value), 'package--popular':data.popular }">
						<input v-model="form_package.your_package" type="radio" :value="data.value" @click="setPackage(data)">
						<div class="package-branding">
							<div class="package-name">
								<Image :src="data.icon" className="icon-package" />
								<span class="title-package">{{ data.label }}</span>
							</div>
							<div class="package-price">
								<span class="prefix-price-package">Proteksi hingga</span>
								<span class="price-package">{{ data.currency.label }} {{ data.price.toLocaleString(data.currency.locale) }}</span>
							</div>
						</div>
						<ul class="package-info">
							<li :class="{ 'include-package': data.features.includes('transportasi-jenazah') }">Pengurusan transportasi jenazah</li>
							<li :class="{ 'include-package': data.features.includes('rumah-duka') }">Pengurusan rumah duka</li>
							<li :class="{ 'include-package': data.features.includes('akte-kematian') }">Pengurusan akte kematian</li>
							<li :class="{ 'include-package': data.features.includes('reservasi-tpu-tps') }">Reservasi tempat pemakaman (TPU/TPS)</li>
						</ul>
						<span v-if="data.popular" class="package-popular">Populer</span>
					</div>
				</li>
			</ul>
		</article>
		<aside class="wizard-sidebar">
			<BoxPackage className="box-sidebar" :wizard="datawizard" @prev="prevWizard" @submit="submitPackage" />
		</aside>
	</section>
</template>


<script>
	import { store } from '../stores'
	import BoxPackage from '../components/BoxPackage.vue'
	import Image from '../components/Image.vue'

	export default {
		name: 'PackageWizard',
		props: {
			datawizard: Object,
			className: String
		},
		components: {
			Image,
			BoxPackage
		},
		data() {
			return {
				dataPackages: [
					{
						value: 'paket-aman',
						label: 'Aman',
						icon: '/assets/icons/icon-amanblack.svg',
						currency: {
							label: 'Rp',
							iso: 'IDR',
							locale: 'id-ID'
						},
						price: 25_000_000,
						instalment_monthly: 38_000,
						features: [
							'transportasi-jenazah',
						],
						popular: false
					},
					{
						value: 'paket-nyaman',
						label: 'nyaman',
						icon: '/assets/icons/icon-nyamanblack.svg',
						currency: {
							label: 'Rp',
							iso: 'IDR',
							locale: 'id-ID'
						},
						price: 50_000_000,
						instalment_monthly: 68_000,
						features: [
							'transportasi-jenazah',
							'rumah-duka',
							'akte-kematian',
						],
						popular: true
					},
					{
						value: 'paket-tentram',
						label: 'tentram',
						icon: '/assets/icons/icon-tentramblack.svg',
						currency: {
							label: 'Rp',
							iso: 'IDR',
							locale: 'id-ID'
						},
						price: 100_000_000,
						instalment_monthly: 88_000,
						features: [
							'transportasi-jenazah',
							'rumah-duka',
							'akte-kematian',
							'reservasi-tpu-tps'
						],
						popular: false
					},
				],
				form_package: {
					your_package: 'paket-aman',
				},
			}
		},
		methods: {
			packageSelected(value) {
				return this.form_package.your_package === value
			},
			setPackage(data) {
				store.commit('choosePackage', data)
				store.commit('setCRM', {
					your_package: data.value
				})
			},
			prevWizard() {
				this.$emit('stepPrev', this.datawizard)
			},
			submitPackage() {
				this.$emit('step', this.datawizard)
			}
		},
		created() {
			// SET DEFAULT CHOOSEN PACKAGE
			store.commit('choosePackage', this.dataPackages[0])
		},
	}
</script>

<style scoped>
	.header-wizard-content {
		@apply mb-15px;
	}

	.wizard-content {
		@apply @xl:(pr-40px);
		@apply xl:(pr-52px);
	}

	.options-package {
		@apply flexs pl-0 list-none;

		.option-package {
			@apply w-full not-first:mt-15px;
		}
	}

	.package-box {
		@apply relative flexs w-full border-2 border-gray-200 rounded-10px transition duration-300;
		@apply after:(content-a text-0px absolute top-12px right-12px w-16px h-16px border-2 border-white bg-white rounded-full shadow-gray-300 transition duration-300);
		@apply <md:(p-20px);
		@apply md:(py-30px pl-38px pr-20px);

		&:after {
			box-shadow: 0 0 0 1px var(--tw-shadow-color);
		}

		&:hover, &.package--selected {
			@apply border-pink-500;
		}

		&.package--popular {
			@apply <md:(pt-50px);
		}

		&.package--selected:after {
			@apply bg-pink-500 shadow-pink-500;
		}

		&.package--selected {
			.package-info .include-package {	
				@apply before:(bg-pink-500 border-pink-500);
			}
		}


		input {
			@apply absolute top-0 left-0 z-10 w-full h-full opacity-0;
		}

		.package-popular {
			@apply absolute top-0 left-40px w-144px p-8px text-16px text-center text-pink-500 font-bold bg-pink-200 rounded-b-10px;
		}

		.package-branding {
			@apply <md:(w-full);
			@apply md:(w-5/12 pr-18px);
		}

		.package-info {
			@apply <md:(w-full mt-28px);
			@apply md:(w-7/12);
		}
	}

	.package-branding {
		@apply flexs flex-col items-start;

		.package-name {
			@apply flexs items-center;
		}

		.icon-package {
			@apply mr-12px w-27px;
		}

		.title-package {
			@apply text-22px font-bold uppercase;
		}

		.package-price {
			@apply mt-24px;
		}

		.prefix-price-package {
			@apply block text-21px font-light first-letter:capitalize;
		}

		.price-package {
			@apply block mt-10px text-35px font-bold break-all;
		}
	}

	.package-info {
		@apply pl-0 list-none;

		li {
			@apply relative block pl-36px first-letter:capitalize not-first:mt-16px;
			@apply before:(content-a text-0px absolute top-2px left-0 w-24px h-24px bg-white border-2 border-gray-300 rounded-full bg-center bg-no-repeat transition duration-300);

			&::before {
				background-size: 10px auto, contain;
				background-image: url(/assets/icons/icon-timesgray300.svg);
			}

			&.include-package {					
				
				&:before {
					@apply bg-dark-400 border-dark-400;
					background-size: 12px auto, contain;
					background-image: url(/assets/icons/icon-checkwhite.svg);
				}
			}
		}
	}
</style>