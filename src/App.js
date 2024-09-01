import React, { Component } from "react";

class Cir extends Component {
  render() {
    const { col, handleClick } = this.props;
    return (
      <div 
        className="bg-black border-4 flex rounded-lg cursor-pointer border-blue-700 p-5 hover:bg-blue-700 w-44"
        onClick={handleClick}
      >
        {/* Display the RGB value inside the box */}
        <span className="text-white text-lg self-center font-normal">{col}</span>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedcol: '', // Currently displayed color
      colorOptions: [], // Array to hold multiple RGB color options
      numberOfOptions: 4 // Default number of options
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
    const otherColors = this.generateMultipleColors(this.state.numberOfOptions - 1, selectedColor); // Generate other colors excluding the selected color
    const allColors = [...otherColors, selectedColor]; // Add the selected color to the list
    this.setState({ 
      selectedcol: selectedColor, 
      colorOptions: this.shuffleArray(allColors) // Shuffle to randomize the order
    });
  };

  updateColorOptions = () => {
    const { selectedcol, numberOfOptions } = this.state;
    const otherColors = this.generateMultipleColors(numberOfOptions - 1, selectedcol); // Generate other colors excluding the selected color
    const allColors = [...otherColors, selectedcol]; // Add the selected color to the list
    this.setState({ 
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

  handleOptionChange = (event) => {
    this.setState({ numberOfOptions: parseInt(event.target.value) }, this.updateColorOptions);
  };

  render() {
    const { selectedcol, colorOptions, numberOfOptions } = this.state;
    return (
      <div className="flex flex-col items-center m-5 p-5">
        <h1 className="text-6xl text-center font-bold m-5 p-4">RGB GAME</h1>
        <div className="w-48 sm:w-96 sm:h-96 h-48" 
          style={{ 
            backgroundColor: selectedcol
          }} 
        />
        <div className="flex">
          <p className="sm:text-3xl text-xl font-medium self-start sm:m-5 sm:p-5 m-2 p-2 mt-5 pt-5">No of options you want:</p>
          <select id="noofopt" className="bg-slate-200 border-2 border-black w-24 h-12 self-center" value={numberOfOptions} onChange={this.handleOptionChange}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>

        </div>
        <p className="sm:text-3xl text-xl font-medium self-start sm:m-5 sm:p-5 m-2 p-2 mt-5 pt-5">Choose the right colour value:</p>
        <div className="flex justify-center flex-wrap gap-10">
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
