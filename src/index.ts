import * as core from '@actions/core'
import { run } from './main'

run()
  // eslint-disable-next-line github/no-then
  .then(() => {
    core.info('Action complete')
  })
  // eslint-disable-next-line github/no-then
  .catch(error => {
    core.setFailed(error.message)
  });
