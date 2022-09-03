export const sessionConfig = {
    sessionExpireTime: Number(process.env.SESSION_EXPIRE_TIME),
    sessionName: process.env.SESSION_NAME,
    sessionPrefix: process.env.SESSION_PREFIX,
    sessionSecret: process.env.SESSION_SECRET,
}