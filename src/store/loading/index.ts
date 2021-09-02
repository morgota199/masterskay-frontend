import { defineModule } from 'direct-vuex';

interface State {
  render: boolean;
  loading: boolean;
  delay: ReturnType<typeof setTimeout> | null;
}

export const loading = defineModule({
  namespaced: true,
  state: (): State => {
    return {
      render: false,
      loading: false,
      delay: null,
    };
  },

  mutations: {
    setLoading(state: State, status: boolean) {
      if (!status) {
        state.delay = setTimeout(() => {
          state.loading = status;
        }, 500);
      } else {
        state.loading = status;
      }
    },

    setRender(state: State, status: boolean) {
      if (!state.render) state.render = status;
    },
  },
});
