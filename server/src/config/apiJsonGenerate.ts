import fs from "node:fs/promises";
import path from "node:path";
import {swaggerSpec} from "./swagger.config";

const getAPIJson = async () => {
    try {
        // Get the current working directory, which should be the project root
        const rootDir = process.cwd().replace("server","");

        // Navigate to the client/temp directory from the root
        const dir = path.join(rootDir, 'client/temp');
        const filePath = path.join(dir, 'api.json');

        console.log("File will be generated at:", filePath);

        // Ensure the directory exists
        await fs.mkdir(dir, { recursive: true });

        // Write or overwrite the file
        await fs.writeFile(filePath, JSON.stringify(swaggerSpec, null, 2));

        console.log("API JSON file written successfully.");
    } catch (error) {
        console.error("Error:", error);
    }
};

getAPIJson();
