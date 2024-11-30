import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <a
          class={styles.link}
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Answer to the Ultimate Question of Life, the Universe, and Everything
        </a>
      </header>
    </div>
  );
};

export default App;
