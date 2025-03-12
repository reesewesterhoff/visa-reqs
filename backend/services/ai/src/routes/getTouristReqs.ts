import { NextFunction, Request, Response } from "express";
import { generateContent } from "../integrations/ai";
import { BadRequestError } from "../errors";

export const getTouristReqs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { passport, destination } = req.query;
    if (!passport || !destination)
      throw new BadRequestError({
        message: "Passport country and destination country are required",
      });

    const result = await generateContent(
      `Gather the necessary travel information for a person with a passport from ${passport} traveling to ${destination} on a tourist visa.`
    );
    res.send(JSON.parse(result || ""));
  } catch (err: any) {
    console.error(`Error getting tourist visa requirements: ${err?.message}`);
    next(err);
  }
};
