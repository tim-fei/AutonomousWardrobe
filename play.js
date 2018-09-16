
const image = require('get-image-data');
const dominant = require('huey/dominant');
const palette = require('huey/palette');



    image('./assets/wardrobe/i3.jpeg', async function (error, img) {
      if (error) {
        console.error(error);
      } else {
        console.log(dominant(img.data));
      }
    });
