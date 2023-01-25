import { Component, JSX, Show } from "solid-js";
import { children } from "solid-js";
import IconCheck from "../../assets/IconCheck";
import styles from "./Todo.module.css";

interface Props {
    done: boolean;
    handleDoneChange: () => {};
    children?: JSX.Element;
}

const BaseTodo: Component<Props> = (props) => {
    const child = children(() => props.children);
    return (
        <div class={styles.base_todo}>
            <button class={styles.base_todo__check_ctn} onClick={props.handleDoneChange}>
                <div
                    class={styles.base_todo__check_ctn__child}
                    classList={{
                        [styles.base_todo__check_ctn__child__active]: props.done
                    }}
                >
                    <Show when={props.done}>
                        <IconCheck />
                    </Show>
                </div>
            </button>
            <div class={styles.base_todo__right_ctn}>
                {
                    child()
                }
            </div>
        </div>
    );
};

export default BaseTodo;