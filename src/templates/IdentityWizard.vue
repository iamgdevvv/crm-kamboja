<template>
	<section class="entry-wizard entry-wizard__identitywizard" :class="className">
		<article class="wizard-content">
			<section class="section-identity section-info-identity">
				<div class="header-section-identity">
					<i class="icon-section-identity">1</i>
					<h3 class="title-section-identity">Isi Identitas diri anda</h3>
				</div>
				<div class="entry-section-identity">
					<div class="form-group">
						<div class="field-item">
							<label>Nama lengkap (sesuai KTP) <span class="icon-required">*</span></label>
							<input v-model="form_identity.your_name" type="text" @change="updateField(form_identity.your_name, 'your_name')" />
						</div>
						<div class="field-item field-body-height field-has-prefix">
							<label>Tinggi Badan <span class="icon-required">*</span></label>
							<input v-model.number="form_identity.your_height" type="number" @change="updateField(form_identity.your_height, 'your_height')" />
							<span class="prefix-field">cm</span>
						</div>
						<div class="field-item field-body-weight field-has-prefix">
							<label>Berat Badan <span class="icon-required">*</span></label>
							<input v-model.number="form_identity.your_weight" type="number" @change="updateField(form_identity.your_weight, 'your_weight')" />
							<span class="prefix-field">kg</span>
						</div>
						<div class="field-item field-has-prefix">
							<label>No KTP (NIK) <span class="icon-required">*</span></label>
							<input v-model.number="form_identity.your_ktp" type="number" @input="identityKTP($event, 16)" @change="updateField(form_identity.your_ktp, 'your_ktp')" />
							<span class="prefix-field"><span class="field-length">{{ prefix_ktp_length }}</span>/16</span>
						</div>
						<div class="field-item field-email">
							<label>Email <span class="icon-required">*</span></label>
							<input v-model="form_identity.your_email" type="email" @change="updateField(form_identity.your_email, 'your_email')" />
						</div>
						<div class="field-item field-tel-phone">
							<label>No.Handphone <span class="icon-required">*</span></label>
							<input v-model="form_identity.your_tel" type="tel" @change="updateField(form_identity.your_tel, 'your_tel')" />
						</div>
						<div class="field-item">
							<label>Nama Kepala Keluarga <span class="icon-opsional">(sesuai dengan Kartu Keluarga)</span></label>
							<input v-model="form_identity.your_name_head_family" type="text" @change="updateField(form_identity.your_name_head_family, 'your_name_heir')" />
						</div>
					</div>
				</div>
			</section>
			<section class="section-identity section-photo-identity">
				<div class="header-section-identity">
					<i class="icon-section-identity">2</i>
					<h3 class="title-section-identity">Upload Foto Identitas</h3>
				</div>
				<div class="entry-section-identity">
					<div class="form-group form-group-photos">
						<div class="field-item">
							<label>Upload Foto <b>Selfie</b> (Max: 5 MB) <span class="icon-required">*</span></label>
							<div class="field-upload-photo">
								<input type="file" capture="camera" accept="image/*" @change="updatePhoto($event, 'your_selfie')" />
								<Image :src="placholder_your_selfie" className="preview-photo" />
								<span class="cta-upload-photo">Masukkan Foto</span>
							</div>
						</div>
						<div class="field-item">
							<label>Upload Foto <b>KTP</b> (Max: 5 MB) <span class="icon-required">*</span></label>
							<div class="field-upload-photo">
								<input type="file" capture="camera" accept="image/*" @change="updatePhoto($event, 'your_ktp')" />
								<Image :src="placholder_your_ktp" className="preview-photo" />
								<span class="cta-upload-photo">Masukkan Foto</span>
							</div>
						</div>
						<div class="field-item">
							<label>Upload Foto <b>Selfie</b> dengan <b>KTP</b> (Max: 5 MB) <span class="icon-required">*</span></label>
							<div class="field-upload-photo">
								<input type="file" capture="camera" accept="image/*" @change="updatePhoto($event, 'your_ktp_selfie')" />
								<Image :src="placholder_your_ktp_selfie" className="preview-photo" />
								<span class="cta-upload-photo">Masukkan Foto</span>
							</div>
						</div>
						<div class="field-item">
							<label>Upload Foto <b>KK</b> (Max: 5 MB) <span class="icon-required">*</span></label>
							<div class="field-upload-photo">
								<input type="file" capture="camera" accept="image/*" @change="updatePhoto($event, 'your_kk')" />
								<Image :src="placholder_your_kk" className="preview-photo" />
								<span class="cta-upload-photo">Masukkan Foto</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="section-identity section-history-disease">
				<div class="header-section-identity">
					<i class="icon-section-identity">3</i>
					<h3 class="title-section-identity">Apakah anda memiliki riwayat sakit <br />dibawah ini ?</h3>
				</div>
				<div class="form-group form-group-boxradio">
					<div class="field-item">
						<div class="boxradio boxradio-none" :class="{ 'boxradio--selected':boxradioSelected('your_history_disease', 'none') }">
							<input v-model="form_identity.your_history_disease" type="radio" value='none' @change="updateField(form_identity.your_history_disease, 'your_history_disease')" />
							<p>Tidak ada</p>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_history_disease', 'type-1') }">
							<input v-model="form_identity.your_history_disease" type="radio" value='type-1' @change="updateField(form_identity.your_history_disease, 'your_history_disease')" />
							<p>Tipe 1:</p>
							<ul>
								<li>Kanker Stadium III/IV</li>
								<li>Hipertensi Stadium I/II (>130/80mmHg)</li>
								<li>Jantung Koroner Stadium (II/III)</li>
							</ul>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_history_disease', 'type-2') }">
							<input v-model="form_identity.your_history_disease" type="radio" value='type-2' @change="updateField(form_identity.your_history_disease, 'your_history_disease')" />
							<p>Tipe 2:</p>
							<ul>
								<li>AIDS, Leukimia Akut</li>
							</ul>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_history_disease', 'type-3') }">
							<input v-model="form_identity.your_history_disease" type="radio" value='type-3' @change="updateField(form_identity.your_history_disease, 'your_history_disease')" />
							<p>Tipe 3:</p>
							<ul>
								<li>Asma Akut</li>
								<li>Penyakit Paru Akut</li>
								<li>Bronkitis Kronis</li>
							</ul>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_history_disease', 'type-4') }">
							<input v-model="form_identity.your_history_disease" type="radio" value='type-4' @change="updateField(form_identity.your_history_disease, 'your_history_disease')" />
							<p>Tipe 4:</p>
							<ul>
								<li>Stroke</li>
								<li>Obesitas</li>
								<li>Dementia</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="form-group form-group-smoker">
					<label>Apakah Anda Perokok?</label>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_smoker', 'none') }">
							<input v-model="form_identity.your_smoker" type="radio" value='none' @change="updateField(form_identity.your_smoker, 'your_smoker')" />
							<p>Tidak, saya tidak merokok</p>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_smoker', 'pasif-smoker') }">
							<input v-model="form_identity.your_smoker" type="radio" value='pasif-smoker' @change="updateField(form_identity.your_smoker, 'your_smoker')" />
							<p>Kadang-kadang, perokok PASIF/SOSIAL</p>
						</div>
					</div>
					<div class="field-item">
						<div class="boxradio" :class="{ 'boxradio--selected':boxradioSelected('your_smoker', 'active-smoker') }">
							<input v-model="form_identity.your_smoker" type="radio" value='active-smoker' @change="updateField(form_identity.your_smoker, 'your_smoker')" />
							<p>Iya, saya perokok AKTIF</p>
						</div>
					</div>
				</div>
			</section>
			<section class="section-identity section-cols-group">
				<div class="col-group-identity">
					<div class="header-section-identity">
						<i class="icon-section-identity">4</i>
						<h3 class="title-section-identity">Detail Ahli Waris</h3>
					</div>
					<div class="entry-section-identity">
						<Info>Usia minimal sebagai Ahli Waris harus diatas 17 tahun dan memiliki KTP</Info>
						<div class="form-group">
							<div class="field-item">
								<label>Nama Ahli Waris <span class="icon-required">*</span></label>
								<input v-model="form_identity.your_name_heir" type="text" @change="updateField(form_identity.your_name_heir, 'your_name_heir')" />
							</div>
							<div class="field-item">
								<label>No. Telepon Ahli Waris <span class="icon-required">*</span></label>
								<input v-model="form_identity.your_tel_heir" type="tel" @change="updateField(form_identity.your_tel_heir, 'your_tel_heir')" />
							</div>
							<div class="field-item">
								<label>Email Ahli Waris <span class="icon-required">*</span></label>
								<input v-model="form_identity.your_email_heir" type="email" @change="updateField(form_identity.your_email_heir, 'your_email_heir')" />
							</div>
							<div class="field-item">
								<label>Hubungan dengan Ahli Waris <span class="icon-required">*</span></label>
								<v-select v-model="form_identity.your_relation_heir" label="label" :options="data_relation_heir" :value="form_identity.your_relation_heir" @close="updateFieldDropdown(form_identity.your_relation_heir, 'your_relation_heir')"></v-select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-group-identity">
					<div class="header-section-identity">
						<i class="icon-section-identity">5</i>
						<h3 class="title-section-identity">Detail Ketua RT</h3>
					</div>
					<div class="entry-section-identity">
						<div class="form-group">
							<div class="field-item">
								<label>Nama Ketua RT <span class="icon-required">*</span></label>
								<input v-model="form_identity.your_name_rt" type="text" @change="updateField(form_identity.your_name_rt, 'your_name_rt')" />
							</div>
							<div class="field-item">
								<label>No. Telepon Ketua RT <span class="icon-required">*</span></label>
								<input v-model="form_identity.your_tel_rt" type="tel" @change="updateField(form_identity.your_tel_rt, 'your_tel_rt')" />
							</div>
						</div>
					</div>
				</div>
				<div class="col-group-identity">
					<div class="header-section-identity">
						<i class="icon-section-identity">6</i>
						<h3 class="title-section-identity">Periode pembayaran</h3>
					</div>
					<div class="entry-section-identity">
						<div class="form-group">
							<div class="field-item">
								<label>Hubungan dengan Ahli Waris <span class="icon-required">*</span></label>
								<v-select v-model="form_identity.your_payment_period" label="label" :options="data_payment_period" :value="form_identity.your_payment_period" @close="updateFieldDropdown(form_identity.your_payment_period, 'your_payment_period')"></v-select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-group-identity col-group-identity_agreement">
					<div class="field-box-agreement">
						<div class="form-group form-group-checkbox">
							<div class="field-item">
								<input v-model="form_identity.your_agreement_correctly" id="your_agreement_correctly" type="checkbox" @change="updateField(form_identity.your_agreement_correctly, 'your_agreement_correctly')" />
								<label for="your_agreement_correctly">Menyatakan bahwa formulir pendaftaran diatas telah di cek dan terisi secara benar <span class="icon-required">*</span></label>
							</div>
							<div class="field-item">
								<input v-model="form_identity.your_agreement_privacy" id="your_agreement_privacy" type="checkbox" @change="updateField(form_identity.your_agreement_privacy, 'your_agreement_privacy')" />
								<label for="your_agreement_privacy">Telah membaca dan setuju dengan <a href="#">Kebijakan Privasi</a> dan <a href="#">Kebijakan Layanan</a> Kamboja <span class="icon-required">*</span></label>
							</div>
							<div class="field-item">
								<input v-model="form_identity.your_agreement_newsletter" id="your_agreement_newsletter" type="checkbox" @change="updateField(form_identity.your_agreement_newsletter, 'your_agreement_newsletter')" />
								<label for="your_agreement_newsletter">Menerima informasi, newsletter, atau promosi terkait dengan produk dan Mitra Asuransi Kamboja <span class="icon-opsional">(Opsional)</span></label>
							</div>
						</div>
					</div>
				</div>
			</section>
		</article>
		<aside class="wizard-sidebar">
			<span class="info-personal">Data pribadi Anda disimpan sesuai dengan undang-undang negara</span>
			<BoxPackage label-next="Kirim Form" className="box-sidebar" :submit-invalid="form_identity_validation" :wizard="datawizard" @prev="prevWizard" @submit="openPopupValidate" />
		</aside>
	</section>
	<PopupValidate :state-toggle="toggle_popup" @closePopup="closePopupValidate" @submitPopup="submitPackage" />
