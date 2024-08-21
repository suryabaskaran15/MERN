module.exports = {
  prompt: async ({ prompter, args }) => {
    console.log("Starting the generation process...");

    const fs = await import('fs').then(mod => mod.default);

    const jsonFile = args.jsonData || './default.json';

    console.log(`Using JSON file: ${jsonFile}`);

    const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    const paths = jsonData.paths;

    console.log(`Found ${Object.keys(paths).length} API endpoints.`);

    return {
      jsonData
    };
  }
};