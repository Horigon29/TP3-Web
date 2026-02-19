import {useState} from "react";

interface Todo{
    id : number;
    text: string;
    completed?: boolean;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const addTodo = (text :string) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        // ✅ Nouveau tableau avec spread
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id:number) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    const removeTodo = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <div>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Nouvelle tâche..."
                />
                <button onClick={()=>addTodo(input)}>Ajouter</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        {todo.text}
                        <button onClick={() => removeTodo(todo.id)}>Supprimer</button>
                    </li>
                ))}
                <p>{todos.filter(todo=>todo.completed).length} / {todos.length} tâches complétées</p>
            </ul>
        </div>
    );
}

export default TodoList;