</template>


<script>
	import { store } from '../stores'
	import BoxPackage from '../components/BoxPackage.vue'
	import PopupValidate from './PopupValidate.vue'
	import Image from '../components/Image.vue'
	import Info from '../components/Info.vue'

	export default {
		name: 'IdentityWizard',
		props: {
			datawizard: Object,
			className: String
		},
		computed: {
			dataCRM() {
				return this.$store.state.data_crm
			},
		},
		components: {
			BoxPackage,
			Image,
			Info,
			PopupValidate
		},
		data() {
			return {
				form_identity: {
					your_name: '',
					your_height: '',
					your_weight: '',
					your_ktp: '',
					your_email: '',
					your_tel: '',
					your_name_head_family: '',
					your_selfie: '',
					your_ktp: '',
					your_selfie_ktp: '',
					your_kk: '',
					your_history_disease: 'none',
					your_smoker: 'none',
					your_name_heir: '',
					your_tel_heir: '',
					your_email_heir: '',
					your_relation_heir: '',
					your_name_rt: '',
					your_tel_rt: '',
					your_payment_period: '',
					your_agreement_correctly: true,
					your_agreement_privacy: false,
					your_agreement_newsletter: false
				},
				placholder_your_selfie: '/assets/images/placeholder-selfie.png',
				placholder_your_ktp: '/assets/images/placeholder-ktp.png',
				placholder_your_ktp_selfie: '/assets/images/placeholder-ktp-selfie.png',
				placholder_your_kk: '/assets/images/placeholder-ktp.png',
				prefix_ktp_length: 0,
				data_relation_heir: [
					{
						value: 'mother',
						label: 'Ibu'
					},
					{
						value: 'father',
						label: 'Ayah'
					},
					{
						value: 'siblings',
						label: 'Saudara Kandung'
					},
				],
				data_payment_period: [
					{
						value: '1-month',
						label: '1 bulan'
					},
					{
						value: '3-month',
						label: '3 bulan'
					},
					{
						value: '6-month',
						label: '6 bulan'
					},
					{
						value: '1-year',
						label: '1 tahun (Potongan Harga 10%)'
					}
				],
				form_identity_validation: false,
				toggle_popup: false
			}
		},
		methods: {
			boxradioSelected(key, value) {
				return this.form_identity[key] === value
			},
			identityKTP(e, max) {
				const this_value = e.target.value
				const this_length = this_value.length

				if( this_length > max ) {
					e.target.value = this_value.slice(0, max)
				}

				this.prefix_ktp_length = e.target.value.length
			},
			updatePhoto(e, key) {
				const fieldValue = e.target.value
				const fieldFile = e.target.files[0]

				store.commit('setCRM', {
					[key]: fieldValue
				})

				this[`placholder_${key}`] = URL.createObjectURL(fieldFile)
				console.log(this.dataCRM)
			},
			updateField(data, key) {
				store.commit('setCRM', {
					[key]: data
				})
				console.log(this.dataCRM)
			},
			updateFieldDropdown(data, key) {
				store.commit('setCRM', {
					[key]: data?.value || 0
				})
				console.log(this.dataCRM)
			},
			prevWizard() {
				this.$emit('stepPrev', this.datawizard)
			},
			openPopupValidate() {
				this.toggle_popup = true
			},
			closePopupValidate() {
				this.toggle_popup = false
			},
			submitPackage() {
				this.toggle_popup = false
				this.$emit('step', this.datawizard)
			}
		},
	}
