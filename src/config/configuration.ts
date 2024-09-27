export default () => ({
  port: parseInt(process.env.PORT, 10),
  mongoURI: process.env.MONGO_URI,
});
