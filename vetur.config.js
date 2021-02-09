// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
        "vetur.experimental.templateInterpolationService": true
    },
    projects: [
        {
            root: './lide-web/',
            package: './lide-web/package.json',
            jsconfig: './lide-web/jsconfig.json',
        }
    ]
}