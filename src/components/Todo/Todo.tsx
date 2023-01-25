import type { Component } from "solid-js";
import { Todo } from "../../App";
import IconCross from "../../assets/IconCross";
import BaseTodo from "./BaseTodo";
import styles from "./Todo.module.css";

interface Props {
    todo: Todo;
    handleDoneChange: () => {};
    handleTodoRemove: () => {};
}

const TodoComp: Component<Props> = (props) => {

    return (
        <BaseTodo
            done={props.todo.done}
            handleDoneChange={props.handleDoneChange}
        >
            <p
                classList={{
                    [styles.todo__task_done]: props.todo.done
                }}
            >
                {
                    props.todo.task
                }
            </p>
            <button class={styles.todo__remove_btn} onClick={props.handleTodoRemove}>
                <IconCross />
            </button>
        </BaseTodo>
    );
};

export default TodoComp;