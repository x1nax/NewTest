import React from 'react';
import styles from './Gamefield.module.css';
import classnames from 'classnames';



const Gamefield = ({parts, partOnClick, delayOnclick, isVisible, isLose, round}) => (
<div>
<div className={classnames ({[styles.Gamefield]: true, [styles.isVisible]: isVisible})}>
    {parts.map(part => <div key={parts.id} 
                            className={classnames ({[styles.Part]: true, [styles.isClicked]: part.isClicked})} 
                            onMouseDown={()=> partOnClick(part.id)}
                            onMouseUp={()=> delayOnclick()}>
                            <audio id={part.color} src={part.sound}></audio>
                        </div>
              )
    }
  </div>
  <div className={classnames ({[styles.result]: true, [styles.lose]: isLose})}>Ты проиграл в раунде {round}</div>
</div>

);

export default Gamefield;