<template>
  <div class="loading-spinner">
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadingSpinner extends Vue {}
</script>

<style scoped lang="scss">
.loading-spinner {
  position: relative;
  width: 100%;
  height: 100%;
  display: contents;
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // margin: -25px 0 0 -25px;
  // width: 50px;
  // height: 50px;
  height: 100%;
  max-width: 5rem;
  max-height: 5rem;

  & .path {
    stroke: red;
    stroke-linecap: round;
    animation: dash 1s ease-in-out infinite;
  }
}

// Animation =============================================
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

// @keyframes progress-ring {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>
