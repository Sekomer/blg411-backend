import express, { Request, Response, Router } from "express";

export const utilRouter: Router = express.Router();

utilRouter.get("/health-check", (req: Request, res: Response) => {
  console.log("[Health-Check 200] =>", Date().toLocaleUpperCase());
  return res.sendStatus(200);
});
