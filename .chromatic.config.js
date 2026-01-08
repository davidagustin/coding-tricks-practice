module.exports = {
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,
  buildScriptName: 'chromatic:build',
  onlyChanged: true,
  exitZeroOnChanges: true,
  exitOnceUploaded: true,
};
