<template>
	<NavWizard :datawizard="wizards" @step="wizardNav" />
	<Form v-if="wizards.length" class="entry-wizard-wrapper">
		<BirthWizard :datawizard="wizards[0]" :className="{ 'entry-wizard__active':wizards[0].isActive }" @step="wizardStep" />
		<PackageWizard :datawizard="wizards[1]" :className="{ 'entry-wizard__active':wizards[1].isActive }" @step="wizardStep" @stepPrev="wizardStepPrev" />
		<IdentityWizard :datawizard="wizards[2]" :className="{ 'entry-wizard__active':wizards[2].isActive }" @step="wizardStep" @stepPrev="wizardStepPrev" />
		<SuccessWizard :datawizard="wizards[3]" :className="{ 'entry-wizard__active':wizards[3].isActive }" @step="wizardStep" />
	</Form>
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
				this.wizards[step.id].isActive = false
				this.wizards[step.id - 1].isActive = true
			},
			wizardStep(step) {
				this.wizards[step.id].isDone = true
				this.wizards[step.id].isActive = false
				this.wizards[step.id + 1].isActive = true
			}
		},
	}
</script>

<style scoped>
	.entry-wizard-wrapper {
		@apply relative w-full mt-50px;
	}
	:deep(.entry-wizard) {
		@apply absolute top-0 left-0 w-full opacity-0 visibility-hidden pointer-events-none transform-gpu translate-y-12 transition duration-600;

		&.entry-wizard__active {
			@apply static opacity-100 visibility-visible pointer-events-auto translate-y-0;
		}
	}

	:deep(.header-wizard-content) {
		@apply w-full text-14px leading-relaxed;
	}

	:deep(.title-wizard-content) {
		@apply mb-8px;
	}

	:deep(.entry-wizard) {
		@apply flexs items-start;		
	}

	:deep(.wizard-content) {
		width: calc(100% - 360px);
	}

	:deep(.wizard-sidebar) {
		@apply w-360px;
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

	:deep(.cta-submit-wizard.prevent-submit) {
		@apply border-gray-200 bg-gray-200 text-gray-500 cursor-not-allowed;
	}

	:deep(.cta-submit-wizard.prevent-submit:after) {
		@apply translate-x-0;
		background-image: url(/assets/icons/icon-chevrongray500-right.svg);
	}
</style>