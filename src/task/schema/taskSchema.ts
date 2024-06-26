import mongoose from 'mongoose';

const MIN_TITLE_LENGHT: number = 5;
const MIN_DESC_LENGHT: number = 5;

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    minLenght: [MIN_TITLE_LENGHT, `Task title must be more than ${MIN_TITLE_LENGHT} lenght!`],
    require: [true, '"title" is a required field!']
  },
  description: {
    type: String,
    minLenht: [MIN_DESC_LENGHT, `Task description must be more than ${MIN_DESC_LENGHT} lenght!`],
    require: [true, '"Description" is a required field!']
  },
  date_creation: {
    type: Date,
    require: [true, '"Date" is a required field!']
  },
  date_conclusion: {
    type: Date,
    require: [true, 'Conclusion date is a required field!']
  },
  type: {
    type: String
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categoryModel'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'finished'],
    require: ['The status of the task is required!']
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  }
});

export default mongoose.model('taskModel', taskSchema);