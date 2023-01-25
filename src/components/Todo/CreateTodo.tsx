import type { Component } from "solid-js";
import { Todo } from "../../App";
import BaseTodo from "./BaseTodo";
import styles from "./Todo.module.css";

interface Props {
    value: Todo;
    handleTaskChange: () => {};
    handleDoneChange: () => {};
    handleAddNewTodo: () => {};
}

const CreateTodo: Component<Props> = (props) => {
    return (
        <div class={styles.todo_radius}>
            <BaseTodo
                done={props.value.done}
                handleDoneChange={props.handleDoneChange}>
                <input
                    class={styles.create_todo_input}
                    type="text"
                    value={props.value.task}
                    onInput={props.handleTaskChange}
                    placeholder="Create a new todo..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            props.handleAddNewTodo();
                            e.currentTarget.value = "";
                        }
                    }}
                />
            </BaseTodo>
        </div>
    );
};

export default CreateTodo;