export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  auth: {
    mobile_login_attempt: process.env.MOBILE_LOGIN_ATTEMPT,
  },
  smsToken: {
    base_path: process.env.SMS_TOKEN_PATH,
    key: process.env.SMS_TOKEN_KEY,
  },
  sendGrid: {
    key: process.env.SENDGRID_KEY,
    from: process.env.SENDGRID_FROM,
  },
  pagarme: {
    token: process.env.PAGARME_TOKEN_ENCODED,
  },
});
