
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let menu = true;
let importe = "";
let arch = "";
let ai = "";
let archImp = false;
let aiImp = false;
let wImp = false;
const fileInput = document.getElementById('fileInput');
const archInput = document.getElementById('archInput');
let img1l = false;
let img1 = new Image();
img1.src = 'https://i.imgur.com/KGQMcsX.png';
img1.onload = () => {
  img1l = true;
  console.log("done img1")
};
let img3l = false;
let img3 = new Image();
img3.src = 'https://i.imgur.com/PWyr9XB.png';
img3.onload = () => {
  img3l = true;
  console.log("done img3")
};
let img4l = false;
let img4 = new Image();
img4.src = 'https://i.imgur.com/zs2Efs0.png';
img4.onload = () => {
  img4l = true;
  console.log("done img3")
};
let img2l = false;
let img2 = new Image();
img2.src = 'https://i.imgur.com/ObCIRKM.png';
img2.onload = () => {
  img2l = true;
  console.log("done img2")
};

const buttonX = 150;
const buttonY = 80;
const buttonWidth = 100;
const buttonHeight = 40;

const customButtonX = 150;
const customButtonY = 200;
const customButtonWidth = 150;
const customButtonHeight = 40;
const customButtonText = 'start';

const customButtonX2 = 150;
const customButtonY2 = 140;
const customButtonWidth2 = 150;
const customButtonHeight2 = 40;
const customButtonText2 = 'import ai';

const textInputX = 500;
const textInputY = 160;
const textInputWidth = 100;
const textInputHeight = 30;
let typing = false;
let xy = [
  [textInputX - textInputWidth / 2, textInputY - textInputHeight / 2],
  [textInputX + textInputWidth / 2, textInputY - textInputHeight / 2],
  [textInputX + textInputWidth / 2, textInputY + textInputHeight / 2],
  [textInputX - textInputWidth / 2, textInputY + textInputHeight / 2]
];
let theText = "500"
const textInputX2 = 700;
const textInputY2 = 160;
const textInputWidth2 = 100;
const textInputHeight2 = 30;
let typing2 = false;
let xy2 = [
  [textInputX2 - textInputWidth2 / 2, textInputY2 - textInputHeight2 / 2],
  [textInputX2 + textInputWidth2 / 2, textInputY2 - textInputHeight2 / 2],
  [textInputX2 + textInputWidth2 / 2, textInputY2 + textInputHeight2 / 2],
  [textInputX2 - textInputWidth2 / 2, textInputY2 + textInputHeight2 / 2]
];
let theText2 = "20"
// Draw the menu with the "Import" button
function drawMenu() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  context.fillStyle = 'lightgray';
  context.fillRect(0, 0, canvas.width, canvas.height);


  context.fillStyle = "black";
  context.moveTo(...xy[0]);
  context.lineTo(...xy[1]);
  context.lineTo(...xy[2]);
  context.lineTo(...xy[3]);
  context.lineTo(...xy[0]);
  context.stroke();
  context.fillStyle = 'black';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("Amount of ai's.", textInputX, xy[0][1] - 10);
  context.fillStyle = 'black';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(theText, textInputX, textInputY + 2);
  context.fillStyle = "black";
  context.moveTo(...xy2[0]);
  context.lineTo(...xy2[1]);
  context.lineTo(...xy2[2]);
  context.lineTo(...xy2[3]);
  context.lineTo(...xy2[0]);
  context.stroke();
  context.fillStyle = 'black';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("Amount of ai's drawn.", textInputX2, xy2[0][1] - 10);
  context.fillStyle = 'black';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(theText2, textInputX2, textInputY2 + 2);
  // Draw button
  context.fillStyle = 'blue';
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  // Draw button text
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('Import weights', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  // Draw custom button
  context.fillStyle = 'green';
  context.fillRect(customButtonX, customButtonY, customButtonWidth, customButtonHeight);
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(customButtonText, customButtonX + customButtonWidth / 2, customButtonY + customButtonHeight / 2);
  // Draw custom button
  context.fillStyle = 'blue';
  context.fillRect(customButtonX2, customButtonY2, customButtonWidth2, customButtonHeight2);
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(customButtonText2, customButtonX2 + customButtonWidth2 / 2, customButtonY2 + customButtonHeight2 / 2);

}

