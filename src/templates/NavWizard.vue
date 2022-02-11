<template>
    <nav v-if="datawizard.length" class="nav-wizard" :class="className">
		<ul class="nav-wizard__list">
			<li v-for="wizard in datawizard" :key="wizard.id" class="nav-wizard__item" :class="{ 'wizard__active':wizard.isActive, 'wizard__hide':wizard.hideNav }">
				<button class="nav-wizard__button" @click="navStep(wizard)">
					<span class="nav-wizard__button-icon">{{ wizard.navIcon }}</span>
					<span class="nav-wizard__button-label">{{ wizard.navLabel }}</span>
				</button>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'NavWizard',
		props: {
			datawizard: Array,
			className: String
		},
		methods: {
			navStep(wizard) {
				this.$emit( "step", wizard );
			}
		}
	}
</script>

<style scoped>
	.nav-wizard__list {
		@apply relative overflow-hidden flex items-start w-680px max-w-full mx-auto list-none pl-0;
	}

	.nav-wizard__item {
		@apply relative mt-0 flexs justify-center;
		@apply first:(before:hidden after:hidden) before:bg-gray-300 after:(bg-green-400 w-full);

		&.wizard__hide {
			@apply hidden;

			+ .nav-wizard__item:before, + .nav-wizard__item:after {
				@apply hidden;
			}
		}

		&:after {
			@apply right-3/2 origin-right;
			transform: scale(-1, 1);
		}
	}

	@variants before, after {
		.nav-wizard__item {
			@apply content-a absolute top-24px right-1/2 z-1 w-full h-3px text-0px transition-all duration-800;
		}
	}

	.nav-wizard__item.wizard__active ~ .nav-wizard__item {
		@apply after:(w-0);

		.nav-wizard__button-label {
			@apply text-gray-300;
		}

		.nav-wizard__button-icon {
			@apply text-18px bg-white border-gray-300 text-gray-300;
		}
	}

	.nav-wizard__button {
		@apply relative z-2 flex flex-col items-center;

		.nav-wizard__button-icon {
			@apply flexs justify-center text-0px font-bold text-white leading-none w-51px h-51px border-2 rounded-full bg-center bg-no-repeat border-green-400 bg-green-400 transition duration-300;
			background-size: 22px auto, contain;
			background-image: url(/assets/icons/icon-checkwhite-thick.svg);
		}

		.nav-wizard__button-label {
			@apply inline-block mt-8px text-dark-400 capitalize transition duration-300;
		}
	}

	.wizard__active .nav-wizard__button {

		.nav-wizard__button-icon {
			@apply text-18px bg-white text-green-400 border-green-400;
		}

		.nav-wizard__button-label {
			@apply text-green-400;
		}
	}
</style>