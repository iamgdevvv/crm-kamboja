<template>
	<NavWizard :datawizard="wizards" @step="wizardNav" />
	<form v-if="wizards.length" class="entry-wizard-wrapper">
		<BirthWizard :datawizard="wizards[0]" :className="{ 'entry-wizard__active':wizards[0].isActive }" @step="wizardStep" />
		<PackageWizard default-package="paket-aman" :datawizard="wizards[1]" :className="{ 'entry-wizard__active':wizards[1].isActive }" @step="wizardStep" @stepPrev="wizardStepPrev" />
		<IdentityWizard :datawizard="wizards[2]" :className="{ 'entry-wizard__active':wizards[2].isActive }" @step="wizardStep" @stepPrev="wizardStepPrev" />
		<SuccessWizard :datawizard="wizards[3]" :className="{ 'entry-wizard__active':wizards[3].isActive }" @step="wizardStep" />
	</form>
</template>

<script>
	import NavWizard from '../templates/NavWizard.vue'
	import BirthWizard from '../templates/BirthWizard.vue'
	import PackageWizard from '../templates/PackageWizard.vue'
	import IdentityWizard from '../templates/IdentityWizard.vue'
	import SuccessWizard from '../templates/SuccessWizard.vue'

	export default {
		name: 'WizardCRM',
		components: {
			NavWizard,
			BirthWizard,
			IdentityWizard,
			PackageWizard,
			SuccessWizard
		},
		data() {
			return {
				wizards: [
					{
						id: 0,
						hideNav: false,
						navIcon: '1',
						navLabel: 'usia',
						isActive: true,
						isDone: false
					},
					{
						id: 1,
						hideNav: false,
						navIcon: '2',
						navLabel: 'pilih paket',
						isActive: false,
						isDone: false
					},
					{
						id: 2,
						hideNav: false,
						navIcon: '3',
						navLabel: 'data diri',
						isActive: false,
						isDone: false
					},
					{
						id: 3,
						hideNav: true,
						navIcon: '4',
						navLabel: 'thank you',
						isActive: false,
						isDone: false
					},
				],
				data_crm: {}
			}
		},
		methods: {
			wizardNav(step) {
				window.scrollTo(0,0)

				const wizardCurrent = this.wizards.find(wizard => wizard.isActive)

				if( step.id > wizardCurrent.id ) {
					return wizardCurrent.isDone
				}

				this.wizards.forEach(wizard => {
					if( wizard.id !== step.id ) {
						wizard.isActive = false
					} else {
						wizard.isActive = true
					}
				})
			},
			wizardStepPrev(step) {
				window.scrollTo(0,0)
				this.wizards[step.id].isActive = false
				this.wizards[step.id - 1].isActive = true
			},
			wizardStep(step) {
				window.scrollTo(0,0)
				this.wizards[step.id].isDone = true
				this.wizards[step.id].isActive = false
				this.wizards[step.id + 1].isActive = true
				console.log(this.wizards)
			}
		},
	}
</script>

<style>
	.entry-wizard {
		@apply absolute top-0 left-0 w-full opacity-0 invisible pointer-events-none transform-gpu scale-0;
		transition: opacity .6s;

		&.entry-wizard__active {
			@apply static opacity-100 visible pointer-events-auto scale-100;
		}
	}
</style>

<style scoped>
	.entry-wizard-wrapper {
		@apply relative overflow-visible w-full mt-50px;
		min-height: 50vh;
	}

	:deep(.header-wizard-content) {
		@apply w-full text-14px leading-relaxed;
	}

	:deep(.title-wizard-content) {
		@apply mb-8px;
	}

	:deep(.entry-wizard) {
		@apply flexs items-stretch;		
	}

	:deep(.wizard-content) {
		width: calc(100% - 360px);
		@apply <xl:(w-full);
	}

	:deep(.wizard-sidebar) {
		@apply <xl:(w-full mt-40px);
		@apply xl:(w-360px);
	}

	:deep(.box-sidebar) {
		@apply w-full border border-gray-300 rounded-10px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}
	
	:deep(.cta-prev-wizard) {
		@apply cta-secondary cta-iconleft;
	}

	:deep(.cta-prev-wizard:after) {
		background-image: url(/assets/icons/icon-chevronblack-left.svg);
	}

	:deep(.cta-submit-wizard) {
		@apply cta-primary cta-iconright;
	}

	:deep(.cta-submit-wizard:after) {
		background-image: url(/assets/icons/icon-chevronwhite-right.svg);
	}

	:deep(.cta-submit-wizard[disabled]) {
		@apply border-gray-200 bg-gray-200 text-gray-500 cursor-not-allowed;
	}

	:deep(.cta-submit-wizard[disabled]:after) {
		@apply translate-x-0;
		background-image: url(/assets/icons/icon-chevrongray500-right.svg);
	}
</style>