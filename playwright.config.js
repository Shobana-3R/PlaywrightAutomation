const { defineConfig } = require('@playwright/test');
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

    retries: 1,

    timeout: 30 * 1000,

    expect: {
        timeout: 5000
    },

    outputDir: path.join(runFolder, 'artifacts'),

    reporter: [
        ['html', {
            outputFolder: path.join(runFolder, 'report'),
            open: 'never'
        }]
    ],

    use: {

        browserName: 'chromium',

        headless: false,

        screenshot: 'on',

        video: 'on',

        trace: 'on',

        actionTimeout: 10 * 1000,

        navigationTimeout: 30 * 1000
    },

    workers: 1
});