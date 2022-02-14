<template>
	<section class="entry-wizard entry-wizard__successwizardwizard" :class="className">
		<div class="header-wizard-content">
			<Image src="/assets/logos/kamboja.svg" className="logo-kamboja" />
			<h2 class="title-wizard-content">Terima kasih telah melakukan <span class="text-pink-500">pendaftaran</span> !</h2>
		</div>
		<article class="wizard-content">
			<div class="body-wizard-content">
				<p>Data anda sedang diperiksa oleh tim kami. Kami akan menghubungi kembali anda paling lambat <strong>2 x 24 Jam</strong>.</p>
				<a href="#" class="cta-success-wizard">Kembali ke halaman utama</a>
			</div>
		</article>
	</section>
</template>


<script>
	import Image from "../components/Image.vue"

	export default {
		name: "SuccessWizard",
		props: {
			datawizard: Object,
			className: String
		},
		components: {
			Image
		},
		data() {
			return {
				form_birth: {
					your_date: "",
					your_month: "",
					your_year: "",
				},
				wizard_invalid: true
			};
		},
		methods: {
			submitSuccess(e) {
				if (this.wizard_invalid) {
					return false;
				}
				this.$emit("step", this.datawizard);
			}
		}
	}
</script>

<style scoped>
	.entry-wizard.entry-wizard__successwizardwizard {
		@apply flex-col items-center mt-92px;

		.header-wizard-content, .wizard-content {
			@apply w-636px max-w-full text-center;
		}
	}

	.header-wizard-content {
		@apply mb-16px;
	}

	.logo-kamboja {
		@apply flexs justify-center mb-22px;

		:global(img) {
			@apply w-70px;
		}
	}

	.cta-success-wizard {
		@apply cta-primary inline-flex px-28px py-22px mt-35px;

		&:hover {
			@apply bg-green-400 border-green-400;
		}
	}
</style>