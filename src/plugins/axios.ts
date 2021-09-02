import cookie from 'cookie';
import cookiesClient from 'js-cookie';
import { Plugin } from '@nuxt/types';
import axiosOriginal, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Cookies } from '~/constants/auth/cookies';
import { Project } from '~/constants/project';

const axiosOptions: AxiosRequestConfig = {
  baseURL: Project.Api.Url,
  headers: {},
};
const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

const AxiosPlugin: Plugin = context => {
  if (process.server) {
    const cookieOriginal = context.req.headers.cookie;

    if (cookieOriginal) {
      const cookieParsed: Record<string, string> = cookie.parse(cookieOriginal);

      const session = cookieParsed[Cookies.Session];
      const selectedSession = cookieParsed[Cookies.SelectedSession];

      if (session) axios.defaults.headers.Authorization = session;
      if (selectedSession) axios.defaults.headers.Selected = selectedSession;
    }
  }

  axios.interceptors.request.use(
    config => {
      const session = cookiesClient.get(Cookies.Session);
      const selectedSession = cookiesClient.get(Cookies.SelectedSession);

      if (session) config.headers.Authorization = session;
      if (selectedSession) config.headers.Selected = selectedSession;

      return config;
    },
    error => {
      throw error;
    },
  );
};

export { axios };

export default AxiosPlugin;
