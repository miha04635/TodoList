import Footer from "../Footer/footer.js";
import NewTaskForm from "../NewTaskForm/newTaskForm.js";
import TaskList from "../TaskList/taskList.js";
import "./index.css";
import { Component } from "react";

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [],
    filter: "all",
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "Active":
        return items.filter((item) => !item.done);
      case "Completed":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      done: false,
      date: new Date(),
    };
  }
  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }
  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  deletedItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };
  deletedList = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.splice(0, todoData.length);
      return newArray;
    });
  };
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      if (text) {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <TaskList
          todos={visibleItems}
          onDeleted={this.deletedItem}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          filter={filter}
          onFilterChange={this.onFilterChange}
          doneCount={todoData}
          delList={this.deletedList}
        />
      </div>
    );
  }
}
