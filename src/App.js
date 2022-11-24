import { setAxiosDefault } from "./axiosDefaults";
import { AppRoutes } from "./routes";
import "./App.css";

function App() {
  setAxiosDefault();

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
