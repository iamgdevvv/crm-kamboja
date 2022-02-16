<template>
	<header class="site-header">
		<div class="entry-header">
			<h1>Daftar Akun</h1>
			<p>Mohon isi formulir dibawah ini yang selengkap dan sebenar-benarnya</p>
		</div>
	</header>
	<main class="site-main">
		<WizardCRM />
	</main>
	<!-- <footer class="site-footer">
		<div class="entry-footer">
			<p>Sudah punya akun? <a href="/login" class="cta-login">Login</a></p>
			<p><a href="/">Kembali Ke Halaman Utama</a></p>
		</div>
	</footer> -->
</template>

<script>
	import WizardCRM from './layouts/WizardCRM.vue'

	export default {
		name: 'App',
		components: {
			WizardCRM
		}
	}
</script>

<style scoped>
	.site-header {
		@apply flex flex-col items-center mb-44px;
	}

	.entry-header {
		@apply w-420px max-w-full text-center;
	}

	.cta-login {
		@apply font-bold;
	}
</style>