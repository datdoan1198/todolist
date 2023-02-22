import React, {useState} from 'react';
import "./styles.scss"
import styles from './styles.module.scss';
import {Input, Checkbox} from "antd";
import { FormOutlined, DeleteOutlined} from '@ant-design/icons';

const TodoList = (props) => {
  const [todoList, setTodoList] = useState(props.todoList);
  const [textEdit, setTextEdit] = useState('');
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [index, setIndex] = useState(null);

  const handleChangeCheckBox = (e, item) => {
    item.isActive = e.target.checked
    let dataOld = todoList;

    setTodoList([])
    setTimeout(() => {
      setTodoList(dataOld)
    }, 100)
  }

  const removeTodo = (key) => {
    let dataOld = todoList;
    dataOld.splice(key, 1);

    setTodoList([])
    setTimeout(() => {
      setTodoList(dataOld)
    }, 100)
  }


  const handleEditTodo = (key, item) => {
    setIndex(key);
    setIsShowEdit(true);
    setTextEdit(item.name)
  }

  const handleChangeInputEdit = (e) => {
    setTextEdit(e.target.value);
  }

  const handleConfirmEdit = (event) => {
    const dataOld = todoList;
    dataOld[index].name = textEdit;
    setTodoList([])

    setTimeout(() => {
      setTodoList(dataOld)
    }, 100)
    setIsShowEdit(false);
    setTextEdit('')
  }

  return (
    <>
      {
        props.todoList.length > 0 ?
          <div className={styles.listTodoWrap}>
            {
              todoList.map((item, key) => {
                return (
                  <div key={key} className={styles.todoItem}>
                    <div className={styles.infoItemTodo}>
                      <Checkbox onChange={(e) => handleChangeCheckBox(e, item)} checked={item.isActive}  />
                      {
                        isShowEdit && key === index ?
                          <Input
                            onBlur={(e) => handleConfirmEdit(e)}
                            onChange={(e) => handleChangeInputEdit(e)}
                            size="large"
                            value={textEdit}
                            placeholder="Nhập công việc cần làm"
                          /> :
                          <span className={styles.name}>{item.name}</span>
                      }
                    </div>

                    <div className={styles.actionWrap}>
                      <FormOutlined onClick={() => handleEditTodo(key, item)} className={styles.icon} />
                      <DeleteOutlined onClick={() => removeTodo(key)} className={styles.icon}/>
                    </div>
                  </div>
                );
              })
            }
          </div> :
          'Vui lòng nhập công việc'
      }
    </>
  )
};

export default TodoList

