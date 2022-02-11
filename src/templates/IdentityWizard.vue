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
							<input type="text" />
						</div>
						<div class="field-item field-body-height">
							<label>Tinggi Badan <span class="icon-required">*</span></label>
							<input type="number" />
						</div>
						<div class="field-item field-body-weight">
							<label>Berat Badan <span class="icon-required">*</span></label>
							<input type="number" />
						</div>
						<div class="field-item">
							<label>No KTP (NIK) <span class="icon-required">*</span></label>
							<input type="number" />
						</div>
						<div class="field-item field-email">
							<label>Email <span class="icon-required">*</span></label>
							<input type="email" />
						</div>
						<div class="field-item field-tel-phone">
							<label>No.Handphone <span class="icon-required">*</span></label>
							<input type="tel" />
						</div>
					</div>
				</div>
			</section>
			<section class="section-identity section-photo-identity">
				<div class="header-section-identity">
					<i class="icon-section-identity">2</i>
					<h3 class="title-section-identity">Upload Foto Identitas</h3>
				</div>
			</section>
		</article>
		<aside class="wizard-sidebar">
			<span class="info-personal">Data pribadi Anda disimpan sesuai dengan undang-undang negara</span>
			<BoxPackage className="box-sidebar" :package="choosenPackage" :wizard="datawizard" @prev="prevWizard" @submit="submitPackage" />
		</aside>
	</section>
</template>


<script>
	import BoxPackage from '../components/BoxPackage.vue'

	export default {
		name: 'IdentityWizard',
		props: {
			datawizard: Object,
			className: String
		},
		components: {
			BoxPackage
		},
		data() {
			return {
				form_identity: {
					your_name: '',
					your_height: '',
					your_weight: '',
				},
			}
		},
		methods: {
			prevWizard() {
				this.$emit('stepPrev', this.datawizard)
			},
			submitPackage() {
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
		@apply pr-30px;
	}

	.section-identity {
		@apply not-first:pt-48px;
		@apply not-last:(border-b border-gray-300 pb-48px)
	}

	.section-info-identity {
		@apply pr-225px;
	}

	.header-section-identity {
		@apply relative pt-18px pl-80px mb-48px;

		.icon-section-identity {
			@apply absolute top-0 left-0 flexs-center w-60px h-60px text-25px font-bold not-italic text-white rounded-full bg-fuchsia-600;
		}
		
		.title-section-identity {
			@apply line-clamp-1;
		}
	}

	.field-body-height,
	.field-body-weight {
		@apply w-2/5;
	}

	.field-email {
		@apply w-7/12;
	}

	.field-tel-phone {
		@apply w-5/12;
	}

</style>