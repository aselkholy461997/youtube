<template>
  <div class="video-item">
    <div class="img-container">
      <img @click="goToDetails" src="../assets/desktop-logo.png" />
      <p class="duration"> 06:30 </p>
    </div>
    <div class="details-container">
      <h3 @click="goToDetails">
        Spongebob
      </h3>
      <p>njadfsbf</p>
      <p>njadfsbf</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeadBar extends Vue {
  public videoId = 0;

  public goToSearch (): void {
    // with query, resulting in /register?plan=private
    this.$router.push({ path: '/details', params: { videoId: this.videoId.toString() } });
  }
}
</script>

<style scoped lang="scss">
  .img-container {
  position: relative;
  text-align: center;
  color: white;

    .duration {
    position: absolute;
    bottom: 8px;
    right: 16px;
    }
  }
</style>
