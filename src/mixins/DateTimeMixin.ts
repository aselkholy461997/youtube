import { Component, Vue } from 'vue-property-decorator';

@Component
class DateTimeMixin extends Vue {
  private toFloor(value: number) {
    return Math.floor(value);
  }

  public calculateUploadDate(uploadDate: string) {
    const youtubeDateFormat = new Date(Date.now());
    if (uploadDate === 'Last hour') youtubeDateFormat.setMinutes(0, 0, 0);
    else if (uploadDate === 'Today') youtubeDateFormat.setHours(0, 0, 0, 0);
    else if (uploadDate === 'This week') {
      const firstDay = youtubeDateFormat.getDate() - youtubeDateFormat.getDay();
      youtubeDateFormat.setDate(firstDay);
      youtubeDateFormat.setHours(0, 0, 0, 0);
    } else if (uploadDate === 'This month') {
      youtubeDateFormat.setMonth(youtubeDateFormat.getMonth(), 1);
      youtubeDateFormat.setHours(0, 0, 0, 0);
    } else {
      youtubeDateFormat.setMonth(0, 1);
      youtubeDateFormat.setHours(0, 0, 0, 0);
    }
    return youtubeDateFormat.toISOString();
  }

  public calculatePublishedAtDate(publishedAt: string) {
    const dateNow = new Date(Date.now());
    const publishedAtDate = new Date(Date.parse(publishedAt));
    const difference = this.toFloor((dateNow.getTime() - publishedAtDate.getTime()) / 1000); // Get the difference in seconds
    let result = '';

    // Seconds
    if (difference < 60) {
      // 1 second
      if (difference === 1) result = this.toFloor(difference) + ' Second';
      // More than 1 second
      else result = this.toFloor(difference) + ' Seconds';
    }
    // Minutes
    else if (difference < 60 * 60) {
      if (this.toFloor(difference / 60) === 1) result = this.toFloor(difference / 60) + ' Minute';
      else result = this.toFloor(difference / 60) + ' Minutes';
    }
    // Hours
    else if (difference < 24 * 60 * 60) {
      if (this.toFloor(difference / (60 * 60)) === 1) result = this.toFloor(difference / (60 * 60)) + ' Hour';
      else result = this.toFloor(difference / (60 * 60)) + ' Hours';
    }
    // Days
    else if (difference < 30 * 24 * 60 * 60) {
      if (this.toFloor(difference / (24 * 60 * 60)) === 1) result = this.toFloor(difference / (24 * 60 * 60)) + ' Day';
      else result = this.toFloor(difference / (24 * 60 * 60)) + ' Days';
    }
    // Months
    else if (difference < 365 * 24 * 60 * 60) {
      if (this.toFloor(difference / (30 * 24 * 60 * 60)) === 1)
        result = this.toFloor(difference / (30 * 24 * 60 * 60)) + ' Month';
      else result = this.toFloor(difference / (30 * 24 * 60 * 60)) + ' Months';
    }
    // Years
    else {
      if (this.toFloor(difference / (365 * 24 * 60 * 60)) === 1)
        result = this.toFloor(difference / (365 * 24 * 60 * 60)) + ' Year';
      else result = this.toFloor(difference / (365 * 24 * 60 * 60)) + ' Years';
    }

    return result + ' ago';
  }
}
export default DateTimeMixin;
