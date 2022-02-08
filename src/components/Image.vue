<template>
	<figure class="figure-image" :class="className">
		<a v-if="link" :href="link" class="image-wrapper">
			<img :src="src" :alt="alt" loading="lazy" />
		</a>
		<div v-else class="image-wrapper">
			<img :src="src" :alt="alt" loading="lazy" />
		</div>
	</figure>
</template>

<script>
	export default {
		name: 'Image',
		props: {
			src: String,
			alt: String,
			link: String,
			className: String
		},
	}
</script>