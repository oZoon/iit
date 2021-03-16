import init from './init';
import taskList from './reducerTaskList';

function reducers(state = init, action) {
    return {
        taskList: taskList(state.taskList, action),
    };
}

export default reducers;
