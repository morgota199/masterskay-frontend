import { defineModule } from 'direct-vuex';
import { INotification } from '~/api/notification';

interface State {
  notifications: INotification.Model[];
}

export const notifications = defineModule({
  namespaced: true,

  state: {
    notifications: [],
  } as State,

  getters: {
    get(state: State): INotification.Model[] {
      return state.notifications;
    },
  },
});