</script>

<style scoped>
	.info-personal {
		@apply relative block pl-66px pr-20px py-20px mb-10px text-14px leading-tight text-green-400 bg-green-50;
		@apply before:(absolute top-18px left-24px content-a text-0px w-28px h-34px bg-no-repeat bg-contain bg-center);

		&:before {
			background-image: url(/assets/icons/icon-personalgreen.svg);
		}
	}

	.wizard-content {
		@apply xl:(pr-30px);
	}

	.section-identity {
		@apply not-first:pt-48px;
		@apply not-last:(border-b border-gray-300 pb-48px);
	}

	.entry-section-identity {

		.info-text {
			@apply text-16px leading-relaxed mb-25px;
		}
	}

	.section-info-identity {
		@apply 2xl:(pr-225px);
	}

	.header-section-identity {
		@apply relative pt-18px pl-80px mb-48px;

		.icon-section-identity {
			@apply absolute top-6px left-0 flexs-center w-60px h-60px text-25px font-bold not-italic text-white rounded-full bg-fuchsia-600;
		}
		
		.title-section-identity {
			@apply leading-snug;
		}
	}

	.field-body-height,
	.field-body-weight {
		@apply md:(w-2/5);
	}

	.field-email {
		@apply md:(w-7/12);
	}

	.field-tel-phone {
		@apply md:(w-5/12);
	}

	.field-has-prefix {
		@apply relative;

		input {
			@apply pr-50px;
		}

		.prefix-field {
			@apply absolute bottom-30px right-28px z-2 text-12px text-gray-500;
		}
	}

	.form-group-photos {
		@apply -mx-15px -mb-36px;
		@apply md:(-mx-15px);
		counter-reset: field_photos;

		label {
			@apply mb-16px;
		}

		.field-item {
			@apply mb-36px;
			@apply md:(w-1/2 px-15px);
		}

		.field-upload-photo {
			@apply before:(absolute top-0 left-30px z-1 min-w-38px h-38px flex justify-center items-center text-20px font-bold text-pink-500 bg-white rounded-b-5px);

			@variants before {
				counter-increment: field_photos;
				content: counter(field_photos);
			}
		}
	}

	.field-upload-photo {
		@apply relative flexs justify-center;

		input {
			@apply absolute top-0 left-0 z-4 w-full h-full opacity-0 cursor-pointer;

			&:hover ~ .cta-upload-photo {
				@apply text-white bg-pink-500;
			}
		}

		:global(.preview-photo) {
			@apply w-full aspect-w-3 aspect-h-2 bg-gray-350 rounded-5px overflow-hidden;
		}

		:global(.preview-photo img) {
			@apply w-full h-full;
		}

		.cta-upload-photo {
			@apply w-174px max-w-full inline-block font-bold text-16px text-center text-pink-500 p-12px mt-26px bg-pink-200 rounded-full transition duration-300;
		}
	}

	.form-group-boxradio {
		@apply items-stretch;
			@apply md:( -mx-15px -mb-25px);

		.field-item {
			@apply md:(w-1/2 px-15px mb-25px);
		}
	}

	.boxradio {
		@apply relative w-full h-full p-24px border-1 border-gray-200 rounded-10px text-16px leading-snug transition duration-300;
		@apply after:(content-a text-0px absolute top-9px right-9px w-12px h-12px border-1 border-white bg-white rounded-full shadow-gray-300 transition duration-300);

		&:after {
			box-shadow: 0 0 0 1px var(--tw-shadow-color);
		}

		&:hover, &.boxradio--selected {
			@apply border-pink-500;
		}

		&.boxradio--selected {
			@apply bg-pink-100 text-pink-500;
		}

		&.boxradio--selected:after {
			@apply bg-pink-500 shadow-pink-500;
		}

		&.boxradio-none {
			@apply flex items-center justify-center text-18px font-bold;
		}

		p+ul,
		p+ol {
			@apply mt-10px;
		}

		input {
			@apply absolute top-0 left-0 z-10 w-full h-full opacity-0;
		}

	}

	.form-group-smoker {
		@apply mt-50px;
		@apply md:(w-1/2 -mb-15px);

		label {
			@apply text-18px font-bold mb-20px px-8px;
		}

		.field-item {
			@apply md:(mb-15px);
		}

		.boxradio {
			@apply p-26px;
		}
	}

	.section-cols-group {
		@apply flexs items-start -mb-50px;
		@apply md:(-mx-35px);

		.col-group-identity {
			@apply mb-50px;
			@apply <md:(w-full);
			@apply md:(w-1/2 px-35px);

			&.col-group-identity_agreement {
				@apply w-full;
			}
		}
	}

	.field-box-agreement {
		@apply w-555px max-w-full bg-pink-100 rounded-10px;
		@apply <md:(py-30px px-20px);
		@apply md:(py-26px px-42px);

		.form-group-checkbox {
			@apply -mb-25px;
		}

		.field-item {
			@apply mb-25px;
		}
	}

</style>