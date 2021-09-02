import { defineModule } from 'direct-vuex';
import { IInstruments } from '~/api';

interface State {
  instruments: IInstruments.Join[];
}

export const instruments = defineModule({
  namespaced: true,

  state: (): State => ({
    instruments: [],
  }),

  mutations: {
    setInstruments(state: State, instruments: IInstruments.Join[]) {
      state.instruments = instruments;
    },
  },
});
