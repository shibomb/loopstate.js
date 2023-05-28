let objs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  const ST = 100;
  const ED = width - 100;

  const onMin = (obj) => {
    console.log(`${obj.constructor.name} ${obj.loopMode}:min`);
  };
  const onMax = (obj) => {
    console.log(`${obj.constructor.name} ${obj.loopMode}:max`);
  };

  // examples

  objs.push(new StepLoopState(ST, ED, 1, onMin, onMax));

  objs.push(new LerpLoopState(ST, ED, 0.1, onMin, onMax));

  objs.push(new LinerLoopState(ST, ED, 0.01, onMin, onMax, { wait: 500 }));
  objs.push(
    new LinerLoopState(ST, ED, 0.01, onMin, onMax, {
      wait: 500,
      loopMode: "restart",
    })
  );
  objs.push(
    new LinerLoopState(ST, ED, 0.01, onMin, onMax, {
      wait: 500,
      loopMode: "none",
    })
  );

  objs.push(
    new EaseInCircLoopState(ST, ED, 0.01, onMin, onMax, {
      wait: 1000,
    })
  );

  objs.push(
    new EaseOutCircLoopState(ST, ED, 0.01, onMin, onMax, {
      wait: 1500,
    })
  );

  objs.push(
    new EaseInOutCircLoopState(ST, ED, 0.01, onMin, onMax, {
      wait: 2000,
    })
  );
}

function draw() {
  background(0);

  // guidance
  stroke("red");
  line(100, 0, 100, height);
  line(width - 100, 0, width - 100, height);

  // examples
  const step = (height - 200) / objs.length;
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];

    obj.update();

    // display
    stroke(0);
    fill(255);
    circle(obj.now, i * step + 100, 10);

    // info
    stroke(0);
    fill(255);
    text(
      `${obj.constructor.name} : ${obj.move} : ${obj.loopMode}`,
      10,
      i * step + 90
    );
    text(`${~~(obj.progress * 100)}%`, 10, i * step + 110);
    text(`x=${~~obj.now}`, width - 90, i * step + 90);
  }
}