// Handle button click
canvas.addEventListener('click', (event) => {
  if (menu && img1l && img2l) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseX >= xy[0][0] && mouseX <= xy[2][0] &&
      mouseY >= xy[0][1] && mouseY <= xy[2][1]) {
      typing = true;
      typing2 = false;
    }
    if (mouseX >= xy2[0][0] && mouseX <= xy2[2][0] &&
      mouseY >= xy2[0][1] && mouseY <= xy2[2][1]) {
      typing = false;
      typing2 = true;
    }
    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
      fileInput.click();
    } else if (mouseX >= customButtonX && mouseX <= customButtonX + customButtonWidth &&
      mouseY >= customButtonY && mouseY <= customButtonY + customButtonHeight) {
      start(); // Call your custom function here
    } else if (mouseX >= customButtonX2 && mouseX <= customButtonX2 + customButtonWidth2 &&
      mouseY >= customButtonY2 && mouseY <= customButtonY2 + customButtonHeight2) {
      archInput.click(); // Call your custom function here
    }
  }
});

// Handle file input change
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const jsonContent = await file.text();
      const weightsAndBiases = JSON.parse(jsonContent);
      if (weightsAndBiases.length == 2) {
        importe = weightsAndBiases;
        wImp = true;
        console.log("succesfull import")
        menu = false;
        start()
      } else {
        alert("no use correct weights")
      }
    } catch (error) {
      console.error(error)
      alert('Error importing weights and biases.');
    }
  }
});

// Handle file input change
archInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      alert("no use weights instead :D")
    } catch (error) {
      console.error(error)
      alert('Error importing ai.');
    }
  }
});
let keys = ["1", "0", "2", "3", "4", "5", "6", "7", "8", "9"]
window.addEventListener('keydown', (event) => {
  if (typing) {
    if (event.key == "Enter") {
      typing = false;
      let f = parseInt(theText);
      if (f < 20) {
        theText = "20"
      }
    }
    if (event.key == "Backspace") {
      if (theText.length > 0) {
        let split = theText.split("");
        split.pop();
        theText = split.join("")
      }
    }
    if (keys.includes(event.key)) {
      if (theText.length < 10) {
        theText += event.key
      }
    }
  }
  if (typing2) {
    if (event.key == "Enter") {
      typing2 = false;
      let f = parseInt(theText2);
      if (isNaN(f)) {
        theText2 = "5"
      }
    }
    if (event.key == "Backspace") {
      if (theText2.length > 0) {
        let split2 = theText2.split("");
        split2.pop();
        theText2 = split2.join("")
      }
    }
    if (keys.includes(event.key)) {
      if (theText2.length < 10) {
        theText2 += event.key
      }
    }
  }
});
function drawLoop() {
  if (menu && img1l && img2l) {
    drawMenu();
  }
  if (menu) {
    requestAnimationFrame(drawLoop)
  }
}
drawLoop();
const input_layer_length = 8;
const output_layer_length = 2;
let Initmutationdetails = [1, 1, 2];
let mutationdetails = [0.1, 0.1, 0.5];
let generation = 1;
let populationSize = 500;
/*
best activations
prelu
gelu
*/
const structure = [
  [input_layer_length, "prelu"],
  [16, "prelu"],
  [16, "prelu"],
  [output_layer_length, "TANH"]
];
let imported = false;
let colors = ["green", "blue", "purple", "orange", "grey"];
let isGameOver = true;
let score = 0;
let highestScore = 0;
let recordedGameplay = [];
let finalRecoredGameplays = [];

