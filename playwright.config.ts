import { defineConfig } from '@playwright/test'
import { getPlaywrightConfig } from './src/playwrightConfig'
import * as dotenv from 'dotenv'

dotenv.config({ path: './env/.env' })
dotenv.config({ path: './env/' + process.env.TEST_ENVIRONMENT + '/.env' })

export default defineConfig(getPlaywrightConfig({ testDir: './tests', baseURL: '', webServerEnable: false }))
