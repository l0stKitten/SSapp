export default {
  default: {
    require: [
      'features/step_definitions/**/*.js', // Ensure this points to your step definitions
    ],
    format: [
      'progress',
      'json:reports/cucumber_report.json'
    ],
    paths: [
      'features/**/*.feature', // Ensure this points to your feature files
    ],
  },
};