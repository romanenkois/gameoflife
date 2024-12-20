<template>
  <GameComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameComponent from './components/GameComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    GameComponent
  }
});
</script>

<style src="./App.scss" lang="scss">
</style>
