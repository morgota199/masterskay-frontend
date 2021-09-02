// Dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'cookie';
import { vuexfireMutations } from 'vuexfire';
import { createDirectStore } from 'direct-vuex';

// Modules
import { auth } from './auth';
import { user } from './user';
import { loading } from './loading';
import { categories } from './categories';
import { instruments } from './instruments';
import { notifications } from './notification';
import { pushNotification } from './pushNotifications';

// Gateway
import { UserGateway } from '@/api/user';

Vue.use(Vuex);

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  actions: {
    async nuxtServerInit(_, { req, redirect }) {
      const session: string | undefined = cookie.parse(
        req.headers.cookie,
      ).session;

      const selectedSession: string | undefined = req.selectedSession;

      if (session) {
        let user = await UserGateway.GetMe();
        if (!user) return redirect('/main');

        const { role } = user;

        //       // if (selectedSession && role === Role.Admin) {
        //       //   const selectedUser = await UserGateway.GetOne(selectedSession);
        //       //   if (selectedUser) {
        //       //     user = selectedUser;
        //       //     store.commit.user.setSelected(true);
        //       //   }
        //       // }

        store.commit.user.setUser(user);
        store.commit.user.setRole(role);
      }
    },
  },
  mutations: {
    ...vuexfireMutations,
  },
  modules: {
    auth,
    user,
    loading,
    categories,
    instruments,
    notifications,
    pushNotification,
  },
});

function initStore() {
  return store.original;
}

export const storeOriginal = store.original;

// Export the direct-store instead of the classic Vuex store.
export default initStore;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
  store,
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
