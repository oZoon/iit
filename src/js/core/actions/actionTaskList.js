import {
    SAVE_DATA_START,
    SAVE_DATA_EXECUTE,
    SAVE_DATA_FINISH,

    TASK_DELETE_START,
    TASK_DELETE_EXECUTE,
    TASK_DELETE_FINISH,
} from "../../lib/constants";
import {getNewNumber, getTaskData} from '../../lib/utils';

export const saveData = (data, taskList, index) => {
    return dispatch => {
        if (index == 'new') {
            dispatch(dispatchSaveDataStart());
            const result = {
                taskNumber: getNewNumber(taskList),
                taskDate: + new Date(),
                customerName: data[0],
                supplyerName: data[1],
                supplyerPhone: data[2],
                comments: data[3],
                atiCode: data[4],
            }
            dispatch(dispatchSaveDataExecute(result, index));
            dispatch(dispatchSaveDataFinish());
        } else {
            dispatch(dispatchSaveDataStart());
            const [taskNumber, taskDate] = getTaskData(taskList, index, ['taskNumber', 'taskDate'])
            const result = {
                taskNumber,
                taskDate,
                customerName: data[0],
                supplyerName: data[1],
                supplyerPhone: data[2],
                comments: data[3],
                atiCode: data[4],
            }
            dispatch(dispatchSaveDataExecute(result, index));
            dispatch(dispatchSaveDataFinish());
        }
    }
}
const dispatchSaveDataStart = () => {
    return {
        type: SAVE_DATA_START,
    }
}
const dispatchSaveDataExecute = (result, index) => {
    return {
        type: SAVE_DATA_EXECUTE,
        result,
        index,
    }
}
const dispatchSaveDataFinish = () => {
    return {
        type: SAVE_DATA_FINISH,
    }
}

export const deleteTask = (index) => {
    return dispatch => {
        dispatch(dispatchDeleteTaskStart());
        dispatch(dispatchDeleteTaskExecute(index));
        dispatch(dispatchDeleteTaskFinish());
    }
}
const dispatchDeleteTaskStart = () => {
    return {
        type: TASK_DELETE_START,
    }
}
const dispatchDeleteTaskExecute = (index) => {
    return {
        type: TASK_DELETE_EXECUTE,
        index,
    }
}
const dispatchDeleteTaskFinish = () => {
    return {
        type: TASK_DELETE_FINISH,
    }
}
