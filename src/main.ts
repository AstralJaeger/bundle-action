import * as core from '@actions/core'
import AdmZip from 'adm-zip'
import { readBundleInclude } from './readbundleinclude'
import { getBundleIncludeFiles } from './getbundleincludefiles'
import path from 'path'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let bundleInclude: string = core.getInput('bundleInclude')
    const outputPath: string = core.getInput('bundle')

    const overrideExisting: boolean = core.getBooleanInput('overrideExisting')

    if (process.env.GITHUB_WORKSPACE != null) {
      bundleInclude = path.join(process.env.GITHUB_WORKSPACE, bundleInclude)
    }

    let fileGlobs: string[]
    try {
      core.info(`Trying to load contents of bundle include file 📄`)
      fileGlobs = await readBundleInclude(bundleInclude)
    } catch (e) {
      core.setFailed(`🔥 Could not read bundle include file 📄: ${e}`)
      return
    }
    const files = (await Promise.all(fileGlobs.map(async glob => getBundleIncludeFiles(glob)))).flat(2)

    core.info(`Found ${files.length} files 📄 to include in bundle`)

    const zip = new AdmZip()
    for (const entry of files) {
      core.debug(`Adding file 📄 to zip: ${entry}`)
      let basePath = path.dirname(entry)
      if (basePath === '.') {
        zip.addLocalFile(entry)
      } else {
        zip.addLocalFile(entry, basePath)
      }
    }
    await zip.writeZipPromise(outputPath, { overwrite: overrideExisting })
    core.info(`Wrote file 📄 to ${outputPath}`)

    // Set outputs for other workflow steps to use
    core.setOutput('bundle', '')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
