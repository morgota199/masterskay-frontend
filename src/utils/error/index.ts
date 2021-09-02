import { store } from '@/store';
import { API } from '@/types/global';

export function Error(error: Error | API.Error, push?: boolean) {
  if (process.client) {
    if (push)
      store.commit.pushNotification.set({
        text: error.message,
        type: 'danger',
      });

    throw console.error(error);
  } else {
    console.error(error);
  }
}

export const Log = { Error };
