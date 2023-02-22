import React, {useState} from 'react';
import "./styles.scss"
import styles from './styles.module.scss';
import {Input} from "antd";
import TodoList from "../../components/TodoList";

const TodoListPage = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState('');

  const handleAddTodo = (event) => {
    if (event.charCode === 13 && text.length > 0) {
      const dataOld = todoList;
      dataOld.push({
        name: text,
        isActive: false
      })
      setTodoList(dataOld);

      setText('');
    }
  }

  const handleChangeInput = (e) => {
    setText(e.target.value)
  }

  return (
    <div className={styles.todoListWrap}>
      <div className={styles.filterWrap}>
        <Input
          onKeyPress={(e) => handleAddTodo(e)}
          onChange={(e) => handleChangeInput(e)}
          size="large"
          value={text}
          placeholder="Nhập công việc cần làm"
        />
      </div>
      <TodoList
        todoList={todoList}
      />
    </div>
  )
};

export default TodoListPage

