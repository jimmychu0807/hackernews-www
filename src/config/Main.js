import * as dotenv from "dotenv"

dotenv.config();

const CONFIG = {
  default: {
  },
  development: {
    GRAPHQL_ENDPOINT: "http://localhost:3000/graphql",
  },
  production: {
    GRAPHQL_ENDPOINT: "https://jimmychu0807-hackernews-api.herokuapp.com/graphql",
  }
}

let config = Object.assign({}, CONFIG.default, CONFIG[process.env.NODE_ENV])

export default config;
