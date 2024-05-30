import { glob } from 'glob'

export const getBundleIncludeFiles = async (pattern: string): Promise<string[]> => {
  return await glob(pattern, {})
}
