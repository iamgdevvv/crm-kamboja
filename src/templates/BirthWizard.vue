<template>
	<section class="entry-wizard entry-wizard__birthwizard" :class="className">
		<div class="header-wizard-content">
			<h3 class="title-wizard-content">Isi tanggal lahir Anda</h3>
			<p>Biaya proteksi akan terindex setiap tahunnya menyesuaikan usia anda.</p>
		</div>
		<article class="wizard-content">
			<fieldset class="form-group form-group-fieldset">
				<legend>Tanggal Lahir <span class="icon-required">*</span></legend>
				<div class="field-item">
					<v-select v-model="form_birth.your_date" placeholder="Tanggal" label="label" :options="data_date" :value="form_birth.your_date" :class="{ 'field-select-error':validate_your_date === false }" @close="updateFieldDropdown(form_birth.your_date, 'your_date')"></v-select>
				</div>
				<div class="field-item">
					<v-select v-model="form_birth.your_month" placeholder="Bulan" label="label" :options="data_month" :value="form_birth.your_month" :class="{ 'field-select-error':validate_your_month === false }" @close="updateFieldDropdown(form_birth.your_month, 'your_month')"></v-select>
				</div>
				<div class="field-item">
					<v-select v-model="form_birth.your_year" placeholder="Tahun" label="label" :options="data_year" :value="form_birth.your_year" :class="{ 'field-select-error':validate_your_year === false }" @close="updateFieldDropdown(form_birth.your_year, 'your_year')"></v-select>
				</div>
			</fieldset>
			<Info className="preview-your-date">Usia anda {{ user_age }} tahun</Info>
			{{ dataCalendar }}
		</article>
		<aside class="wizard-sidebar">
			<div class="box-sidebar">
				<button class="cta-submit-wizard" :disabled="birth_invalid" @click.prevent="submitBirth">Selanjutnya</button>
			</div>
		</aside>
	</section>
</template>


<script>
	import { store  } from '../stores'
	import dateJson from '../data/date.json'
	import monthJson from '../data/month.json'
	import Info from '../components/Info.vue'

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
	name: "BirthWizard",
	props: {
		datawizard: Object,
		className: String
	},
	components: {
		Info
	},
	data() {
		return {
			form_birth: {
				your_date: 0,
				your_month: 0,
				your_year: 0,
			},
			data_date: dateJson,
			data_month: monthJson,
			data_year: yearJson,
			validate_your_date: null,
			validate_your_month: null,
			validate_your_year: null,
			user_age: 0,
			birth_invalid: true
		};
	},
	computed: {
		date_crm() {
			return this.$store.state.data_crm;
		}
	},
	methods: {
		updateFieldDropdown(data, key) {
			// SET DATE CRM
			store.commit("setCRM", {
				[key]: data?.value || 0
			});

			// INIT VALIDATE FIELD BIRTH
			this._validateFieldBirth()

			// INIT VALIDATE WIZARD BIRTH
			this._validateWizardBirth(key)
		},
		_validateFieldBirth() {

			const form_birth = this.form_birth
			const data_your_date = form_birth.your_date
			const data_your_month = form_birth.your_month
			const year_leap = form_birth.your_year?.isLeap || false

			// VALIDATE MONTH FIELD
			if (data_your_month instanceof Object && data_your_month?.days ) {
				let month_days = data_your_month.days

				if (year_leap && data_your_month.value === 2) {
					month_days = 29;
				}

				this.data_date = dateJson.filter(item => item.value <= month_days)

				// IF MONTH HAS LESS DAYS THAN DATE
				if (month_days < data_your_date?.value) {
					this.form_birth.your_date = 0
					store.commit("setCRM", {
						your_date: 0
					})
					this.validate_your_date = false
				}
			}
		},
		_validateWizardBirth(key) {
			const date_crm = this.date_crm
			this[`validate_${key}`] = date_crm[key] !== 0
			const validate_field_birth = this.validate_your_date && this.validate_your_month && this.validate_your_year

			if ( this.validate_your_date && this.validate_your_month && this.validate_your_year ) {
				// SET USER AGE
				const todayDate = new Date()
				const birthDate = new Date(`${date_crm.your_year}-${date_crm.your_month}-${date_crm.your_date}`)
				this.user_age = todayDate.getFullYear() - birthDate.getFullYear()
				var medianMonth = todayDate.getMonth() - birthDate.getMonth()
				if (medianMonth < 0 || (medianMonth === 0 && todayDate.getDate() < birthDate.getDate())) {
					this.user_age--
				}
				// WIZARD INVALID TRUE
				this.birth_invalid = false
				this.datawizard.isDone = true
			}
			else {
				// SET USER AGE
				this.user_age = 0
				// WIZARD INVALID FALSE
				this.birth_invalid = true
				this.datawizard.isDone = false
			}
		},
		submitBirth(e) {
			if ( this.birth_invalid === false ) {
				this.$emit("step", this.datawizard)
			}
		}
	},
	created() {
		// SET DEFAULT CHOOSEN PACKAGE
		store.commit("setCRM", {
			your_date: 0,
			your_month: 0,
			your_year: 0
		});
	}
}
</script>

<style scoped>
	.header-wizard-content {
		@apply mb-30px;
	}

	.wizard-content {
		@apply @xl:(pr-40px);
		@apply 2xl:(pr-126px);
	}

	.form-group-fieldset {

		legend {
			@apply px-8px;
		}
	}

	.field-item {
		@apply <md:w-full;
		@apply md:w-1/3;
	}

	.box-sidebar {
		@apply py-40px px-32px;

		.cta-submit-wizard {
			@apply w-full;
		}
	}

	.preview-your-date {
		@apply text-14px font-bold text-cyan-400 mt-30px;
		@apply before:(-top-2px);

		&:before {
			background-image: url(/assets/icons/icon-infoblue.svg);
		}
	}
</style>