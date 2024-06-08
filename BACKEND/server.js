const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection success!');
});

app.use(cors(corsOptions));


app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
