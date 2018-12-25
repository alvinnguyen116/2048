import React from 'react';
import ReactDOM from 'react-dom';
import ArrowKeysReact from 'arrow-keys-react';
import './index.css';

function addHexColor(c1, c2, value) {
  var hexStr = ((parseInt(c1, 16) + c2*value)%16777216).toString(16);
  while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
  return hexStr;
}

function reduce(arr) {
  let reduced = [];
  if (arr.length <= 1) {
    return arr;
  }
  for(let i = 0; i < arr.length; i++) {
    if ((i+1 <= arr.length) && (arr[i] === arr[i+1])) {
      reduced.push(arr[i]*2);
      i++;
    } else {
      reduced.push(arr[i]);
    }
  }
  return reduced;
}

function Square(props) { //function component 
    let base = "ffffff";
    const multiplier = (props.value ? props.value : 0)
    let temp = addHexColor(base,14596231, Math.floor(multiplier/2));
    if (props.mode === "extreme") {
      temp = addHexColor(base,16007990, multiplier);
    }
    
    const background = "#" + temp;
    const style = {
      backgroundColor: background,
    }
    return (
      <button className="square" style={style}
      >
        {props.value}
      </button>
    )
}

class Board extends React.Component { //class component 

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      mode={this.props.mode}
    />
  }

  render() {
    let num = this.props.number
    let components = []
    for (let i=0; i<num;i++) {
      let row = []
      for (let j=0; j<num;j++) {
        let index = i*num + j;
        row.push(this.renderSquare(index));
      }
      components.push(<div className="board-row">{row}</div>)
    }
    return (<div>{components}</div>);
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    // this.randomValue = this.randomValue.bind(this);
    // this.addRandom = this.addRandom.bind(this);
    this.state = {
      squares: this.startBoard(1, 2, 'normal'),
      number: 2,
      display: 2,
      score: 0,
      mode: 'normal',
    }

  ArrowKeysReact.config({
      left: () => {
        this.leftOrRight("left");
      },
      right: () => {
        this.leftOrRight("right");
      },
      up: () => {
        this.upOrDown("up");
      },
      down: () => {
        this.upOrDown("down");
      }
    }); 
  }

  upOrDown(direction) {
    let squares = this.state.squares.slice();
    let oldScore = squares.reduce((a,b)=> a+b)
    let columns = this.arrayToColumn(squares);
    let multiplier = 1;
    if (direction === "up") {
      columns = columns.map(this.moveUp);
    } else if (direction === "down") {
      columns = columns.map(this.moveDown);
    }
    squares = this.columnToArr(columns);
    squares = this.addRandom(squares, Math.floor(this.state.number/2), this.state.mode);
    let newScore = squares.reduce((a,b) => a + b)
    if (this.state.mode === "extreme") {
      multiplier = 5;
    }
    this.setState({squares: squares, score: this.state.score + (newScore - oldScore)*multiplier});
  }

  leftOrRight(direction) {
    let squares = this.state.squares.slice();
    let oldScore = squares.reduce((a,b)=> a+b)
    let rows = this.arrayToRow(squares);
    let multiplier = 1;
    if (direction === "left") {
      rows = rows.map(this.moveUp);
    } else if (direction === "right") {
      rows = rows.map(this.moveDown);
    }
    squares = this.rowToArr(rows);
    if (this.state.mode === "extreme") {
      multiplier = 5;
    }
    squares = this.addRandom(squares, Math.floor(this.state.number/2), this.state.mode);
    let newScore = squares.reduce((a,b) => a + b)
    this.setState({squares: squares, score: this.state.score + (newScore-oldScore)*multiplier});
  }

  arrayToColumn(arr) {
    let columns = []
    const dimension = Math.sqrt(arr.length);
    for (let i = 0; i < dimension; i++) {
      let column = []
      for (let j = 0; j < dimension; j++) {
        column.push(arr[i + dimension*j]);
      }
      columns.push(column);
    }
    return columns;
  }

  arrayToRow(arr) {
    let rows = []
    const dimension = Math.sqrt(arr.length);
    for (let i = 0; i < dimension; i++) {
      let row = []
      for (let j = 0; j < dimension; j++) {
        row.push(arr[i*dimension + j]);
      }
      rows.push(row);
    }
    return rows;
  }

  columnToArr(columns) {
    let arr = [];
    const dimension = columns.length;
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        arr.push(columns[j][i]);
      }
    }
    return arr;
  }

  rowToArr(rows) {
    let arr = []
    const dimension = rows.length;
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        arr.push(rows[i][j]);
      }
    }
    return arr;
  }

  moveDown(arr) {
    const length = arr.length; 
    arr = arr.filter((item)=> item != null);
    arr = arr.reverse();
    arr = reduce(arr);
    arr = arr.reverse();
    while (arr.length !== length) {
      arr.unshift(null);
    }
    // console.log(arr);
    return arr;
  }

  moveUp(arr) { //move arr towards top, add if possible 

    const length = arr.length; 
    arr = arr.filter((item)=> item != null);
    arr = reduce(arr);
    while (arr.length !== length) {
      arr.push(null);
    }
    return arr;
  }

  startBoard(amount, number, mode) {
    let arr = Array(number).fill(null);
    arr = this.addRandom(arr, amount, mode);
    return arr; 
  }

  randomValue(mode) { // change later for fun??? 
    let rand = Math.random();
    if (mode === "normal") {
      if (rand < .5) {
        return 2 
      } else {
        return 4
      }
    } else if (mode === "extreme") {
      if (rand < .5) {
        return 1 
      } else {
        return 3
      }
    }
  }

  addRandom(arr, amount, mode) {

    
    let emptyIndexes = [];
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        emptyIndexes.push(i);
      }
    }

    while ((amount > 0) && (emptyIndexes.length > 0)) {
      let index = this.randomIndex(emptyIndexes.length)
      arr[emptyIndexes[index]] = this.randomValue(mode);
      amount--;
      emptyIndexes.splice(emptyIndexes[index], 1); 
    }
    return arr;
  }

  randomIndex(max) {
    return Math.floor(Math.random()*(max - 1));
  }

  componentDidUpdate(prevProps, prevState) {
    this._input.focus();
  } 

  calculateStatus() {
    let gameOver = false
    let squares = this.state.squares; 
    const empty = squares.filter((item)=> item == null);
    if (empty.length === 0) {
      gameOver = []
      let rows = this.arrayToRow(squares);
      rows = rows.map(reduce)

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].length < this.state.number) {
          gameOver.push(false)
          break;
        }
      }
      let cols = this.arrayToColumn(squares);
      cols = cols.map(reduce)
      for (let i = 0; i < cols.length; i++) {
        if (cols[i].length < this.state.number) {
          gameOver.push(false)
          break;
        }
      }
      if (gameOver.length === 0) {
        gameOver = true;
      } else {
        gameOver = false;
      }
    }
    let score = squares.reduce((a,b)=> a+b)   
    return [gameOver, score]
  }

  handleSize(event) {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      this.setState({display: ''});
    }
    if (value > 0 ) {
      let numSquares = value**2;
      let amount = Math.floor(value/2);
      this.setState({number: value, display: value, squares: this.startBoard(amount, numSquares, this.state.mode)});
    } 
  }

  gameMode(mode) {
    let amount = Math.floor(this.state.number/2)
    let number = this.state.number**2
    if (mode === "normal") {
      if (this.state.mode === "extreme") {
        let squares = this.startBoard(amount, number, 'normal');
        this.setState({mode: "normal", squares: squares});
      }
    } else if (mode === "extreme") {
      if (this.state.mode === "normal") {
        let squares = this.startBoard(amount, number, 'extreme');
        this.setState({mode: "extreme", squares: squares});
      }
    }
  }

  render() {
    let number = this.state.number
    let display = this.state.display
    let status = this.calculateStatus();
    let normalClass = "col-6"
    let extremeClass = "col-6"
    if (this.state.mode === "normal") {
      normalClass += " active"
    } else if (this.state.mode === "extreme") {
      extremeClass += " active"
    }
    if (status[0]) {
      return (
      <div className="game" >
        <div className="game-board">
          <Board squares={this.state.squares} number={number} mode={this.state.mode}/>
        </div>
        <div class="userControls">
          <div class="status">{"No more moves."}</div>
          <div class="status">{"Final Score:" + this.state.score}</div>
          <div class="row slider">
            <div class="col-4">{"Board Size: "}</div>
            <input type="range" min="2" max="10" value={display} class="slider" onChange={(e)=>this.handleSize(e)}/>
          </div>
          <div class="row">
            <div class="col-4 arrowKeys">{"Arrow Keys: "}</div> 
            <input class="col-4" type="text" {...ArrowKeysReact.events} tabIndex="1"
              ref={c => (this._input = c)}/>
          </div>
          <div class="row">
              <p class={normalClass} onClick={()=>this.gameMode("normal")}>{"Normal"}</p>
              <p class={extremeClass} onClick={()=>this.gameMode("extreme")}>{"Extreme"}</p>
          </div>
        </div>
      </div>
    );
    } else {
      return (
        <div className="game" >
          <div className="game-board">
            <Board squares={this.state.squares} number={number} mode={this.state.mode}/>
          </div>
          <div class="userControls">
            <div class="status">{"Score: " + this.state.score}</div>
            <div class="row slider">
              <div class="col-4">{"Board Size: "}</div>
              <input type="range" min="2" max="10" value={display} class="slider" onChange={(e)=>this.handleSize(e)}/>
            </div>
            <div class="row">
              <div class="col-4 arrowKeys">{"Arrow Keys: "}</div> 
              <input class="col-4" type="text" {...ArrowKeysReact.events} tabIndex="1"
              ref={c => (this._input = c)}/>
            </div>
            <div class="row">
              <p class={normalClass} onClick={()=>this.gameMode("normal")}>{"Normal"}</p>
              <p class={extremeClass} onClick={()=>this.gameMode("extreme")}>{"Extreme"}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
