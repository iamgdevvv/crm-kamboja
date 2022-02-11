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
					<v-select v-model="form_birth.your_date" placeholder="Tanggal" label="label" :options="data_date" :value="form_birth.your_date" @close="setDateValue(form_birth.your_date, 'your_date')"></v-select>
				</div>
				<div class="field-item">
					<v-select v-model.number="form_birth.your_month" placeholder="Bulan" label="label" :options="data_month" :value="form_birth.your_month" @close="setDateValue(form_birth.your_month, 'your_month')"></v-select>
				</div>
				<div class="field-item">
					<v-select v-model.number="form_birth.your_year" placeholder="Tahun" label="label" :options="data_year" :value="form_birth.your_year" @close="setDateValue(form_birth.your_year, 'your_year')"></v-select>
				</div>
			</fieldset>
			<span class="preview-your-date">Usia anda {{ user_age || '0' }} tahun</span>
			{{ dataCalendar }}
		</article>
		<aside class="wizard-sidebar">
			<div class="box-sidebar">
				<button class="cta-submit-wizard" :class="{ 'prevent-submit':birth_invalid }" @click.prevent="submitBirth">Selanjutnya</button>
			</div>
		</aside>
	</section>
</template>


<script>
	import { store  } from '../stores'
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

	console.log(yearJson)

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
				data_date: dateJson,
				data_month: monthJson,
				data_year: yearJson,
				user_age : 0,
				birth_invalid: true
			}
		},
		computed: {
			date_crm() {
				return this.$store.state.data_crm
			}
		},
		methods: {
			setDateValue(data = {}, key) {
				// SET DATE CRM
				store.commit('setCRM', {
					[key]: data?.value || 0
				})

				const data_form_birth = this.form_birth
				const year_leap = data_form_birth.your_year?.isLeap || false

				console.log('data_form_birth.your_date : ' + data_form_birth.your_date)

				// VALIDATE MONTH FIELD
				if( data_form_birth.your_month !== null && data_form_birth.your_month !== 0 ) {
					let month_days = data_form_birth.your_month.days
					this.data_date = dateJson.filter(item => item.value <= month_days)

					// IF MONTH HAS LESS DAYS THAN DATE
					if( year_leap && data_form_birth.your_month.value === 2 ) {
						this.data_date = dateJson.filter(item => item.value <= 29)
					} else if( month_days < data_form_birth.your_date?.value ) {
						this.form_birth.your_date = 0
						store.commit('setCRM', {
							your_date: 0
						})
					}
				} else {
					this.data_date = dateJson;
				}



				const date_crm = this.date_crm

				if( date_crm.your_date !== 0 && date_crm.your_month !== 0 && date_crm.your_year !== 0 ) {

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
				} else {
					// SET USER AGE
					this.user_age = 0

					// WIZARD INVALID FALSE
					this.birth_invalid = true
					this.datawizard.isDone = false
				}
			},
			submitBirth(e) {
				if( this.birth_invalid === false ) {
					this.$emit("step", this.datawizard);
				}
			}
		},
		created() {
			// SET DEFAULT CHOOSEN PACKAGE
			store.commit('setCRM', {
				your_date: 0,
				your_month: 0,
				your_year: 0
			})
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

	.form-group-fieldset {

		legend {
			@apply px-8px;
		}
	}

	.field-item {
		@apply w-1/3;
	}

	.box-sidebar {
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