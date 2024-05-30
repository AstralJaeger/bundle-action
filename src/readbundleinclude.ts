import { promises as fsp } from 'fs'

export const readBundleInclude = async (filePath: string): Promise<string[]> => {
  try {
    const fileHandle = await fsp.open(filePath)
    const fileContent = await fsp.readFile(fileHandle, 'utf8')
    if (!fileContent) {
      throw new Error(`BundleInclude file is empty: ${filePath}`)
    }

    const lines = fileContent.split('\n')
    return lines.filter(line => line.trim() !== '')
  } catch (err) {
    // @ts-expect-error should be an error here
    throw new Error(`Error reading file: ${err.message}`)
  }
}
