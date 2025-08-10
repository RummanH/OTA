export const config = () => ({
  databaseURL: process.env.DATABASE_URL || 'postgresql://postgres.fzydeenysglmqmwoxdhg:rumman103@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  grpcUrl: process.env.GRPC_URL || 'localhost:5000',
  jwtAccessTokenExp: process.env.JWT_ACCESS_TOKEN_EXP || '15m',
  jwtRefreshTokenExp: process.env.JWT_REFRESH_TOKEN_EXP || '7d',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'c515858e5d3accaa691d8179e505448946523614d138fbeeecae5e43cda72684',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'c515858e5d3accaa691d8179e505448946523614d138fbeeecae5e43cda72684',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  userServiceName: process.env.USER_SERVICE_NAME || 'UserService',
  usersRepository: process.env.USERS_REPOSITORY || 'UserRepository',
});
