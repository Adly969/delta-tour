const fs = require('fs');
const path = require('path');

const srcIcon = path.join('assets', 'img', 'favicon-delta-tour.png');
const targetIcons = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png'
];

if (fs.existsSync(srcIcon)) {
  targetIcons.forEach(target => {
    try {
      fs.copyFileSync(srcIcon, target);
      console.log(`Successfully set up favicon: ${target}`);
    } catch (err) {
      console.error(`Error copying to ${target}: ${err.message}`);
    }
  });
} else {
  console.error(`Source favicon file not found at: ${srcIcon}`);
}
