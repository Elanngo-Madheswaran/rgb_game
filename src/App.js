import React, { Component } from "react";

class Cir extends Component {
  render() {
    const { col, handleClick } = this.props;
    return (
      <div 
        style={{ 
          width: '120px', 
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        onClick={handleClick}
      >
        {/* Display the RGB value inside the box */}
        <span style={{ color: 'black', fontWeight: 'bold' }}>{col}</span>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedcol: '', // Currently displayed color
      colorOptions: [] // Array to hold multiple RGB color options
    };
  }

  componentDidMount() {
    this.updateColors(); // Initialize colors when component mounts
  }

  generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  generateMultipleColors = (count, excludeColor) => {
    const colors = [];
    while (colors.length < count) {
      let color;
      do {
        color = this.generateRandomColor();
      } while (colors.includes(color) || color === excludeColor);
      colors.push(color);
    }
    return colors;
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  updateColors = () => {
    const selectedColor = this.generateRandomColor();
    const otherColors = this.generateMultipleColors(5, selectedColor); // Generate other colors excluding the selected color
    const allColors = [...otherColors, selectedColor]; // Add the selected color to the list
    this.setState({ 
      selectedcol: selectedColor, 
      colorOptions: this.shuffleArray(allColors) // Shuffle to randomize the order
    });
  };

  handleColorClick = (color) => {
    if (color === this.state.selectedcol) {
      alert("Correct! You selected the right color.");
      this.updateColors();
    } else {
      alert("Try again!");
    }
  };

  render() {
    const { selectedcol, colorOptions } = this.state;
    return (
      <div>
        <h1>RGB game</h1>
        <div 
          style={{ 
            backgroundColor: selectedcol, 
            width: '120px', 
            height: '50px',
            marginBottom: '20px'
          }} 
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {colorOptions.map((color, index) => (
            <Cir 
              key={index}
              col={color} 
              handleClick={() => this.handleColorClick(color)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export { Cir };
export default App;
