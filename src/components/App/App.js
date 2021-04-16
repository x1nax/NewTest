import React, {Component} from 'react';
import './App.css';
import Gamefield from '../Gamefield/Gamefield';
import Menu from '../Menu/Menu';

class App extends Component {
 state = {
  parts: [
    {
      color:"red",
      isClicked: false,
      id: 1,
      sound:"https://res.cloudinary.com/dco8vt3qq/video/upload/v1615979949/MemoryGame/sounds_3_afxy2o.mp3",
    },

    {
      color:"blue",
      isClicked: false,
      id: 2,
      sound:"https://res.cloudinary.com/dco8vt3qq/video/upload/v1615979949/MemoryGame/sounds_2_o24nb7.mp3",
    },

    {
      color:"green",
      isClicked: false,
      id: 3,
      sound:"https://res.cloudinary.com/dco8vt3qq/video/upload/v1615979949/MemoryGame/sounds_1_mqndbk.mp3",
    },

    {
      color:"yellow",
      isClicked: false,
      id: 4,
      sound:"https://res.cloudinary.com/dco8vt3qq/video/upload/v1615979949/MemoryGame/sounds_4_za6suk.mp3",
    },
  ],
  difficults: [
    {
      level: 'Легко',
    },
    {
      level: 'Средне',
    },
    {
      level: 'Сложно',
    },
  ],
  isLose: false,
  progAnswers: [],
  clientAnswers: [],
  round: 1,
  click: 1,
  difficult: 1500,
  isVisible: true,
 };

 chooseLevel= (level) =>{
   switch (level) {
     case "Легко": this.setState({difficult: 1500});
       break;
     case "Средне": this.setState({difficult: 1000});
       break;
     case "Сложно": this.setState({difficult: 500});
       break;
   
     default: this.setState({difficult: 1500});
       break;
   }
 }

 componentDidMount() {
  for(let i=0; i<this.state.round; i++){
    console.log('Вызвана функция')
    this.setState({progAnswers:this.state.progAnswers.concat(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1))});  
  }
 };

 
 getAnswers = () => {
  this.setState({clientAnswers: []});
  for(let i=this.state.round; i<=this.state.round; i++){
    console.log('Вызвана функция')
    this.setState({progAnswers:this.state.progAnswers.concat(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1))});  
  }
 };

 answersLight = () => {
    let index = 0;
    let int = this.state.difficult;
    let lightning = setInterval(() => {
      if(index<this.state.round){
        this.partLight(this.state.progAnswers[index]); 
        index++;
      } 
    }, int);
    setTimeout(() => {
     clearInterval(lightning);
    }, this.state.round*int+int);
 };

 startGame = () => {
    this.answersLight();
    this.setState({isVisible:false});
  } 
 

 partLight = (id) => {
  const newParts= this.state.parts.map(part => {
    const newPart= {...part}
    if(part.id === id){
      newPart.isClicked = true;
      document.getElementById(part.color).play();
    }
    return newPart;
    
  });
  this.setState({parts: newParts});
  setTimeout(() => {
    const newParts= this.state.parts.map(part => {
      const newPart= {...part}
      if(part.id === id){
        newPart.isClicked = false;
      }
      return newPart;
    });
    this.setState({parts: newParts})}, 500);
};
  

 delayOnclick = () =>{
  for(let i=0; i<=this.state.clientAnswers.length-1;i++){
    if(this.state.progAnswers[i]!==this.state.clientAnswers[i]){
        this.setState({isLose:true});
        this.setState({isVisible: true});
    }
  };
  setTimeout(() => {
    if (this.state.click===0 && !this.state.isLose) {
      console.log('прибавил')
      this.setState({round: this.state.round+1});
      this.setState({click: this.state.round});
      this.getAnswers();
      this.answersLight();
    }
  }, 50); 
 };

 partOnClick = (id) => {
  const newParts= this.state.parts.map(part => {
    const newPart= {...part}
    if(part.id === id){
      this.setState({clientAnswers: this.state.clientAnswers.concat(part.id)});
    }
    return newPart
  });
  this.setState({parts: newParts});
  this.partLight(id);
  this.setState({click: this.state.click -1});
 };

 refresh = () => {
  document.location.reload();
 }

render () {
  return(
    <div className="App">
      <Gamefield parts={this.state.parts} partOnClick={this.partOnClick} delayOnclick={this.delayOnclick} isVisible={this.state.isVisible} isLose={this.state.isLose} round={this.state.round}/>
      <Menu startGame={this.startGame} difficults={this.state.difficults} chooseLevel={this.chooseLevel} isVisible={this.state.isVisible}  isLose={this.state.isLose} refresh={this.refresh}/>
    </div> 
  );     
  }
}


export default App;
