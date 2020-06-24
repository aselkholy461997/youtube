import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
class VideoInfoMixin extends Vue {
  private padTime(t: number) {
    return t < 10 ? '0' + t : t;
  }

  public calculateViews(value: string) {
    const views = Number(value);
    if (value.length <= 3) return String(views);
    else if (value.length <= 6) return (views / Math.pow(10, 3)).toFixed(1) + 'K';
    else if (value.length <= 9) return (views / Math.pow(10, 6)).toFixed(1) + 'M';
    else if (value.length <= 12) return (views / Math.pow(10, 9)).toFixed(1) + 'B';
    else return (views / Math.pow(10, 12)).toFixed(1) + 'T';
  }

  public calculateDuration(value: string) {
    const duration = moment.duration(value);

    let hours = 0;
    if (duration.days() > 0) hours += duration.days() * 24;
    if (duration.hours() > 0) hours += duration.hours();

    if (hours > 0)
      return this.padTime(hours) + ':' + this.padTime(duration.minutes()) + ':' + this.padTime(duration.seconds());
    else return this.padTime(duration.minutes()) + ':' + this.padTime(duration.seconds());
  }
}
export default VideoInfoMixin;
