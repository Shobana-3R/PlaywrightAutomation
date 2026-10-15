const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const now = new Date();

const date = now.toISOString().split('T')[0];

const time = now.toTimeString()
    .split(' ')[0]
    .replace(/:/g, '-');

const runFolder = path.join(
    'test-results',
    date,
    time
);

module.exports = defineConfig({

    testDir: './tests',

    testMatch: '**/*.spec.js',

    retries: 0,

    timeout: 30 * 1000,

    expect: {
        timeout: 5000
    },

    outputDir: path.join(runFolder, 'artifacts'),

    reporter: [
        ['html', {
            outputFolder: path.join(runFolder, 'report'),
            open: 'never',
        }]
    ],
    projects: [
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                video: 'on',
                trace: 'on',
                actionTimeout: 10 * 1000,
                navigationTimeout: 30 * 1000,
                ...devices['iPhone 11']
            }
        },
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'off',
                video: 'on',
                trace: 'off',
                actionTimeout: 10 * 1000,
                navigationTimeout: 30 * 1000,
                ignoreHttpsErrors: true,
                permissions:['geolocation'],
                //...devices['']
                //viewport : {width:720,height:720}
            }
        }
    ],

    workers: 3
});