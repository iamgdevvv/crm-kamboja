<template>
	<section class="entry-wizard entry-wizard__successwizardwizard" :class="className">
		<div class="header-wizard-content">
			<h3 class="title-wizard-content">Isi SuccessWizard tanggal lahir Anda</h3>
			<p>Biaya proteksi akan terindex setiap tahunnya menyesuaikan usia anda.</p>
		</div>
		<article class="wizard-content">
			<div class="body-wizard-content">
			</div>
		</article>
	</section>
</template>


<script>
	export default {
		name: 'SuccessWizard',
		props: {
			datawizard: Object,
			className: String
		},
		data() {
			return {
				form_birth: {
					your_date: '',
					your_month: '',
					your_year: '',
				},
				wizard_invalid: true
			}
		},
		methods: {
			submitSuccess(e) {
				if( this.wizard_invalid ) {
					return false
				}

				this.$emit("step", this.datawizard);
			}
		},
	}
</script>

<style scoped>
</style>