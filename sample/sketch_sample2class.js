// see https://github.com/shibomb/loopstate.js

class MyPoint {
    constructor(x, y, move) {
      this.x = new EaseInCircLoopState(
        x,
        x,
        move,
        (o) => {
          o.max = random(width);
        },
        (o) => {
          o.min = random(width);
        },
        {
          wait: 100,
        }
      );
  
      this.y = new EaseOutCircLoopState(
        y,
        y,
        move,
        (o) => {
          o.max = random(height);
        },
        (o) => {
          o.min = random(height);
        },
        {
          wait: 100,
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
      this.x.update();
      this.y.update();
      this.c.update();
    }
  
    display() {
      noStroke();
      fill(255, 255, 0, this.c.now);
      circle(this.x.now, this.y.now, 10);
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
  