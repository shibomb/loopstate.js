class MyObject {
  constructor(props) {
    this.props = props;
    this.r = 0;

    this.n = new StepLoopState(3, 12, 1);

    this.state = new LerpLoopState(1, 2, 0.1, () => {
      this.n.update();
    });
  }

  update() {
    // this.r = this.r + deltaTime * 0.01;

    this.state.update();
  }

  display() {
    push();

    translate(this.props.x, this.props.y);
    rotate(radians(this.r));

    noStroke();
    fill(255);

    beginShape();
    const r = this.props.size;

    const step = 360 / this.n.now;

    for (let d = 0 + 90; d < 360 + 90; d += step) {
      const rad = radians(d);
      const radIn = radians(d + step / 2);
      vertex(r * cos(rad), r * -sin(rad));
      vertex(
        (r / this.state.now) * cos(radIn),
        (r / this.state.now) * -sin(radIn)
      );
    }
    endShape();

    pop();
  }
}

let objs = [];
function setup() {
  createCanvas(windowWidth, windowHeight);

  objs.push(new MyObject({ x: width / 2, y: height / 2, size: 100 }));
}

function draw() {
  background(0);

  for (const obj of objs) {
    obj.update();
  }

  for (const obj of objs) {
    obj.display();
  }
}
