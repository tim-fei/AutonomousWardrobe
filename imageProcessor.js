const fs = require('fs');
const path = require('path');
const brain = require('brain.js');

const identifyAndStoreImage = (image) => {
  // send image for score
  // save image
}

var net = new brain.NeuralNetwork({
    binaryThresh: 0.5,
    hiddenLayers: [3],
    activation: 'sigmoid'
});

const suggest = (choices, db) => {

}

const colorList = [
  /* white: */{input: {r: 1, g: 1, b: 1}, output: {bad: 1}},
  /* black: */{input: {r: 0, g: 0, b: 0}, output: {good: 1}},
  /* red: */{input: {r: 1, g: 0, b: 0}, output: {good: 1}},
  /* green: */{input: {r: 0, g: 1, b: 0}, output: {bad: 1}},
  /* blue: */{input: {r: 0, g: 0, b: 1}, output: {good: 1}},
  /* purple: */{input: {r: 0.5, g: 0, b: 0.5}, output: {good: 1}},
  /* yellow: */{input: {r: 1, g: 1, b: 0}, output: {bad: 1}},

  /* orange: */{input: {r: 1, g: 0.65, b: 0}, output: {good: 1}},
  /* brown: */{input: {r: 0.65, g: 0.16, b: 0.16}, output: {bad: 1}},
  /* gray: */{input: {r: 0.5, g: 0.5, b: 0.5}, output: {good: 1}},
  /* pink: */{input: {r: 1, g: 0.75, b: 0.79}, output: {good: 1}},
  /* beige: */{input: {r: 0.96, g: 0.96, b: 0.86}, output: {bad: 1}},
  /* maroon:  */{input: {r: 0.5, g: 0, b: 0}, output: {good: 1}},
  /* darkgray:  */{input: {r: 0.66, g: 0.66, b: 0.66}, output: {good: 1}}
];

net.train(colorList);
var output = net.run({r:0.96, g:0.96, b:0.86});
console.log(output);

module.exports = (db) => {
  identifyAndStoreImage
};
