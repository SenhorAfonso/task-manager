class TaskUtils {

  static getNowDate(): Date {
    return new Date();
  }

  static isEmpty(target: any[] | any): boolean {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    return target === undefined || target === null;
  }
}

export default TaskUtils;