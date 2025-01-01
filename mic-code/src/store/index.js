import { createPinia } from "pinia";

export const setupStore = (app) => {
  const pinia = createPinia();
  app.use(pinia);
};
