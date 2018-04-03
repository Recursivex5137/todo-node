const env = process.env.NODE_ENV || 'development';

const dbName = 'TodoApp';
const dbTest = 'TodoAppTest'
const dbUrl = `mongodb://localhost:27017/${dbName}`;
const dbUrlTest = `mongodb://localhost:27017/${dbTest}`
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = dbUrl;
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = dbUrlTest;
}
