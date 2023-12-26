import { Component } from 'react'

import TasksFilter from '../TasksFilter/tasksFilter'

export default class Footer extends Component {
  render() {
    const { doneCount, delList, filter, onFilterChange } = this.props
    const count = doneCount.filter(el => !el.done).length

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button onClick={delList} className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  onFilterChange: () => {},
  delList: () => {},
  doneCount: 0,
}
