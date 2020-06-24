<template>
  <div class="loading-bar">
    <div class="progress-bar">
      <span class="bar">
        <span class="progress"></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadingBar extends Vue {}
</script>

<style scoped lang="scss">
.progress-bar {
  overflow: hidden;
  width: 100%;

  span {
    display: block;
  }
}

.bar {
  background: rgba(0, 0, 0, 0.075);
}

.progress {
  animation: loader 0.3s ease forwards;
  // Change the animation fill mode 'infinite' to 'forwards' to stop the animation from repeating.
  background: red;
  color: #fff;
  padding: 2px;
  width: 0;
}

// Animation =============================================
@keyframes loader {
  0% {
    width: 0;
  }

  20% {
    width: 10%;
  }

  25% {
    width: 24%;
  }

  43% {
    width: 41%;
  }

  56% {
    width: 50%;
  }

  66% {
    width: 52%;
  }

  71% {
    width: 60%;
  }

  75% {
    width: 76%;
  }

  94% {
    width: 86%;
  }

  100% {
    width: 100%;
  }
}
</style>
