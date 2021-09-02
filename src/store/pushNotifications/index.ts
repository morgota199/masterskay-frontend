import { defineModule } from 'direct-vuex';
import { IPushNotification } from '@/components/ui/PushNotification/interfaces';

export interface State {
  notification: IPushNotification.Model;
  visible: boolean;
  close: ReturnType<typeof setTimeout> | null;
}

function clearNotification(state: State) {
  state.notification = {
    text: '',
    type: '',
  };
  state.visible = false;
  state.close = null;
}

export const pushNotification = defineModule({
  namespaced: true,

  state: (): State => {
    return {
      notification: {
        text: '',
        type: '',
      },
      visible: false,
      close: null,
    };
  },

  mutations: {
    set(state: State, notification: IPushNotification.Model) {
      state.notification = notification;
      state.visible = true;

      if (state.close) clearTimeout(state.close);

      state.close = setTimeout(() => {
        clearNotification(state);
      }, 15000);
    },

    unset(state: State) {
      clearNotification(state);
    },
  },
});
