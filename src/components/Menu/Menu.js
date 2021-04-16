import React from 'react';
import styles from '../Menu/Menu.module.css';
import classnames from 'classnames';

const Menu = ({startGame, difficults, chooseLevel, isVisible,  isLose, refresh}) => (
  <div className={styles.wrap}>
    <div className={classnames ({[styles.menu]: true, [styles.isVisible]: !isVisible, [styles.isLose]: isLose})}>
    <button className={styles.btn} onClick={() => startGame()}>Start</button>
    <div>
      {difficults.map(dif => 
        <p><input type="radio" name="Сложность" onClick={()=>chooseLevel(dif.level)}></input>{dif.level}</p>
      )}
    </div>
    </div>
    {isLose ? 
      <button className={styles.btn} onClick={() => refresh()}>Начать заново</button> :
      <div></div>}
  </div>
  
  
);

export default Menu;