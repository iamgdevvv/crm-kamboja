<template>
	<div role="dialog" class="popup" :hidden="(stateToggle === false)" :class="className" @click.self="closePopup">
		<div class="inner-popup">
			<div class="content-popup">
				<h4 class="title-content-popup">Apakah semua data sudah benar?</h4>
				<div class="action-content-popup">
					<button class="cta-cancel-popup" @click.prevent="closePopup">Belum, cek kembali</button>
					<button class="cta-submit-popup" @click.prevent="submitPopup">Ya, Kirim</button>
				</div>
			</div>
			<button class="cta-close-popup" @click.prevent="closePopup">&times;</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PopupValidate',
		props: {
			stateToggle: {
				type: Boolean,
				default: false
			},
			className: String
		},
		methods: {
			closePopup() {
				this.$emit('closePopup')
			},
			submitPopup() {
				this.$emit('submitPopup')
			}
		},
	}
</script>

<style scoped>
	.popup {
		@apply fixed top-0 left-0 z-20 px-20px flex items-center justify-center w-full h-full bg-dark-400 opacity-100 transform-gpu scale-100 transition duration-300 pointer-events-auto;
		--tw-bg-opacity: .5;

		&[hidden] {
			@apply !flex opacity-0 scale-105 pointer-events-none;
		}
		
		.inner-popup {
			@apply relative w-420px max-w-full py-32px px-24px bg-white rounded-10px;
		}

		.title-content-popup {
			@apply text-18px leading-relaxed text-center;
		}

		.action-content-popup {
			@apply flexs justify-between mt-28px;
		}

		.cta-submit-popup {
			@apply max-w-full cta-primary;
			@apply <md:(w-full);
			@apply md:(w-5/12);
		}

		.cta-cancel-popup {
			@apply cta-secondary px-10px font-bold;
			@apply <md:(w-full mb-10px);
			@apply md:(w-auto);
		}

		.cta-close-popup {
			@apply absolute top-14px right-14px z-4 w-15px h-15px flex items-center justify-center text-12px text-gray-500 font-bold border-2 border-gray-500 rounded-full;
		}
	}
</style>