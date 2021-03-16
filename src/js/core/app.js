import React from "react";
import { connect } from "react-redux";

import Content from "../containers/content";

import { deleteTask, saveData } from "./actions/actionTaskList";

let App = (props) => {
    const {
        taskList,
        onDeleteTask,
        onSaveData,
    } = props;

    const propsContent = {
        taskList,
        onDeleteTask,
        onSaveData,
    }
    return (
        <Content {...propsContent} />
    );
};
const mapStateToProps = (state) => {
    return {
        taskList: state.taskList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSaveData: (data, taskList, index) => dispatch(saveData(data, taskList, index)),
        onDeleteTask: index => dispatch(deleteTask(index)),
    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
