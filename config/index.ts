import dotenv from "dotenv";

dotenv.config();

export const {
      APP_URL,
      APP_PORT,
      APP_JWT_TOKEN_SECRET,
      APP_JWT_REFRESH_TOKEN_SECRET,
      APP_REFRESH_TOKEN_EXPIRES_IN,
      APP_JWT_TOKEN_EXPIRES_IN,
      DATABASE_URL,
      DEBUG_MODE
} = process.env;