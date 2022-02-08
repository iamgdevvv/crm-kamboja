<template>
	<div v-if="dataPayments.length" class="logo-payments" :class="className">
		<Image v-for="data in dataPayments" :src="data.logo" class="logo-payment" />
	</div>
</template>

<script>
	import logoPayments from "../data/logo-payments.json"
	import Image from "./Image.vue"

	export default {
		name: "LogoPayments",
		props: {
			className: String,
			dataPayments: {
				type: Array,
				default: () => logoPayments
			}
		},
		components: { Image }
	}
</script>

<style scoped>
	.logo-payments {
		@apply flexs justify-between items-center -mx-10px -mb-16px;

		.logo-payment {
			@apply w-auto px-10px mb-16px;

			:global(img) {
				@apply w-auto h-11px object-contain;
			}
		}
	}
</style>