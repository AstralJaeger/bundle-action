import {promises as fsp} from 'fs';
import {error} from "@actions/core";



export const readBundleInclude = async (filePath: string): Promise<string[]> => {

    try {
        const fileHandle = await fsp.open(filePath);
        const fileContent = await fsp.readFile(fileHandle, 'utf8');
        if (!fileContent) {
            throw new Error(`BundleInclude file is empty: ${filePath}`);
        }

        const lines = fileContent.split('\n');
        return lines.filter(line => line.trim() !== '');
    } catch (e: any) {
        throw new Error(`Error reading file: ${e.message}`);
    }
}