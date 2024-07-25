class Node {
  constructor(weights, bias) {
    this.weights = weights;
    this.bias = bias;
  }

  dot(layer, weights) {
    return layer.reduce((sum, value, index) => sum + value * weights[index], 0);
  }

  output(input, activation) {
    return activation(this.dot(input, this.weights) + this.bias);
  }

  copy() {
    return new Node([...this.weights], this.bias);
  }
}

const random = {
  random: (i1, i2) => Math.random() * (i2 - i1) + i1,
  randint: (i1, i2) => Math.random() * (i2 - i1) + i1,
  uniform: (i1, i2) => Math.random() * (i2 - i1) + i1,
  gauss: (mean = 0, stdev = 1) => {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }
};

class AI {
  constructor(units, weights) {
    this.layers = [];
    this.units = units || [];
    this.weights = weights || [];
    this.activationFunctions = [];
    this.fitness = 0;

    if (this.weights.length === 0) {
      this.initializeLayers();
    } else {
      this.loadWeights(weights);
    }
  }

  initializeLayers() {
    for (let i = 0; i < this.units.length; i++) {
      const layer = [];

      if (i > 0) {
        for (let j = 0; j < this.units[i][0]; j++) {
          const weights = [];
          const limit = Math.sqrt(2 / (this.units[i - 1][0] + this.units[i][0]));
          for (let k = 0; k < this.units[i - 1][0]; k++) {
            weights.push(random.gauss(0, limit));
          }
          const bias = random.gauss(0, 0.1);
          layer.push(new Node(weights, bias));
        }
        this.activationFunctions.push(this.units[i][1]);
      } else {
        for (let j = 0; j < this.units[i][0]; j++) {
          layer.push(new Node([0], 0));
        }
        this.activationFunctions.push(null);
      }
      this.layers.push(layer);
    }
  }

  loadWeights(weights) {
    for (const layer of weights[0]) {
      const nodes = [];
      for (const node of layer) {
        nodes.push(new Node(node[0], node[1]));
      }
      this.layers.push(nodes);
    }
    this.activationFunctions = weights[1];
  }

  copy() {
    return new AI([], this.getWeightsAndBiases());
  }

  mutate(weightRate, biasRate, weightChange, biasChange = 0) {
    for (const layer of this.layers.slice(1)) {
      for (const node of layer) {
        for (let i = 0; i < node.weights.length; i++) {
          if (random.randint(0, 1) <= weightRate) {
            node.weights[i] += random.gauss(0, weightChange);
          }
          if (random.randint(0, 1) <= biasRate) {
            node.bias += random.gauss(0, biasChange);
          }
        }
      }
    }
    return this;
  }

  randomize() {
    for (const layer of this.layers.slice(1)) {
      for (const node of layer) {
        for (let i = 0; i < node.weights.length; i++) {
          node.weights[i] = random.uniform(-1, 1);
          node.bias = random.uniform(-1, 1);
        }
      }
    }
    return this;
  }

  crossover(partner) {
    for (const [i, layer] of this.layers.entries()) {
      if (i > 0) {
        for (let j = 0; j < layer.length; j++) {
          if (random.randint(0, 1) === 1) {
            this.layers[i][j] = partner.layers[i][j].copy();
          }
        }
      }
    }
    return this;
  }

  getWeightsAndBiases() {
    return [
      this.layers.map(layer => layer.map(node => [node.weights, node.bias])),
      [...this.activationFunctions]
    ];
  }

  setWeightsAndBiases(data) {
    this.layers = data[0];
    this.activationFunctions = data[1];
  }

  exportAI(gen, ai) {
    this.downloadJSON(`gen${gen}weights.json`, ai.getWeightsAndBiases());
  }

  downloadJSON(filename, data) {
    const jsonContent = JSON.stringify(data);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.textContent = 'Download';
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  importArchitecture(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const architecture = JSON.parse(reader.result);
      this.setWeightsAndBiases(architecture);
      console.log("Architecture imported");
    };
    reader.readAsText(file);
  }

  exportWeights(gen) {
    this.downloadJSON(`gen${gen}weights.json`, this.getWeightsAndBiases());
  }

  importWeights(weightsAndBiases) {
    this.setWeightsAndBiases(weightsAndBiases);
  }

  decodeActivationFunction(name) {
    const fnName = name.toLowerCase();
    const functions = {
      sigmoid: x => 1 / (1 + Math.exp(-x)),
      relu: x => Math.max(0, x),
      tanh: Math.tanh,
      elu: (x, alpha = 1.0) => (x < 0 ? alpha * (Math.exp(x) - 1) : x),
      swish: (x, beta = 1.0) => x * (1 / (1 + Math.exp(-beta * x))),
      prelu: (x, alpha = 0.01) => (x < 0 ? alpha * x : x),
      gelu: x => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
      selu: (x, alpha = 1.67326, scale = 1.0507) => (x > 0 ? scale * x : scale * (alpha * (Math.exp(x) - 1))),
    };
    return functions[fnName] || functions.relu;
  }

  predictLayer(layer, input, activation) {
    return this.layers[layer].map(node => node.output(input, activation));
  }

  predict(input) {
    for (let i = 1; i < this.layers.length; i++) {
      input = this.predictLayer(i, input, this.decodeActivationFunction(this.activationFunctions[i]));
    }
    return input;
  }
}
