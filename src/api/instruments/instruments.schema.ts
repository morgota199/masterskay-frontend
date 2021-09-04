import { API } from '~/types/global';
import { IInstruments } from './instruments.interface';

export namespace SInstruments {
  export namespace GetAll {
    export type Response = API.Response<IInstruments.Join[]>;
  }

  export namespace Delete {
    export type Request = { instrumentId: string };
    export type Response = API.Response<API.Status>;
  }
}