let birds = [];
const pipes = [];
let drawAmount = 5;
function start() {
  typing2 = false;
  menu = false;
  typing = false;
  let f = parseInt(theText);
  if (!isNaN(f)) {
    if (f >= 20) {
      populationSize = f
    }
  }
  let fe = parseInt(theText2);
  if (!isNaN(fe)) {
    drawAmount = fe;
  }
  for (let i = 0; i < populationSize; i++) {
    const newAI = new AI(structure);
    const IE = new AI(structure, importe);
    if (!wImp || ((wImp) && i != 0)) {
      newAI.MUTATE(...Initmutationdetails);
    }
    let lb = false;
    let bot = newAI;
    if (wImp) {
      if (i == 0) {
        bot = IE;
        lb = true;
      } else if (i > populationSize * 0.9) {
        bot = IE
      }
    }
    birds.push({
      ai: bot,
      dead: false,
      x: 50,
      y: canvas.height / 2,
      score: 0,
      radius: 20,
      velocity: 0,
      history: [],
      gravity: 1,
      history2: [],
      color: colors[i % colors.length],
      prevJump: false,
      fitness: 0,
      lastBest: lb,
    });

  }
  const pipeColors = ['green', 'red', 'purple', 'orange'];
  const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
  const gapHeight = 200;
  const minPipeHeight = 50;
  const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
  const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
  pipes.push({
    x: canvas.width,
    topHeight: randomTopHeight,
    bottomHeight: canvas.height - randomTopHeight - gapHeight,
    width: 40,
    color: randomColor
  });
  isGameOver = false;
  gameLoop();
}
function restarttt() {
  let sort = birds.sort((a, b) => b.fitness - a.fitness);
  for (let i = 0; i < populationSize; i++) {
    birds.push({
      ai: sort[0].ai,
      dead: false,
      x: 50,
      y: canvas.height / 2,
      score: 0,
      radius: 20,
      velocity: 0,
      history: [],
      history2: [],
      gravity: 1,
      color: colors[i % colors.length],
      prevJump: false,
      fitness: 0,
      lastBest: false,
      act: 0
    });

  }
  const pipeColors = ['green', 'red', 'purple', 'orange'];
  const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
  const gapHeight = 200;
  const minPipeHeight = 50;
  const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
  const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
  pipes.push({
    x: canvas.width,
    topHeight: randomTopHeight,
    bottomHeight: canvas.height - randomTopHeight - gapHeight,
    width: 40,
    color: randomColor
  });
}
function selectParents(population) {
  // Sort the population based on fitness in descending order
  population.sort((a, b) => b.fitness - a.fitness);
  // Select parents using a tournament selection approach
  let numParents = Math.floor(population.length * 0.1); // Select top 40% as parents
  if (numParents < 1) numParents = 1;
  const parents = [];

  for (let i = 0; i < numParents; i++) {
    const tournamentSize = Math.min(5, population.length); // Tournament size of 5 or less
    const competitors = [];

    // Randomly select competitors for the tournament
    for (let j = 0; j < tournamentSize; j++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      competitors.push(population[randomIndex]);
    }
    // Select the competitor with the highest fitness as parent
    const parent = competitors.reduce((prev, current) =>
      current.fitness > prev.fitness ? current : prev
    );
    parents.push(parent);
  }

  return parents;
}
let mutast = [0.1, 0.1, 0.5];
let bestai = "e";
function evolveNextGeneration() {
  let newBirds = [];
  for (let i = 0; i < populationSize; i++) {
    let score = birds.sort((a, b) => b.score - a.score);
    let sort = birds.sort((a, b) => b.fitness - a.fitness);
    const parents = selectParents(birds);
    if (!parents || parents == []) return console.log("no parents : " + parents);
    if (!parents.length || parents.length == 0) return console.log("no parents : " + parents);
    const childAI = parents[0].ai.COPY().CROSSOVER(parents[1].ai).MUTATE(...mutast);
    let b = sort[0].ai.MUTATE(...mutationdetails);
    if (score[0].score >= highestScore) {
      bestai = score[0].ai;
    }
    newBirds.push({
      ai: i == 0 ? sort[0].ai : i > populationSize * 0.9 ? b : childAI,
      dead: false,
      x: 50,
      y: canvas.height / 2,
      score: 0,
      radius: 20,
      velocity: 0,
      gravity: 1,
      prevJump: false,
      color: colors[i % colors.length],
      fitness: 0,
      history: [],
      history2: [],
      lastBest: i == 0 ? true : false,
      act: 0
    }); // Modify fitness as needed
  }
  if (newBirds) {
    birds = newBirds;
    generation++;
  }
}
function getAIAction(bird, inputs) {
  const outputs = bird.ai.PREDICT(inputs);
  bird.act = outputs;
  return [outputs[0] > outputs[1], [outputs]]; // Return true if jump output is higher
}



