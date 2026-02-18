import {useState} from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Compteur : {count}</h2>
            <button onClick={() => setCount(count-5)}>-5</button>
            <button onClick={() => setCount(count-1)} disabled={count===0}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count+1)}>+1</button>
            <button onClick={() => setCount(count+5)}>+5</button>
        </div>
    );
}

export default Counter;
