export const config = () => ({
  databaseUrl: process.env.DATABASE_URL,
  grpcURL: process.env.GRPC_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
});
