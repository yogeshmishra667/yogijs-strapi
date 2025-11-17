export default ({ env }) => ({
  // This will log the value or 'undefined' if not set
  myVariable: env('MY_VARIABLE_NAME', 'default-value'),
});