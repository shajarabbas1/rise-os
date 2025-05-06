import DatabaseConfig from './db.config';

interface Config {
  database: ReturnType<typeof DatabaseConfig>;
}

export default (): Config => ({
  database: {
    ...DatabaseConfig(),
  },
});
