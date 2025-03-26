import { getTouristVisaReqsSpec } from "./tourist-visa-reqs";

export const api = {
  openapi: "3.0.1",
  info: {
    version: "0.1.0",
    title: "visa-reqs REST API documentation",
    description:
      "A REST API allowing users to interface with Google's Gemini to gather the visa requirements for a traveler with given passport traveling to a given destination.",
    // termsOfService: "TBD"
    contact: {
      name: "Reese Westerhoff",
      email: "reese.westerhoff@gmail.com",
      url: "https://github.com/reesewesterhoff",
    },
    license: "UNLICENSED",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
    {
      url: "TBD",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "visa-reqs",
    },
  ],
  paths: {
    "reqs/tourist": {
      get: getTouristVisaReqsSpec,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {},
  },
};
