// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
        "vetur.experimental.templateInterpolationService": true
    },
    projects: [
        {
            root: './lide-web/',
            package: './package.json',
            jsconfig: './jsconfig.json',
        }
    ]
}