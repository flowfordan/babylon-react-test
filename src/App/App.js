
import styles from './App.module.css';
import PageCanvas from '../Babylon/PageCanvas';

function App() {

  // var workingCanvas = document.getElementById('my-canvas2');
  // workingCanvas.addEventListener(`wheel`, evt => evt.preventDefault());
  

  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <h2>React + Babylon</h2>
      </header>
      <div className={styles.appBody}>
        <PageCanvas />
      </div>
      <footer className={styles.appFooter}>
        2022
      </footer>
    </div>
  );
}

export default App;
