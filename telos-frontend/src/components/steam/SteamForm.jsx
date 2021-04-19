import ReactDOM from 'react-dom';
import { useState } from 'react';
import styles from './SteamForm.module.css';

const modalRoot = document.querySelector('#modal-root');

const SteamForm = ({ addWidget }) => {
  const [name, setName] = useState('');

  const onSubmit = () => {
    name.preventDefault();
    console.log(name);
    addWidget();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <p>Please provide your Steam name</p>

      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="steamName"
            name="steamName"
          />
          <input type="submit" value="Show Account!" />
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default SteamForm;
