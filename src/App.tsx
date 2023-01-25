import { createSignal, createEffect, Show, For } from "solid-js";
import type { Component } from 'solid-js';
import IconMoon from "./assets/IconMoon";
import IconSun from "./assets/IconSun";

import styles from './App.module.css';
import CreateTodo from "./components/Todo/CreateTodo";
import TodoComp from "./components/Todo/Todo";

function getStoredOrDefaultTheme(): boolean {
    const storedTheme = localStorage.getItem("theme-is-dark");
    if (storedTheme) return JSON.parse(storedTheme);

    return true;
}

function getStoredOrDefaultTodos(): Array<Todo> {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) return JSON.parse(storedTodos);

    return [{
        done: true,
        task: "First test todo"
    }];
}

export type Todo = {
    done: boolean;
    task: string;
};

const App: Component = () => {
    const [isDark, setIsDark] = createSignal<boolean>(getStoredOrDefaultTheme());
    const [newTodo, setNewTodo] = createSignal<Todo>({
        done: false,
        task: ""
    });
    const [todos, setTodos] = createSignal<Array<Todo>>(getStoredOrDefaultTodos());

    // Theme handler
    createEffect(() => {
        const isThemeDark: boolean = isDark();

        const colourVars = {
            "--prim-col": "",
            "--sec-col": "",
            "--font-col": "",
            "--highlight-col": ""
        };

        if (isThemeDark) {
            colourVars["--prim-col"] = "--v-dark-blue";
            colourVars["--sec-col"] = "--v-dark-desat-blue";
            colourVars["--font-col"] = "--light-grayish-blue";
            colourVars["--highlight-col"] = "--v-dark-grayish-blue";
        } else {
            colourVars["--prim-col"] = "--v-light-grayish-blue";
            colourVars["--sec-col"] = "--v-light-gray";
            colourVars["--font-col"] = "--v-dark-grayish-blue";
            colourVars["--highlight-col"] = "--light-grayish-blue";
        }

        for (const [key, val] of Object.entries(colourVars)) {
            document.documentElement.style.setProperty(key, `var(${val})`);
        }

        localStorage.setItem("theme-is-dark", JSON.stringify(isThemeDark));
    });

    // Todos storage handler
    createEffect(() => {
        const allTodos = todos();
        localStorage.setItem("todos", JSON.stringify(allTodos));
    });

    function handleNewTodoDoneChange() {
        setNewTodo(prev => ({
            ...prev,
            done: !prev.done
        }));
    }

    function handleNewTodoTaskChange(e: any) {
        setNewTodo(prev => ({
            ...prev,
            task: e.target.value
        }));
    }

    function handleAddNewTodo() {
        setTodos(prev => ([
            ...prev,
            newTodo()
        ]));
        setNewTodo(() => ({
            done: false,
            task: ""
        }));
    }

    function handleTodoDoneChange(idx: number | string) {
        setTodos(prev => prev.map((todo, i) => idx == i ? {
            done: !todo.done,
            task: todo.task
        } : todo));
    }

    function handleTodoRemove(idx: number | string) {
        setTodos(prev => prev.filter((_, i) => idx !== i));
    }

    return (
        <main
            class={styles.App}
            classList={{
                [styles.App__dark]: isDark(),
                [styles.App__light]: !isDark()
            }}>
            <div class={styles.App__container}>
                <header class={styles.App__header_ctn}>
                    <h1>
                        TODO
                    </h1>
                    <button onClick={() => setIsDark(!isDark())}>
                        <Show when={isDark()} fallback={<IconMoon />}>
                            <IconSun />
                        </Show>
                    </button>
                </header>

                <div class={styles.App__create_todo_ctn}>
                    <CreateTodo
                        value={newTodo()}
                        handleDoneChange={handleNewTodoDoneChange}
                        handleTaskChange={handleNewTodoTaskChange}
                        handleAddNewTodo={handleAddNewTodo}
                    />
                </div>

                <div class={styles.App__todos_ctn}>
                    <For each={todos()}>
                        {
                            (todo, idx) => (
                                <TodoComp
                                    todo={todo}
                                    handleDoneChange={() => handleTodoDoneChange(idx())}
                                    handleTodoRemove={() => handleTodoRemove(idx())}
                                />
                            )
                        }
                    </For>
                </div>
            </div>

        </main>
    );
};

export default App;