function drawBirds() {
  let sortBirds = birds.sort((a, b) => b.fitness - a.fitness);
  let drawnAmount = 0;
  for (let bird of sortBirds) {
    if (!bird.dead && drawnAmount < drawAmount) {
      context.save();
      context.translate(bird.x, bird.y);
      context.rotate(bird.velocity * 4 * Math.PI / 180);
      context.drawImage(img1, 0 - bird.radius * 4, 0 - bird.radius * 4, bird.radius * 7, bird.radius * 7)
      context.restore();
      drawnAmount++
    }
  }
}

function drawPipe(pipe) {
  context.fillStyle = pipe.color;
  context.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
  context.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipe.width, pipe.bottomHeight);
}

function generatePipes() {
  if (!isGameOver && (pipes.length === 0 || pipes[pipes.length - 1].x <= canvas.width - 400)) {
    const pipeColors = ['green', 'red', 'purple', 'orange'];
    const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
    const gapHeight = 200;
    const minPipeHeight = 50;
    const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
    const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    pipes.push({
      x: canvas.width,
      topHeight: randomTopHeight,
      bottomHeight: canvas.height - randomTopHeight - gapHeight,
      width: 40,
      color: randomColor
    });
  }
}

function checkCollisions() {
  for (let bird of birds) {
    if (bird.dead) continue;
    for (const pipe of pipes) {
      if (
        bird.x + bird.radius > pipe.x &&
        bird.x - bird.radius < pipe.x + pipe.width &&
        (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > canvas.height - pipe.bottomHeight)
      ) {
        // Collision detected
        bird.fitness -= 7.5
        let dist = 0;
        if (bird.y > pipe.topHeight - 100) {
          dist = bird.y - pipe.topHeight - 100;
        } else
          if (bird.y < pipe.topHeight - 100) {
            dist = pipe.topHeight - 100 - bird.y;
          } else {
            dist = 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
          }
        bird.fitness += 1 / dist
        bird.dead = true;
      }
    }
    if (bird.y - bird.radius < 0) {
      // Collision detected
      bird.fitness -= 10
      bird.dead = true;
    }
    if (bird.y > canvas.height - bird.radius) {
      bird.fitness -= 10
      bird.dead = true;
    }
  }
}

function updateScore() {
  let b = 0;
  for (let bird of birds) {
    for (const pipe of pipes) {
      if (bird.x > pipe.x + pipe.width && b === 0) {
        b++
        if (bird.score > 98) {
          mutationdetails = [0.1, 0.1, 0.0000000000000005];
          mutast = [0.1, 0.1, 0.0000000000000005];
        }
        let newSpeed = speed + 0.01;
        speed = Math.min(newSpeed, 10)
        bird.fitness += 100
        bird.score += 1;
        pipes.shift()
      }
    }
  }
}

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
let speed = 2;
function handleSpeed() {

}

let lastFrameTime = 0;
let frameCount = 0;



