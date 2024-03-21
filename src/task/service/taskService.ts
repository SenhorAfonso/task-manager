// conectar com a camada de repository -> banco
class TaskService {

  static createTask() {
    return 'Create task';
  }

  static getAllTasks() {
    return 'Retrieve all Tasks';
  }

  static getSingleTask() {
    return 'Get task by id';
  }

  static updateTask() {
    return 'Update task';
  }

  static deleteTask() {
    return 'delete task';
  }

}

export default TaskService;