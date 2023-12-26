import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  render() {
    const { label, onDeleted, onToggleDone, done, id, date } = this.props

    let className = ''
    if (done) {
      className += 'completed'
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} checked={done} onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" type="button"></button>
          <button className="icon icon-destroy" type="button" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
}
