import Counter from "./Counter/Counter";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import NameGenerator from "./NameGenerator/NameGenerator";

const ROOT_PATH = "/Counter";
const NAMES_PATH = "/names";

function App(){
  
  return (
  <>
    <nav>
      <NavLink to={ROOT_PATH}>Compteur</NavLink>
      <NavLink to={NAMES_PATH}>Générateur de noms</NavLink>
    </nav>
    <main className="App">
      <Routes>
        <Route path={ROOT_PATH} element={<Counter />}></Route>
        <Route path={NAMES_PATH} element={<NameGenerator/>}></Route>
      </Routes>
    </main>
  </>
  );
}

export default App;