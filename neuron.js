const {create} = require ("./utils.js");
// "the perceptron algorithim"
// "1.  for every input, multiply that input by its weight"
// "2. Sum all of the weighted inputs"
// "3. Compute the output of the perceptron based on that sum passed through\n"
// "an activation function. The sign (+/-) of the sum"

Array.prototype.each = (function Array$prototype$each$(f) {
    /* Array.prototype.each neuron.sibilant:31:0 */

    Array.prototype.forEach.call(this, f);
    return this;
});
var random = (function random$(min = 0, max = 1) {
    /* random ../../deps.sibilant:61:8 */

    return (Math.random() * ((max - min) + min));
});
const e = Math.E;
const pow = Math.pow;
const abs = Math.abs;
var sigmoid = (function sigmoid$(t) {
    /* sigmoid neuron.sibilant:83:0 */

    return (1 / (1 + pow(e, (t))));
});
var threshold = (function threshold$(n) {
    /* threshold neuron.sibilant:88:0 */

    return (function() {
        if (n > 0) {
            return 1;
        } else {
            return -1;
        }
    }).call(this);
});
const Neuron = {
    init({
        inputs = [],
        weights = [],
        stepSize = 1e-9,
        activation = threshold,
        neuron = this
    }) {

        this.inputs = inputs;
        this.weights = weights;
        this.stepSize = stepSize;
        this.activation = activation;
        this.neuron = neuron;
        return this;

    },
    randomize(n = this.n, weights = this.weights) {

        weights.push(1);
        (function() {
            /* neuron.sibilant:18:8 */

            let w = weights;
            for (let i = 0; i < n; ++(i)) {
                w[(i + 1)] = random();
            };
            return w;
        }).call(this);
        return this;

    },
    errors(output = this.output, expected = this.expected, neuron = this.neuron) {

        return neuron.error = (expected - output);

    },
    delta(err = this.err, inputs = this.inputs, weights = this.weights, stepSize = this.stepSize, neuron = this.neuron) {

        return inputs.each((err, i) => {

            let deltaW = (err * inputs[i] * stepSize);
            return weights[i] += deltaW;

        });

    },
    train(expected = this.expected, inputs = this.inputs, weights = this.weights, activation = this.activation, forward = this.forward, delta = this.delta, errors = this.errors, stepSize = this.stepSize, neuron = this.neuron) {

        return delta(errors(forward(inputs, weights, activation, neuron), expected, neuron), inputs, weights, stepSize);

    },
    forward(inputs = this.inputs, weights = this.weights, activation = this.activation, neuron = this.neuron) {

        neuron.output = activation(inputs.reduce((sum, input, n) => {

            let weight = weights[n];
            return (sum + (input * weight));

        }, 0));
        return neuron.output;

    }
};
const Trainer = {
    init(neuron = this.neuron, data = this.data, wrong = 0, right = 0, total = 0) {

        this.neuron = neuron;
        this.data = data;
        this.wrong = 0;
        this.right = 0;
        this.total = 0;
        return this;

    },
    get successRate() {

        return (this.right / this.total);

    },
    run(neuron = this.neuron, data = this.data) {

        return data.each(({
            expected,
            inputs
        }) => {

            neuron.train(expected, inputs);
            ++(this.total);
            (function() {
                if (neuron.error !== 0) {
                    return ++(this.right);
                } else {
                    return ++(this.wrong);
                }
            }).call(this);
            return console.log("expected", expected, "inputs", inputs, "output", neuron.output, "error", neuron.error, "success rating", this.successRate);

        });

    },
    test(neuron = this.neuron, data = this.data) {

        return data.each(({
            expected,
            inputs
        }) => {

            let guess = neuron.forward(inputs);
            let error = neuron.errors();
            return console.log("expected      ", expected, "guess         ", guess, "output        ", neuron.output, "error         ", error, "success rating", this.successRate);

        });

    }
};
var lineFromSlope = (function lineFromSlope$(m, x, b) {
    /* line-from-slope neuron.sibilant:171:0 */

    return ((m * x) + b);
});
var createTrainingData = (function createTrainingData$(n, f) {
    /* create-training-data neuron.sibilant:175:0 */

    return (function() {
        /* neuron.sibilant:18:8 */

        let r = [];
        for (let i = 0; i < n; ++(i)) {
            let [x, y] = [random(-500, 500), random(-500, 500)];
            r.push({
                expected: (function() {
                    if (y < f(x)) {
                        return -1;
                    } else {
                        return 1;
                    }
                }).call(this),
                inputs: [1, x, y]
            })
        };
        return r;
    }).call(this);
});
let T = create(Trainer)(create(Neuron)({}).randomize(2), createTrainingData(100000, (x) => (lineFromSlope(10, x, 7))));
T.run();
T.test();
var testInput = (function testInput$() {
    /* test-input neuron.sibilant:191:0 */

    let [x, y] = random(-500, 500);
    return {
        expected: (function() {
            if (y < f(x)) {
                return -1;
            } else {
                return 1;
            }
        }).call(this),
        inputs: [x, y]
    };
});
const Network = {
    init(inputs = this.inputs, hiddenLayers = this.hiddenLayers, outputs = this.outputs) {

        this.inputs = inputs;
        this.hiddenLayers = hiddenLayers;
        this.outputs = outputs;
        return this;

    },
    train() {

    },
    forward() {

    },
    backward() {

    }
};
