import axios, { AxiosResponse, AxiosError } from 'axios';
import { messageRenderUtils } from '../../utils';
import { t } from '../../helpers/i18n';
//import localStorageConstants from '../../constants/localStorage';
import { VITE_BACKEND_URL } from '../../helpers/env';

// const getToken = () => {
//   return localStorage.getItem(localStorageConstants.TOKEN || '');
// };

// Create an Axios client for eCommerce
const client = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
client.interceptors.request.use((config) => {
  const token =
    'eyJ0eXAiOiJCZWFyZXIiLCJhbGciOiJSUzUxMiJ9.eyJqdGkiOiI5YTYxZDYxOC1jMjgzLTRmYWUtYjM5Ni0yNmM1OTk2ZjhhMzIiLCJpYXQiOjE3NTIwMTk3OTcsImV4cCI6MTc1MjA2Mjk5NywidXNlckxhc3ROYW1lIjoiSG9hbmciLCJ0b2tlblZlcnNpb24iOjAsInVzZXJQaG9uZU51bWJlciI6IjA1MjM3Mjc2MTAiLCJ1c2VyRW1haWwiOiJsZW1pbmhob2FuZ2hjbXVzQGdtYWlsLmNvbSIsInVzZXJGaXJzdE5hbWUiOiJMZWUiLCJ1c2VyUm9sZSI6IlVTRVIiLCJ1c2VySWQiOiI1YTdjYTk2Yi02MTg1LTRmMGItYTZhZC1iMmYzYmFjZTVjMDYifQ.gZsEBmtGK6k7ejlwZ09b4httYoydB9Na4qVLOsWN1JZQy4_bfrm0SdaWQE7VSMegYwo09SmZCTel6EVJE1GnzsWBBa-erUlhlHf8-QSmuiYL1jjJLMcOTXNXKu3RO0ygrWwctXocbB3sNLBPDL_y6qvloaBk8TGQqX4rCB_jukBTsvSCNEd0Ky2ePgCT2E-d_bUHq2WwS2KQ6wIv-NyjhDk1im8BQ9oEdNCp5TNOzw63ZTkM_j3TxPDmC4TY6D30vxjQ8Op8lQoZ04xNWXX9jqWjjHREQqJ__bsPLQD9ZH4nPxp8tlzvRRZGnanQWUqkCXs_T46dB_kuUxDABgYdToRdT1dLld696Crh7598gLaqSYHp1fBqTkzoh5KE76dzS4RivJGGjbrCiiLK3I25B6RxJicnbtfzGYgH1yUNPiDTBNJkV-WZrpLUQEt-ZjXQG8aYkeecNJorHTkgKowMrvjlgOdDKTKFh2VbNzGCRkEtGwxrWzYQqtxn6MW351oRXbg9TOFeFLo8Uwgb0xY5w3qlOH-WNPl0QzpJ-0xzRx-G77dKxCNIXF5LrxFw_arQyawolsSaO8J_TVGR2vfct_72mK15mb82_TSAqkOrUHJPppizEBtGOY9i_a4T-bLxBkeiU61vuw2by1mpouPsOII8L2-ofG8xII60pYcOoEY';
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle success and errors
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage =
      (error?.response?.data as { exceptionName?: string })?.exceptionName ||
      t('error.commonError');
    messageRenderUtils.showError(errorMessage);
    return Promise.reject(error);
  }
);

export default client;
