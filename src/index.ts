import * as core from '@actions/core'
import { run } from './main'

run()
  .then(() => {
    core.info('Action complete')
  })
  .catch(error => {
    core.setFailed(error.message)
  })
