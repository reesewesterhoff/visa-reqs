import { badRequestError, internalServerError } from "./common";

export const getTouristVisaReqsSpec = {
  tags: ["visa-reqs"],
  description: "Get tourist visa requirements",
  operationId: "getTouristVisaReqs",
  parameters: [
    {
      name: "passport",
      in: "path",
      description: "The origin country of the traveler",
      required: true,
      type: "string",
      example: "USA",
    },
    {
      name: "destination",
      in: "path",
      description: "The destination country of the traveler",
      required: true,
      type: "string",
      example: "Russia",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "Successfully got tourist visa requirements",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              overview: {
                type: "string",
                example:
                  "Traveling from the USA to Russia requires a tourist visa.  US citizens must demonstrate sufficient funds for their trip, have a valid passport with at least six months validity remaining, and obtain an official invitation (tourist voucher) from a Russian-licensed tourist operator. Specific vaccination requirements may vary depending on individual circumstances, so it's important to consult with a healthcare professional or the CDC. Travel advisories are in place, and travelers should be aware of current political tensions and potential risks.",
              },
              passportRequirements: {
                type: "string",
                example:
                  "A valid US passport is required with at least six months of validity remaining after the intended departure date from Russia.",
              },
              vaccinationRequirements: {
                type: "string",
                example:
                  "Currently, there are official vaccination requirements for most travelers, although it is important to consult the CDC website for the most up-to-date information on recommended or required vaccinations for Russia, which can vary based on health conditions.",
              },
              process: {
                type: "array",
                items: {
                  type: "string",
                },
                example: [
                  "Obtain an official invitation (tourist voucher) from a licensed Russian tour operator or hotel.",
                  "Complete the online visa application form.",
                  "Print the completed application form and sign it.",
                  "Gather required documentation, including passport, photo, invitation, and proof of insurance or financial means.",
                  "Schedule an appointment at the nearest Russian embassy or consulate.",
                  "Attend the interview and submit your application.",
                  "Pay the required visa fee.",
                  "Collect your passport with the issued visa.",
                ],
              },
              restrictions: {
                type: "object",
                properties: {
                  entryRestrictions: {
                    type: "string",
                    example:
                      "Russia has restricted entry for certain nationalities due to ongoing geopolitical situations. Always check the latest travel advisories and entry restrictions before your trip.",
                  },
                  exitRestrictions: {
                    type: "string",
                    example:
                      "Be aware of potential exit restrictions. Always stay updated on the current political situation, which can impact exit conditions.",
                  },
                },
              },
              travelWarnings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    warningName: {
                      type: "string",
                      example: "Reconsider Travel",
                    },
                    warningSource: {
                      type: "string",
                      example: "US Department of State",
                    },
                    warningLink: {
                      type: "string",
                      example:
                        "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/russia-travel-advisory.html",
                    },
                  },
                },
              },
              miscellaneous: {
                type: "array",
                items: {
                  type: "string",
                },
                example: [
                  "Travel insurance is highly recommended.",
                  "Be aware of local laws and customs.",
                  "Register with the US embassy upon arrival in Russia.",
                ],
              },
              contactInfo: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example:
                      "Embassy of the Russian Federation in the United States of America",
                  },
                  email: {
                    type: "string",
                    example: "rusemb.usa@mid.ru",
                  },
                  phoneNumber: {
                    type: "string",
                    example: "+1-202-298-5700",
                  },
                  address: {
                    type: "string",
                    example: "2650 Wisconsin Ave., NW, Washington, DC  20007",
                  },
                },
              },
              sources: {
                type: "array",
                items: {
                  type: "string",
                },
                example: [
                  "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Russia.html",
                  "https://ru.usembassy.gov/visas/",
                  "https://www.evisa.kdmid.ru/en-US/Home/Index",
                ],
              },
            },
          },
        },
      },
    },
    "400": badRequestError,
    "500": internalServerError,
  },
};
