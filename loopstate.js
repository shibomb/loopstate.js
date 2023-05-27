class LoopState {
  constructor(min, max, move, onMin, onMax) {
    this.now = min;
    this.to = max;
    this.min = min;
    this.max = max;

    this.move = move;

    this.onMin = onMin;
    this.onMax = onMax;
  }

  next() {
    if (this.to == this.min) {
      if (this.onMin) this.onMin();
    } else if (this.to == this.max) {
      if (this.onMax) this.onMax();
    }
    this.to = this.to == this.min ? this.max : this.min;
  }

  lerp(a, b, alpha) {
    return a + alpha * (b - a);
  }
}

class StepLoopState extends LoopState {
  update() {
    this.now += this.now < this.to ? this.move : -this.move;
    if (this.to == this.now) {
      this.next();
    }
  }
}

class LerpLoopState extends LoopState {
  update() {
    this.now = this.lerp(this.now, this.to, this.move);
    if (Math.abs(this.to - this.now) < 0.01) {
      this.next();
    }
  }
}
