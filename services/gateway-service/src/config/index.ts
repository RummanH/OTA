export const config = () => ({
  serverPort: Number(process.env.SERVER_PORT) || 3000,
  userServiceName: process.env.USER_SERVICE_NAME || 'UserService',
});
