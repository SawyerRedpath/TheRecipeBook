import axios, { AxiosResponse } from "axios";
import { IRecipe } from "../models/recipe";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

// To slow down API calls artificially for adding loading indicators
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Recipes = {
  list: (): Promise<IRecipe[]> => requests.get("/recipes"),
  details: (id: string) => requests.get(`/recipes/${id}`),
  create: (recipe: IRecipe) => requests.post("/recipes", recipe),
  update: (recipe: IRecipe) => requests.put(`/recipes/${recipe.id}`, recipe),
  delete: (id: string) => requests.del(`/recipes/${id}`)
};

export default {
  Recipes
};
