
import mockData from "./data/mockData";
function App() {
  return(
    <div className = "container">
      <h1>Splitwise</h1>
      <h2>User</h2>
      <ul>
        {mockData.users.map((user) =>(
          <li key = {user.id}>{user.name}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
