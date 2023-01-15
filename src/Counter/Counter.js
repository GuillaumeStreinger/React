import {useState} from "react";
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div>
        Compte : {" "} 
        <span className={count > 5 ? "Count-too-high" : ""}>
          {count}
        </span>
      </div>
      <div className="Button-group">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      {count > 5 && (
        <div className="Warning-message">Le compte est trop élevé</div>
      )}
    </>
  );
}

export default Counter;
