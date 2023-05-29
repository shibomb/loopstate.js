// see https://github.com/shibomb/loopstate.js

class MyPoint {
    constructor(x, y, move) {
      this.min = createVector(x, y);
      this.max = createVector(x + 0.1, y + 0.1); // hack
      this.dist = this.min.dist(this.max);
  
      this.state = new EaseInOutCircLoopState(
        0,
        this.dist,
        move,
        undefined,
        (o) => {
          this.min = this.max;
          this.max = createVector(random(width), random(height));
          this.dist = this.min.dist(this.max);
          
          o.max = this.dist;
          // o.now = 0; // if you use options.wait, set now to Zero.
        },
        {
          // wait: 1000,
          loopMode: "restart",
        }
      );
  
      this.c = new StepLoopState(
        0,
        255,
        1,
        (o) => {
          o.max = random(0, 255);
        },
        (o) => {
          o.min = random(0, 255);
        }
      );
    }
  
    update() {
      this.state.update();
      this.c.update();
    }
  
    display() {
      noStroke();
      fill(255, 255, 0, this.c.now);
  
      const pos = p5.Vector.lerp(this.min, this.max, this.state.now / this.dist);
  
      circle(pos.x, pos.y, 10);
    }
  }
  
  // ----------------------------------------
  // main
  // ----------------------------------------
  
  let state;
  
  function setup() {
    createCanvas(100, 100);
  
    state = new MyPoint(width / 2, height / 2, 0.01);
  }
  
  function draw() {
    background(0);
  
    state.update();
    state.display();
  }
  