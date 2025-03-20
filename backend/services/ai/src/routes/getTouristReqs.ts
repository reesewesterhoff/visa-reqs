import { NextFunction, Request, Response } from "express";
import { generateContent } from "../integrations/ai";
import { BadRequestError, InternalError } from "../errors";
import { isValidJson } from "../utils/isValidJson";

// gemini occasionally appending random characters to the end of a response
// causing response to be invalid json, adding catch for that circumstance
const getResponse = (responseString: string) => {
  let response = responseString;
  if (isValidJson(responseString)) {
    response = JSON.parse(response);
  } else if (isValidJson(responseString.slice(0, responseString.length - 1))) {
    response = JSON.parse(responseString.slice(0, responseString.length - 1));
  } else {
    throw new InternalError({
      code: 500,
      message: "Error getting tourist visa requirements",
    });
  }

  return response;
};

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

    res.send(getResponse(result || ""));
  } catch (err: any) {
    console.error(`Error getting tourist visa requirements: ${err?.message}`);
    next(err);
  }
};
