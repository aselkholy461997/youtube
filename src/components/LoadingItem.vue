<template>
  <div class="loading-item" v-if="loadingStatus">
    <div class="progress-bar">
      <span class="bar">
        <span class="progress"></span>
      </span>
    </div>
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import store from '@/store';

@Component
export default class LoadingItem extends Vue {
  get loadingStatus(): boolean {
    return store.state.isLoading;
  }
}
</script>

<style scoped lang="scss">
// Bar ============================================
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

// Ring ============================================

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: red;
    stroke-linecap: round;
    animation: dash 1s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

// .progress-ring {
//   display: inline-block;
//   position: relative;
//   width: 80px;
//   height: 80px;
// }

// .progress-ring div {
//   box-sizing: border-box;
//   display: block;
//   position: absolute;
//   width: 64px;
//   height: 64px;
//   margin: 8px;
//   border: 8px solid #fff;
//   border-radius: 50%;
//   animation: progress-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//   border-color: #fff transparent transparent transparent;
// }

// .progress-ring div:nth-child(1) {
//   animation-delay: -0.45s;
// }

// .progress-ring div:nth-child(2) {
//   animation-delay: -0.3s;
// }

// .progress-ring div:nth-child(3) {
//   animation-delay: -0.15s;
// }

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

// @keyframes progress-ring {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>
