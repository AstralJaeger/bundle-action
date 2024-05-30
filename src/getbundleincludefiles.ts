import { glob } from 'glob'

export const getBundleIncludeFiles = async (pattern: string): Promise<string[]> => {
  return await glob(pattern, {
    cwd: process.env.GITHUB_WORKSPACE
  })
}
