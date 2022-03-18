
import styles from './App.module.css';
import PageCanvas from '../components/PageCanvas';

function App() {

  // var workingCanvas = document.getElementById('my-canvas2');
  // workingCanvas.addEventListener(`wheel`, evt => evt.preventDefault());
  

  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        Learn React
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
