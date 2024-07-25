//shadow attempted to rewrite legend's code
const NODE = function(w, b) {

  this.weights = w
  this.bias = b

  this.DOT = (layer, weights) => {
    i = 0
    var c = layer.map(function(e, i) {
      return [e, weights[i]];
    });
    for (let q of c) { //wow, this works in js
      i += q[0] * q[1]
    }
    return i
  }

  this.OUTPUT = (inp, act) => {
    return act(this.DOT(inp, this.weights) + this.bias);
  }

  this.COPY = () => {
    return new NODE([...this.weights], this.bias)
  }
}

function random(i1, i2) {
  return Math.random() * (i2 - i1) + i1
}
random.randint = function(i1, i2) {
  return Math.random() * (i2 - i1) + i1
}
random.uniform = function(i1, i2) {
  return Math.random() * (i2 - i1) + i1
}
random.gauss = function(mean = 0, stdev = 1) {
  //https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve

  let u = 1 - Math.random(); //Converting [0,1) to (0,1)
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

const AI = function(units, weights) {

  this.layers = []
  this.units = units || []
  this.weights = weights || []
  this.activation_functions = []
  this.fitness = 0
  //console.log("CREATED", this)
  if (this.weights.length == 0) {
    for (let i = 0; i < this.units.length; i++) {
      if (i > 0) {
        appending2 = []
        for (let i2 = 0; i2 < units[i][0]; i2++) {
          appending = []
          for (let i3 = 0; i3 < units[i - 1][0]; i3++) {
            const limit=Math.sqrt(2/(units[i-1][0]+units[i][0]));
            let random_weight = random.gauss(0, limit)
            appending.push(random_weight)
          }
          random_bias = random.gauss(0, 0.1)
          appending2.push(new NODE(appending, random_bias))
        }
        this.layers.push(appending2)
        this.activation_functions.push(units[i][1])
      }
      else {
        appending2 = []
        for (let i2 = 0; i2 < units[i][0].length; i2++) {
          appending2.push(new NODE([0], 0))
        }
        this.layers.push(appending2)
        this.activation_functions.push(0)
      }
    }
  } else {
    for (let i of weights[0]) {
      appending = []
      for (let e of i) {
        appending.push(new NODE(e[0], e[1]))
      }
      this.layers.push(appending)
    }
    this.activation_functions = weights[1];
  }
  //console.log("FINISH CREATED", this)
  this.COPY = () => {
    let wb = this.GET_WEIGHTS_AND_BIASES();
    //console.log(wb, "YES");
    return new AI([], wb);
  }

  this.MUTATE = (r, r2, p, p2 = 0) => {
    for (let L = 0; L < this.layers.length; L++) {
      if (L != 0) {
        for (let N of this.layers[L]) {
          for (let W = 0; W < N.weights.length; W++) {
            if (random.randint(0, 1) <= r) {
              N.weights[W] += random.gauss(0, p)
            }
            if (random.randint(0, 1) <= r2) {
              N.bias +=  random.gauss(0, p)
            }

          }
        }
      }
    }
    return this;
  }
  this.RANDOMIZE = () => {
    for (let L = 0; L < this.layers.length; L++) {
      if (L != 0) {
        for (let N = 0; N < this.layers[L].length; N++) {
          for (let W = 0; W < this.layers[L][N].weights.length; W++) {
            this.layers[L][N].weights[W] = random.uniform(-1, 1);
            this.layers[L][N].bias = random.uniform(-1, 1);
          }
        }
      }
    }
    return this
  }
  this.CROSSOVER = (p) => {
    for (let L = 0; L < this.layers.length; L++) {
      if (L != 0) {
        for (let N = 0; N < this.layers[L].length; N++) {
          if (random.randint(0, 1) == 1) {
            this.layers[L][N] = p.layers[L][N].COPY()
          }
        }
      }
    }
    return this;
  }
  this.GET_WEIGHTS_AND_BIASES = () => {
    let ret = []
    for (let different_i = 0; different_i < this.layers.length; different_i++) {
      let i = this.layers[different_i]
      appending = [];
      for (let e = 0; e < i.length; e++) {
        let weights = [];
        /*for (let w of i[e].weights) {
          weights.push(w);
        }*/
        //console.log(i[e].weights)
        appending.push([i[e].COPY().weights, i[e].bias])
      }
      ret.push(appending)
    }
    //console.log(ret, "ret")
    return [ret, [...this.activation_functions]]
  }
  this.SET_WEIGHTS_AND_BIASES = (array) => {
    this.layers = array[0]
    this.activation_functions = array[1]
  }
  this.exportai = (gen, ai) => {
  const jsonContent = JSON.stringify(ai.GET_WEIGHTS_AND_BIASES());
  const blob = new Blob([jsonContent], { type: 'application/json' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `gen${gen}weights.json`;
  a.textContent = 'Download Architecture';
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(a);
  return console.log("ai exported");
  };
this.down = (text) => {

  const jsonContent = JSON.stringify(text);
  const blob = new Blob([jsonContent], { type: 'application/json' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `dataset.json`;
  a.textContent = 'Download Architecture';
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(a);
  return console.log("Architecture exported");
};
// Import the architecture
this.importArchitecture = async (fileInput) => {
  const file = fileInput.files[0];
  if (!file) return;

  const fileContent = await file.text();
  const architecture = JSON.parse(fileContent);

  for (let i = 0; i < architecture.layers.length; i++) {
    for (let j = 0; j < architecture.layers[i].length; j++) {
      this.layers[i][j].weights = architecture.layers[i][j].weights;
      this.layers[i][j].bias = architecture.layers[i][j].bias;
    }
  }

  this.activation_functions = architecture.activation_functions;

  console.log("Architecture imported");
};
// Export the weights and biases
this.exportWeights = (gen) => {
    const jsonContent = JSON.stringify(this.GET_WEIGHTS_AND_BIASES());
  const blob = new Blob([jsonContent], { type: 'application/json' });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a download link and trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = `gen${gen}weights.json`;
  a.textContent = 'Download Weights';
  document.body.appendChild(a);
  a.click();

  // Clean up by revoking the object URL
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
  return console.log("exported");
};

// Import the weights and biases
this.importWeights = (weightsAndBiases) => {
  for (let i = 0; i < weightsAndBiases.length; i++) {
    for (let j = 0; j < weightsAndBiases[i].length; j++) {
      this.layers[i][j].weights = weightsAndBiases[i][j].weights;
      this.layers[i][j].bias = weightsAndBiases[i][j].bias;
    }
  }
}; 
  this.SIGMOID = (x) => {
    if (Math.abs(x) < 10) {
      return 1 / (1 + (2.718281828459045) ** (-x))
    } else if (x <= -10) {
      return 0
    } else {
      return 1
    }
  }
  this.RELU = (x) => {
    if (x < 0) {
      return 0
    }
    return x
  }
  this.TEST = (x) => {
    
    return x*0.0001
  }
  this.TANH = (x) => {
    return Math.tanh(x)
  }
  this.elu = (x, alpha = 1.0) =>{return x < 0 ? alpha * (Math.exp(x) - 1) : x;}
  this.swish = (x, beta = 1.0) =>{
    return x * (1 / (1 + Math.exp(-beta * x)));
  }
  this.prelu =(x, alpha = 0.01)=> {
    return x < 0 ? alpha * x : x;
  }
  this.gelu=(x) =>{
    return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3))));
  }
  this.selu = (x, alpha = 1.67326, scale = 1.0507) => {
    return (x > 0) ? scale * x : scale * (alpha * (Math.exp(x) - 1));
  }
  this.PREDICT_LAYER = (layer, inp, act) => {

    output = []
    for (let i = 0; i < this.layers[layer].length; i++) {
      let out = this.layers[layer][i].OUTPUT(inp, act);
      output.push(out);
      this.layers[layer][i].weights[1] = out;
    }
    return output
  }

  this.DECODE_ACTIVATION_FUNCTION = (b) => {
    let x = b.toLowerCase();
      if (x == "sigmoid") {
          return this.SIGMOID;
      } else if (x == "tanh") {
          return this.TANH;
      }else if(this[x]){
        return this[x];
      } else{
          return this.RELU;
      }
  }
  this.PREDICT = (inp) => {
    for (let i = 0; i < this.layers.length - 1; i++) {
      inp = this.PREDICT_LAYER(i + 1, inp, this.DECODE_ACTIVATION_FUNCTION(this.activation_functions[i + 1]))
    }
    return inp
  }
}
