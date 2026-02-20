import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Counter.tsx'
import Counter from "./Counter.tsx";
import TodoList from "./TodoList.tsx";
import ContactForm from "./ContactForm.tsx";
import MultiStepForm from "./MultiStepForm.tsx";
import ProductFilter from "./ProductFilter.tsx";


function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter/>
        <br/>
        <TodoList/>
        <br/>
        <ContactForm/>
          <br/>
          <MultiStepForm/>
          <br/>
          <br/>
          <ProductFilter/>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
