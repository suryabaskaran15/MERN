module.exports = {
  prompt: async ({ prompter, args }) => {
    console.log("Starting the generation process...");

    const fs = await import("fs").then((mod) => mod.default);

    const jsonFile = args.jsonData || "./default.json";

    console.log(`Using JSON file: ${jsonFile}`);

    const jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));

    const paths = jsonData.paths;
    const models = jsonData.components.schemas;
    
    function generateType(properties, required = [], level = 0) {
      const indent = "  ".repeat(level);
      return Object.entries(properties)
        .map(([key, prop]) => {
          let type = prop.type || "any";
          if (type === "object" && prop.properties) {
            return `${indent}${key}${
              required.includes(key) ? "" : "?"
            }: { ${generateType(
              prop.properties,
              prop.required || [],
              level + 1
            )} }`;
          }if (type === "array" && prop.items) {
            return `${indent}${key}${
              required.includes(key) ? "" : "?"
            }: Array<${prop.items.$ref.replace(
              "#/components/schemas/",
              ""
            )}Model>`;
          }
            return `${indent}${key}${
              required.includes(key) ? "" : "?"
            }: ${type}`;
        })
        .join("\n");
    }
    
    console.log(`Found ${Object.keys(paths).length} API endpoints.`);
    return {
      paths,
      models,
      generateType,
    };
  },
};
