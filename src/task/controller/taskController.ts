import { Response, Request } from 'express';

class TaskController {

  static CreateTask (
    req: Request,
    res: Response
  ) {
    res.send('Create task');
  }

  static getTasks (
    req: Request,
    res: Response
  ) {
    res.send('Retrieve all Tasks');
  }

  static getSingleTask (
    req: Request,
    res: Response
  ) {
    res.send('Get Task by Id');
  }

  static updateTask (
    req: Request,
    res: Response
  ) {
    res.send('Update Task');
  }

  static deleteTask (
    req: Request,
    res: Response
  ) {
    res.send('Delete task');
  }

}

export default TaskController;