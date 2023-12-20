import { Component } from "react";
import TasksFilter from "../TasksFilter/tasksFilter";

export default class Footer extends Component {
  render() {
    const { doneCount, delList, filter, onFilterChange } = this.props;

    const Count = doneCount.filter((el) => el.done).length;
    const todoCount = doneCount.length - Count;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button onClick={delList} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
