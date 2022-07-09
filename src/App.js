import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <main className="App">
       <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/add-post">Add post</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
    </main>
  );
}

export default App;
