import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import serverConfig from '../../config/config';

const MIN_USERNAME_LENGHT = 5;

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    minLenght: [MIN_USERNAME_LENGHT, `The username needs to be at least ${MIN_USERNAME_LENGHT} characters lenght!`],
    require: [true, 'User name is a required field!'],
    trim: true
  },
  weight: {
    type: Number,
    min: [0, 'The weight must be greater than 0!'],
    require: [true, 'Weight is a required field!']
  },
  email: {
    type: String,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    require: [true, 'User email is a required field!'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    match: [/^[a-zA-Z0-9]{6,30}$/, 'Please fill a valid password'],
    require: [true, 'User password is required.'],
    trim: true
  },

});

userSchema.pre('save', async function() {
  const salt: string = serverConfig.BCRYPT_SALT!;
  this.password = await bcrypt.hash(this.password!, salt);
});

export default mongoose.model('userModel', userSchema);