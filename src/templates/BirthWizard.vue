<template>
	<section class="entry-wizard entry-wizard__birthwizard" :class="className">
		<div class="header-wizard-content">
			<h3 class="title-wizard-content">Isi tanggal lahir Anda</h3>
			<p>Biaya proteksi akan terindex setiap tahunnya menyesuaikan usia anda.</p>
		</div>
		<article class="wizard-content">
			<fieldset class="form-group form-group-fieldset">
				<legend>Tanggal Lahir <span class="icon-required">*</span></legend>
				<div class="fieldset-item">
					<v-select v-model.number="form_birth.your_date" placeholder="Tanggal" :options="dataDate" :value="form_birth.your_date" @close="setDateValue(form_birth.your_date, 'your_date')"></v-select>
				</div>
				<div class="fieldset-item">
					<v-select v-model.number="form_birth.your_month" placeholder="Bulan" :options="dataMonth" :value="form_birth.your_month" @close="setDateValue(form_birth.your_month, 'your_month')"></v-select>
				</div>
				<div class="fieldset-item">
					<v-select v-model.number="form_birth.your_year" placeholder="Tahun" :options="dataYear" :value="form_birth.your_year" @close="setDateValue(form_birth.your_year, 'your_year')"></v-select>
				</div>
			</fieldset>
			<span class="preview-your-date">Usia anda {{ userAge || '0' }} tahun</span>
			{{ dataCalendar }}
		</article>
		<aside class="wizard-sidebar">
			<button class="cta-submit-wizard" :class="{ 'prevent-submit':birthInvalid }" @click.prevent="submitBirth">Selanjutnya</button>
		</aside>
	</section>
</template>


<script>
	import dateJson from '../data/date.json'
	import monthJson from '../data/month.json'
	
	
	const yearJson = []

	for(let year = 1920; year <= new Date().getFullYear(); year++) {
		yearJson.push({
			value: year,
			isLeap: year % 4 === 0 && year % 100 !== 0 || year % 400 === 0,
			//isLeap: new Date(year, 1, 29).getMonth() == 1,
			label: year
		})
	}

	export default {
		name: 'BirthWizard',
		props: {
			datawizard: Object,
			className: String
		},
		data() {
			return {
				form_birth: {
					your_date: 0,
					your_month: 0,
					your_year: 0,
				},
				dataDate: dateJson,
				dataMonth: monthJson,
				dataYear: yearJson,
				userAge : 0,
				birthInvalid: true
			}
		},
		methods: {
			setDateValue(data = {}, key) {
				this.form_birth[key] = data?.value || 0

				if( this.form_birth.your_date !== 0 && this.form_birth.your_month !== 0 && this.form_birth.your_year !== 0 ) {

					// SET USER AGE
					const todayDate = new Date()
					const birthDate = new Date(`${this.form_birth.your_year}-${this.form_birth.your_month}-${this.form_birth.your_date}`)
					
					this.userAge = todayDate.getFullYear() - birthDate.getFullYear()

					var medianMonth = todayDate.getMonth() - birthDate.getMonth()
					if (medianMonth < 0 || (medianMonth === 0 && todayDate.getDate() < birthDate.getDate())) {
						this.userAge--
					}

					// WIZARD INVALID TRUE
					this.birthInvalid = false
					this.datawizard.isDone = true
				} else {
					// SET USER AGE
					this.userAge = 0

					// WIZARD INVALID FALSE
					this.birthInvalid = true
					this.datawizard.isDone = false
				}
			},
			submitBirth(e) {
				if( this.birthInvalid === false ) {
					this.$emit("step", this.datawizard);
				}

				return false
			}
		},
	}
</script>

<style scoped>
	.header-wizard-content {
		@apply mb-30px;
	}

	.wizard-content {
		@apply pr-126px;
	}

	.wizard-sidebar {
		@apply py-40px px-32px;

		.cta-submit-wizard {
			@apply w-full;
		}
	}

	.preview-your-date {
		@apply relative block pl-28px mt-30px text-14px font-bold text-cyan-400;
		@apply before:(content-a absolute -top-3px left-0 inline-block w-18px h-18px text-0px bg-no-repeat bg-contain bg-center);

		&:before {
			background-image: url(/assets/icons/icon-infoblue.svg);
		}
	}
</style>