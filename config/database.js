import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://sid:avek2386@cluster0.ecbqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
