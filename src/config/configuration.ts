export default () => ({
  nodeEnv: <string>process.env.NODE_ENV || 'development',
  port: <number>parseInt(process.env.PORT, 10) || 3001,
})