let lastInputs = [];
let autoTraining = false;
let seconds = -1;
let frame = 0;
let drawFPS = 0;
function doo() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black'; // Replace with your desired color

  // Fill a rectangle that covers the entire canvas
  context.fillRect(0, 0, canvas.width, canvas.height);

  let alive = 0;
  birds.forEach(bird => {
    if (!bird.dead) alive++
  })
  let alives = [];
  birds.forEach(bird => {
    if (!bird.dead) alives.push(bird);
  })
  if (alive == 0) isGameOver = true;
  if (!isGameOver) {
    frame++
    for (let bird of birds) {
      if (bird.dead || !bird.x) continue;
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
      bird.fitness += 1 / alive;
      const inputs = [
        bird.y / canvas.height,                        // Bird's Y position
        (pipes[0].x - bird.x) / canvas.width,          // Horizontal distance to next pipe
        (pipes[0].topHeight - bird.y) / canvas.height, // Vertical distance to top pipe
        (bird.y - (canvas.height - pipes[0].bottomHeight)) / canvas.height, // Vertical distance to bottom pipe
        bird.velocity * 0.01,                            // Bird's vertical velocity
        bird.prevJump ? 1 : 0,                               // Previous action (jump or not)
        bird.score * 0.00001,
        speed * 0.1
      ];
      lastInputs = inputs
      const shouldJump = getAIAction(bird, inputs);
      if (bird.score < 1) bird.history2.push([inputs, shouldJump[1]]);
      bird.history.push([inputs, shouldJump[1]])
      if (shouldJump[0]) {
        bird.prevJump = true;
        bird.velocity = -15; // Jumping effect
      } else {
        bird.prevJump = false;
      }
    }
    drawBirds();

    for (const pipe of pipes) {
      pipe.x -= speed;
      drawPipe(pipe);
    }

    updateScore();
    generatePipes();
    checkCollisions();

    let sortBirds = birds.sort((a, b) => b.score - a.score);
    let bestScore = sortBirds[0].score;
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Score: ${bestScore}`, 45, 25);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Gen: ${generation}`, 45, 50);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Speed: ${speed.toFixed(2)}`, 50, 75);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Alive: ${alive}`, 45, 100);
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    const currentFPS = 1000 / deltaTime;
    frameCount++;
    if (frame % 100 == 0) drawFPS = currentFPS;
    if (currentTime > 1000) {
      frameCount = 0;
      lastFrameTime = currentTime;
    }

    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`fps: \n${drawFPS.toFixed(0)}`, 45, 125);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Frame: ${frame}`, 500, 50);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`autoTraining: ${autoTraining}`, 500, 25);
    let notlast = [];
    alives.forEach(bird => {
      if (!bird.lastBest) {
        notlast.push(bird)
      }
    })
    const sort = notlast.sort((a, b) => b.fitness - a.fitness);
    if (sort[0]) {
      drawNeuros()
      const xy = [sort[0].x, sort[0].y, sort[0].fitness, sort[0].radius, sort[0].color];
      context.save();
      context.translate(sort[0].x, sort[0].y);
      context.rotate(sort[0].velocity * 4 * Math.PI / 180);
      context.drawImage(img1, 0 - sort[0].radius * 4, 0 - sort[0].radius * 4, sort[0].radius * 7, sort[0].radius * 7)
      context.restore();

      context.fillStyle = "cyan"; // Set the text color
      context.font = "20px Arial"; // Set the font and size
      context.textAlign = "center"; // Set text alignment to center
      context.textBaseline = "middle"; // Set baseline to middle

      // Calculate the position for the text
      const textX = xy[0];
      const textY = xy[1] - 40;

      // Draw the text inside the circle
      context.fillText("Best fit", textX, textY);
    }
    let oldbest = "";
    alives.forEach(bird => {
      if (bird.lastBest) {
        oldbest = bird
      }
    })
    if (oldbest) {
      context.save();
      context.translate(oldbest.x, oldbest.y);
      context.rotate(oldbest.velocity * 4 * Math.PI / 180);
      context.drawImage(img2, 0 - oldbest.radius * 4, 0 - oldbest.radius * 4, oldbest.radius * 7, oldbest.radius * 7)
      context.restore();
      context.fillStyle = "gold"; // Set the text color
      context.font = "20px Arial"; // Set the font and size
      context.textAlign = "center"; // Set text alignment to center
      context.textBaseline = "middle"; // Set baseline to middle

      // Calculate the position for the text
      const textX = oldbest.x;
      const textY = oldbest.y - 40;

      // Draw the text inside the circle
      context.fillText("Last best", textX, textY);
    }


  } else {
    let sssss = 0;
    frame = 0;
    let parents = birds.sort((a, b) => b.score - a.score);
    sssss = parents[0].score;
    if (seconds === -1 && autoTraining) {
      let data = [];
      birds.forEach(bird => {
        if (bird.score > 2) data.push(...bird.history2)
      });
      if (parents[0].score > 2) parents[0].ai.down(data);
      if (parents[0].score > 50 && false===true) {
        let dataset = parents[0].history.slice(0, -500);
        parents[0].ai.down(dataset);
      }
      seconds = 5
    }
    // Game Over screen
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.font = '36px Arial';
    context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 30);
    context.font = '18px Arial';
    if (!autoTraining) {
      let sortBirds = birds.sort((a, b) => b.score - a.score);
      let bestScore = sortBirds[0].score;
      highestScore = Math.max(highestScore, bestScore);
      context.fillText(`Score: ${bestScore}`, canvas.width / 2 - 60, canvas.height / 2);
      context.fillText(`Highest Score: ${highestScore}`, canvas.width / 2 - 70, canvas.height / 2 + 30);
      context.fillText('Press enter to start next gen', canvas.width / 2 - 100, canvas.height / 2 + 60);
      context.fillText('Press backSpace to export weights', canvas.width / 2 - 100, canvas.height / 2 + 90);
      context.fillText('Press 0 to export the ai', canvas.width / 2 - 100, canvas.height / 2 + 120);
      context.fillText(`Highest Fit ${birds[0].fitness}`, canvas.width / 2 - 100, canvas.height / 2 + 150);
    } else {

      context.fillText('Press 9 to turn of auto training.', canvas.width / 2 - 100, canvas.height / 2 + 30);
      context.fillText(`Auto starting in ${seconds} seconds.`, canvas.width / 2 - 100, canvas.height / 2 + 60);
      context.fillText(`score:${sssss}`, canvas.width / 2 - 100, canvas.height / 2 + 150);
    }

  }
  return false;
}
let mint = 10;
async function gameLoop() {
  await doo();
  await doo();
  await doo();
  await doo();

  requestAnimationFrame(gameLoop);
}
setInterval(function() {
  if (seconds > 0) seconds--;
}, 1000)
setInterval(function() {
  if (autoTraining && isGameOver && seconds == 0) {
    seconds = -1;
    evolveNextGeneration()
    dead = false;
    pipes.length = 0;
    speed = 2;
    const pipeColors = ['green', 'red', 'purple', 'orange'];
    const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
    const gapHeight = 200;
    const minPipeHeight = 50;
    const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
    const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    pipes.push({
      x: canvas.width,
      topHeight: randomTopHeight,
      bottomHeight: canvas.height - randomTopHeight - gapHeight,
      width: 40,
      color: randomColor
    });
    isGameOver = false;
  }
}, 0)
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && isGameOver && !menu) {
    evolveNextGeneration()
    dead = false;
    pipes.length = 0;
    speed = 2;
    const pipeColors = ['green', 'red', 'purple', 'orange'];
    const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
    const gapHeight = 200;
    const minPipeHeight = 50;
    const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
    const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    pipes.push({
      x: canvas.width,
      topHeight: randomTopHeight,
      bottomHeight: canvas.height - randomTopHeight - gapHeight,
      width: 40,
      color: randomColor
    });
    isGameOver = false;
  }
  if (event.keyCode === 81 && isGameOver && !menu) {
    restarttt()
    dead = false;
    pipes.length = 0;
    speed = 2;
    const pipeColors = ['green', 'red', 'purple', 'orange'];
    const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
    const gapHeight = 200;
    const minPipeHeight = 50;
    const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
    const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    pipes.push({
      x: canvas.width,
      topHeight: randomTopHeight,
      bottomHeight: canvas.height - randomTopHeight - gapHeight,
      width: 40,
      color: randomColor
    });
    isGameOver = false;
  }
  if (event.keyCode == 8 && isGameOver && !menu) {
    const parents = selectParents(birds);
    bestai.exportWeights(generation);
    parents[0].ai.exportWeights(generation);
  }
  if (event.keyCode == 48 && isGameOver && !menu) {
    const parents = selectParents(birds);
    parents[0].ai.exportai(generation, parents[0].ai);
    parents[0].ai.exportai(generation, bestai);
  }
  if (event.keyCode == 57 && !menu) {
    autoTraining = !autoTraining;
  }
  if (event.keyCode == 69) {
    console.log(lastInputs)
  }
});
canvas.addEventListener('click', (event) => {

  if (!menu && !isGameOver) {
    autoTraining = !autoTraining;
  }


  if (isGameOver && !menu) {
    evolveNextGeneration()
    dead = false;
    pipes.length = 0;
    speed = 2;
    const pipeColors = ['green', 'red', 'purple', 'orange'];
    const randomColor = pipeColors[Math.floor(Math.random() * pipeColors.length)];
    const gapHeight = 200;
    const minPipeHeight = 50;
    const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
    const randomTopHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
    pipes.push({
      x: canvas.width,
      topHeight: randomTopHeight,
      bottomHeight: canvas.height - randomTopHeight - gapHeight,
      width: 40,
      color: randomColor
    });
    isGameOver = false;
  }


})

const neuroCanvas = document.getElementById("neuroCanvas");
const neuroContext = neuroCanvas.getContext('2d');

function drawNeuros() {
  neuroContext.clearRect(0, 0, neuroCanvas.width, neuroCanvas.height);
  neuroContext.fillStyle = 'black'; // Replace with your desired color

  // Fill a rectangle that covers the entire canvas
  neuroContext.fillRect(0, 0, neuroCanvas.width, neuroCanvas.height);
  /*
    const sort = birds.sort((a, b) => b.fitness - a.fitness);
  let l = -1;
  for (let layer of sort[0].ai.layers) {
    l += 1;
    if (l > 0) {
      neuroContext.lineWidth = 2;
      neuroContext.strokeStyle = 'grey'
      let x = (l * (400 / sort[0].ai.layers.length));
      neuroContext.beginPath();
      neuroContext.moveTo(x, 100)
      neuroContext.lineTo(x, 540)
      neuroContext.stroke();
      neuroContext.closePath();
      let lw = -1;
      neuroContext.lineWidth = 4;
      for (let w of layer) {
        lw += 1;
        let y = 100 + (lw * (500 / layer.length));
        neuroContext.strokeStyle = 'red'
        if (sort[1].ai.layers) {
          if (sort[1].ai.layers[l]) {
            if (sort[1].ai.layers[lw]) {
              if (Math.abs(sort[1].ai.layers[l][lw].weights[0] - w.weights[0]) <= 1) {
                neuroContext.strokeStyle = 'yellow';
              }
              if (Math.abs(sort[1].ai.layers[l][lw].weights[0] - w.weights[0]) <= 0.2) {
                neuroContext.strokeStyle = 'green';
              }
              if (Math.abs(sort[1].ai.layers[l][lw].weights[0] - w.weights[0]) <= 0.02) {
                neuroContext.strokeStyle = 'blue';
              }
            }
          }
        }
        
        neuroContext.beginPath();
        neuroContext.arc(x, y, 25, 0, Math.PI * 2);
        neuroContext.stroke();
        neuroContext.closePath();
        neuroContext.fillStyle = 'white';
        neuroContext.font = '13px sans-serif';
        neuroContext.textAlign = 'center';
        neuroContext.fillText(w.weights[0].toFixed(1) + ' ' + w.weights[1].toFixed(1), x, y + 7)
        neuroContext.textAlign = 'left';
      }
    }
  }
  l++
  let x = (l * (400 / sort[0].ai.layers.length));
  let y = 300;
  let color = sort[0].prevJump ? "green" : "red"
  neuroContext.strokeStyle = color;
          neuroContext.beginPath();
        neuroContext.arc(x, y, 40, 0, Math.PI * 2);
        neuroContext.stroke();
        neuroContext.closePath();
          neuroContext.fillStyle = 'white';
        neuroContext.font = '15px sans-serif';
        neuroContext.textAlign = 'center';
        neuroContext.fillText([(((sort[0].act[0]*10).toFixed(2))*0.1).toFixed(2), (((sort[0].act[1]*10).toFixed(2))*0.1).toFixed(2)], x, y + 7)
        neuroContext.textAlign = 'left';
            neuroContext.fillStyle = 'white';
        neuroContext.font = '15px sans-serif';
        neuroContext.textAlign = 'center';
        neuroContext.fillText("This is updated each frame", neuroCanvas.width/2, 50)
        neuroContext.textAlign = 'left';
  */
}
