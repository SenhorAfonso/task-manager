import mongoose from 'mongoose';

const MIN_NAME_LENGHT: number = 5;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    min: [MIN_NAME_LENGHT, `Category name must be at least ${MIN_NAME_LENGHT} characteres lenght!`],
    require: [true, 'Name is a required field!']
  },
  color: {
    type: String,
    enum: ['Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Gray', 'Cyan', 'Blue'],
    require: [true, 'Color is a required field!']
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'userModel'
  }
});

export default mongoose.model('categoryModel', categorySchema);