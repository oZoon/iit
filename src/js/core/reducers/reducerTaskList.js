import {
    SAVE_DATA_START,
    SAVE_DATA_EXECUTE,
    SAVE_DATA_FINISH,

    TASK_DELETE_START,
    TASK_DELETE_EXECUTE,
    TASK_DELETE_FINISH,
} from "../../lib/constants";

function taskList(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SAVE_DATA_START:
            newState.state = true;
            return newState;
        case SAVE_DATA_EXECUTE:
            action.index == 'new' ? newState.list.push(action.result) : newState.list.splice(action.index, 1, action.result);
            return newState;
        case SAVE_DATA_FINISH:
            newState.state = false;
            return newState;
        case TASK_DELETE_START:
            newState.state = true;
            return newState;
        case TASK_DELETE_EXECUTE:
            newState.list.splice(action.index, 1);
            return newState;
        case TASK_DELETE_FINISH:
            newState.state = false;
            return newState;
        default:
            return newState;
    }
}

export default taskList;
