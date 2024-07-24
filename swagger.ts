import swaggerUi from "swagger-ui-express";
import swaggerDefinitions from "./swagger-definitions";

const options = {
    definition: swaggerDefinitions,
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerDefinitions;

export { specs, swaggerUi };
