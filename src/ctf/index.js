'use strict';

const fs = require('fs');
const path = require('path');

const CASES = [];
const CASES_PATH = __dirname + '/cases';
const FLAGS_PATH = __dirname + '/flags';

fs.readdirSync(CASES_PATH).forEach((file) => {
    if (file.endsWith('.test.js')) {
        return;
    }
    CASES.push({
        id: 'case_' + path.basename(file),
        fn: require(CASES_PATH + '/' + file),
    })
});

fs.readdirSync(FLAGS_PATH).forEach((file) => {
    if (file.endsWith('.test.js')) {
        return;
    }
    CASES.push({
        id: 'flag_' + path.basename(file),
        fn: require(FLAGS_PATH + '/' + file),
    })
});

module.exports = (req) => {
    return CASES
        .filter((testCase) => {
            try {
                return testCase.fn(req);
            } catch (e) {
                return false;
            }
        })
        .map((testCase) => testCase.id);
};
