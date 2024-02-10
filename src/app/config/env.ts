const missing: string[] = [];

const envOrDefault = (
  env: string,
  defaultValue = '',
  required = true,
): string => {
  if (!process.env[env] && required) {
    missing.push(env);
  }

  return process.env[env] || defaultValue;
};

const nodeEnv = envOrDefault('NODE_ENV', 'development', false);
const config = {
  nodeEnv,
  server: {
    port: parseInt(envOrDefault('NODE_PORT', '3000', false), 10),
  },
};

export default config;
