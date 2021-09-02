import moment from 'moment-timezone';

moment.tz.setDefault('Europe/Kiev');

export class MomentHelper {
  static fromNow(date: number) {
    return moment(date).fromNow();
  }
}

export { moment };
