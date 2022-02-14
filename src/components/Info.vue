<template>
    <div class="info-text" :class="className">
        <slot>Please read the infomration</slot>
    </div>
</template>

<script>
	export default {
		name: 'Info',
		props: {
			className: String
		},			
	}
</script>

<style scoped>
	.info-text {
		@apply relative inline-block pl-26px text-yellow-400;
		@apply before:(content-a absolute top-5px left-0 inline-block w-15px h-15px text-0px bg-no-repeat bg-contain bg-center);

		&:before {
			background-image: url(/assets/icons/icon-infoyellow.svg);
		}
	}
</style>