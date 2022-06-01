import { NextFunction, Request, Response } from "express";
export class ValicationError extends Error {}
export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err instanceof ValicationError ? 400 : 500).json({
    message:
      err instanceof ValicationError
        ? err.message
        : "Sorry, please try again later",
  });
};
