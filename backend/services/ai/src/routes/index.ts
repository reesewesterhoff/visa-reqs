import { Router } from "express";
import { getTouristReqs } from "./getTouristReqs";

export const routes = (router: Router) => {
  router.get("/reqs/tourist", (req, res, next) =>
    getTouristReqs(req, res, next)
  );
};
