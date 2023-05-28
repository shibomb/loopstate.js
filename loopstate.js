class LoopState {
  constructor(min, max, move, onMin, onMax, options = {}) {
    this.options = options;

    this.now = this.options.default ? this.options.default : min;

    this.min = min;
    this.max = max;

    this.move = move;

    this.onMin = onMin;
    this.onMax = onMax;

    this.loopMode = this.options.loopMode ? this.options.loopMode : "reverse"; // 'none', 'restart', 'reverse' (default)
    this.direction = this.options.direction ? this.options.direction : 1;
    this.lerpTouch = this.options.lerpTouch ? this.options.lerpTouch : 0.01;
    this.wait = this.options.wait ? this.options.wait : null;

    this.progress = 0;
  }

  update() {
    if (this.waitTimer) return;

    this.updateProcess();
  }

  updateProcess() {
    // implement in sub class
  }

  next() {
    // call event callback
    if (this.direction === 1 && this.now >= this.max) {
      if (this.onMax) this.onMax(this);
    } else if (this.direction === -1 && this.now <= this.min) {
      if (this.onMin) this.onMin(this);
    }

    // wait or next
    if (this.wait) {
      this.waitTimer = setTimeout(() => {
        this.nextProcess();
      }, this.wait);
    } else {
      this.nextProcess();
    }
  }

  nextProcess() {
    this.waitTimer = null;

    // next
    if (this.loopMode === "reverse") {
      this.direction *= -1;
      this.progress = 0;
    } else if (this.loopMode === "restart") {
      this.now = this.options.default ? this.options.default : this.min;
      this.progress = 0;
    } else {
      this.waitTimer = "stop";
    }

  }

  // calc progress (read only)
  calcReadOnlyProgress() {
    this.progress = (this.now - this.min) / (this.max - this.min);
    if (this.direction === -1) {
      this.progress = 1 - this.progress;
    }
  }

  lerp(a, b, alpha) {
    return a + alpha * (b - a);
  }
}

class StepLoopState extends LoopState {
  updateProcess() {
    this.now += this.move * this.direction;
    this.calcReadOnlyProgress();

    if (
      (this.direction === 1 && this.now >= this.max) ||
      (this.direction === -1 && this.now <= this.min)
    ) {
      this.now = this.direction === 1 ? this.max : this.min;
      this.next();
    }
  }
}

class LerpLoopState extends LoopState {
  updateProcess() {
    let to = this.direction === 1 ? this.max : this.min;

    this.now = this.lerp(this.now, to, this.move);
    this.calcReadOnlyProgress();

    if (Math.abs(to - this.now) < this.lerpTouch) {
      this.now = this.direction === 1 ? this.max : this.min;
      this.next();
    }
  }
}

class AbstractEasingLoopState extends LoopState {
  updateProcess() {
    let from = this.direction === 1 ? this.min : this.max;
    let to = this.direction === 1 ? this.max : this.min;

    this.progress = this.progress + this.move;
    if (this.progress > 1) this.progress = 1;
    this.now = this.lerp(from, to, this.calc(this.progress));

    if (Math.abs(to - this.now) < this.lerpTouch) {
      this.now = this.direction === 1 ? this.max : this.min;
      this.next();
    }
  }

  calc(x) {
    return x;
  }
}

class LinerLoopState extends AbstractEasingLoopState {}

class EaseInCircLoopState extends AbstractEasingLoopState {
  calc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }
}

class EaseOutCircLoopState extends AbstractEasingLoopState {
  calc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }
}

class EaseInOutCircLoopState extends AbstractEasingLoopState {
  calc(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }
}
