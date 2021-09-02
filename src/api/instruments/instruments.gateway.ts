import { axios } from '@/plugins/axios';
import { Log } from '~/utils';
import { SInstruments } from './instruments.schema';

export class InstrumentsGateway {
  static Create() {}

  static async GetAll() {
    const res: SInstruments.GetAll.Response = (await axios.get('instruments'))
      .data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }
}
