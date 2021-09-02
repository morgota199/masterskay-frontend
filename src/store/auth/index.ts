import { defineModule } from 'direct-vuex';
import { AuthGateway } from '@/api/auth';
import { Cookies } from '~/constants/auth/cookies';
import { store } from '@/store';
import { axios } from '@/plugins/axios';
import { Role } from '~/constants/auth/role';
import cookiesClient from 'js-cookie';

interface State {
  notification: string | null;
  render: boolean;
}

export const auth = defineModule({
  namespaced: true,

  state: () => ({
    notification: null,
    render: false,
  }),

  mutations: {
    setRender(state: State, render: boolean) {
      state.render = render;
    },

    setNotification(state: State, notification: string | string[]) {
      const fullNotification =
        typeof notification === 'string'
          ? notification
          : notification.join(';') + ';';

      state.notification = fullNotification;
    },

    unsetNotification(state: State) {
      state.notification = null;
    },
  },

  actions: {
    async signUp(_, params: Record<'email' | 'password', string>) {
      const { accessToken, user } = await AuthGateway.SignUp(params);

      this.$cookies.set(Cookies.Session, accessToken);

      store.commit.user.setUser(user);
      store.commit.user.setRole(user.role);
    },

    async signIn(_, params: Record<'email' | 'password', string>) {
      const { accessToken, user } = await AuthGateway.SignIn(params);

      this.$cookies.set(Cookies.Session, accessToken);

      store.commit.user.setUser(user);
      store.commit.user.setRole(user.role);
    },

    async signOut() {
      this.$cookies.remove(Cookies.Session);
      this.$cookies.remove(Cookies.SelectedSession);

      delete axios.defaults.headers.Authorization;
      delete axios.defaults.headers.Selected;

      store.commit.user.setUser(null);
      store.commit.user.setRole(Role.User);
    },
  },
});
