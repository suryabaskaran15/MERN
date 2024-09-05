module.exports = {
  prompt: async ({ prompter, args }) => {
    console.log("Starting the generation process...");

    const fs = await import("node:fs").then((mod) => mod.default);

    const jsonFile = args.jsonData || "./default.json";

    console.log(`Using JSON file: ${jsonFile}`);

    const jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));

    const paths = jsonData.paths;
    const models = jsonData.components.schemas;

    function generateType(properties, required = [], level = 0) {
      const indent = "  ".repeat(level);
      return Object.entries(properties)
        .map(([key, prop]) => {
          const type = prop.type || "any";

          // Handle nested objects
          if (type === "object" && prop.properties) {
            return `${indent}${key}: z.object({
${generateType(prop.properties, prop.required || [], level + 1)}
${indent}})${required.includes(key) ? "" : ".optional()"}`;
          }
          if (type === "object" && !prop.properties) {
            return `${indent}${key}: z.record(z.any(), z.any())${
              required.includes(key) ? "" : ".optional()"
            }`;
          }

          // Handle arrays
          if (type === "array" && prop.items) {
            if (prop.items.$ref) {
              const refType = `${prop.items.$ref.replace(
                "#/components/schemas/",
                ""
              )}Model`;
              return `${indent}${key}: z.array(${refType})${
                required.includes(key) ? "" : ".optional()"
              }`;
            }
            if (prop.items.type === "object" && prop.items.properties) {
              return `${indent}${key}: z.array(z.object({
${generateType(prop.items.properties, prop.items.required || [], level + 2)}
${indent}}))${required.includes(key) ? "" : ".optional()"}`;
            }
            return `${indent}${key}: z.array(z.${mapZodType(
              prop.items.type
            )}())${required.includes(key) ? "" : ".optional()"}`;
          }

          // Handle primitive types (number, string, etc.)
          return `${indent}${key}: z.${mapZodType(type)}()${
            required.includes(key) ? "" : ".optional()"
          }`;
        })
        .join(",\n");
    }

    function mapZodType(type) {
      switch (type) {
        case "integer":
          return "number";
        case "boolean":
          return "boolean";
        case "string":
          return "string";
        case "number":
          return "number";
        case "object":
          return "object";
        default:
          return "any";
      }
    }

    function mapSchemaType(schema) {
      if (schema.$ref) {
        return `${schema.$ref.replace("#/components/schemas/", "")}Model`;
      }
      switch (schema.type) {
        case "integer":
        case "number":
          return "number";
        case "boolean":
          return "boolean";
        case "string":
          return "string";
        case "array":
          if (schema.items.$ref) {
            return `Array<${schema.items.$ref.replace(
              "#/components/schemas/",
              ""
            )}Model>`;
          }
          return `Array<${mapZodType(schema.items.type)}>`;
        case "object":
          return "object"; // Adjust as needed
        default:
          return "any";
      }
    }

    console.log(`Found ${Object.keys(paths).length} API endpoints.`);
    return {
      paths,
      models,
      generateType,
      mapZodType,
      mapSchemaType,
    };
  },
};
