import styles from "./App.module.scss";
import Header from "./components/Header";
import { Main } from "./components/Main";
import { Users } from "./components/Users";
import { Form } from "./components/Form";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <Users />
      <Form />
    </div>
  );
}

export default App;
