import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';
import IUpdateTask from '../DTOs/updateTask';
import ITaskId from '../DTOs/ITaskId';
import IQuerySearch from '../interface/IQuerySearch';
import APIUtils from '../../utils/APIUtils';
import taskDocument from '../interface/taskDocument';

class TaskService {

  static createTask(createTaskPayload: createTask) {
    const now = new Date();
    const conclusion = new Date(now.getTime() + (1000 * 60 * 60 * 24 * 30));

    createTaskPayload.date_creation = now;
    createTaskPayload.date_conclusion = conclusion;

    const result = TaskRepository.createTask(createTaskPayload);
    return result;
  }

  static getAllTasks(userID: string) {
    const result = TaskRepository.getAllTasks(userID);
    return result;
  }

  static async getAllTasksByArray(userID: string, query: IQuerySearch) {
    const queryObject = APIUtils.createQueryObject(query);

    let { success, status, message, result } = await TaskRepository.getAllTasks(userID);

    if (queryObject.category) {
      result = await TaskService.getTaskByCategory(queryObject.category, result);
    }

    if (queryObject.status) {
      result = TaskService.getTaskByStatus(queryObject.status, result);
    }

    if (queryObject.conclusion) {
      result = TaskService.getTaskByDate(queryObject.conclusion, result);
    }

    return { success, status, message, result };
  }

  static async getTasksInfo(userID: string) {
    let { success, status, message, result } = await TaskRepository.getAllTasks(userID);

    const finishedTasks = this.getTaskByStatus('finished', result);
    const longestDescription = this.LongestDescription(result);
    const oldestTask = this.getOldestTask(result);

    return {
      success,
      status,
      message,
      result: {
        number_of_tasks: result.length,
        conclusion_avg: Number((finishedTasks.length / result.length).toFixed(2)),
        longest_description: {
          id: longestDescription.id,
          title: longestDescription.title,
          describe: longestDescription.description,
          category: longestDescription.categoryID,
          type: longestDescription.type,
          status: longestDescription.status
        },
        oldest_task: {
          id: oldestTask.id,
          title: oldestTask.title,
          describe: oldestTask.description,
          category: oldestTask.categoryID,
          type: oldestTask.type,
          status: oldestTask.status
        },
      }
    };
  }

  static async aggregateTask(userID: string) {
    const result  = await TaskRepository.aggregateTaskByCategory(userID);
    return result;
  }

  static getSingleTask(taskId: ITaskId, userID: string) {
    const result = TaskRepository.getSingleTask(taskId, userID);
    return result;
  }

  static updateTask(taskId: ITaskId, newTaskInfo: IUpdateTask, userID: string) {
    const result = TaskRepository.updateTask(taskId, newTaskInfo, userID);
    return result;
  }

  static deleteTask(taskId: ITaskId, userID: string) {
    const result = TaskRepository.deleteTask(taskId, userID);
    return result;
  }

  static async getTaskByCategory(categoryName: string, taskArray: taskDocument[]): Promise<taskDocument[]> {
    const categoryID = await TaskRepository.getCategoryID(categoryName);
    const filteredArray: taskDocument[] = [];

    taskArray.forEach(element => {
      if (element.categoryID.toString() === categoryID) {
        filteredArray.push(element);
      }
    });

    return filteredArray;
  }

  static getTaskByStatus(status: string, taskArray: taskDocument[]): taskDocument[] {
    const filter = APIUtils.createCustomFilter(status);

    return taskArray.filter(filter);
  }

  static getTaskByDate(expirationDate: string, taskArray: taskDocument[]) {
    let filteredArray: taskDocument[] = [];

    filteredArray = taskArray.filter(element => element.date_conclusion.toLocaleDateString() === expirationDate);
    return filteredArray;
  }

  static LongestDescription(taskArray: taskDocument[]): taskDocument {
    let biggestLenght: number = 0;
    let res: taskDocument = taskArray[0];

    taskArray.forEach(element => {
      if (element.description.length > biggestLenght) {
        biggestLenght = element.description.length;
        res = element;
      }
      return res;
    });

    return res;
  }

  static getOldestTask(taskArray: taskDocument[]): taskDocument {
    let oldest = taskArray[0].date_creation.getTime();
    let result: taskDocument = taskArray[0];

    taskArray.forEach(element => {
      if (element.date_creation.getTime() <= oldest) {
        oldest = element.date_conclusion.getTime();
        result = element;
      }
    });

    return result;
  }

}

export default TaskService;