import axios, { AxiosResponse } from 'axios';
import { IRecipe } from '../models/recipe';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// To slow down API calls artificially for adding loading indicators
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Recipes = {
  list: (): Promise<IRecipe[]> => requests.get('/recipes'),
  details: (id: string) => requests.get(`/recipes/${id}`),
  create: (recipe: IRecipe) => requests.post('/recipes', recipe),
  update: (recipe: IRecipe) => requests.put(`/recipes/${recipe.id}`, recipe),
  delete: (id: string) => requests.del(`/recipes/${id}`),
  follow: (id: string) => requests.post(`/recipes/${id}/follow`, {}),
  unfollow: (id: string) => requests.del(`/recipes/${id}/follow`),
};

const User = {
  currentUser: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

export default {
  Recipes,
  User,
};
