const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const stack = document.querySelector("#stack");

async function onOrderButtonClick(e: Event) {
  console.log("loaf");

  const center = "translate(38vw, -18vw)";
  const moveToCenterKeyframes = [
    { transform: "translate(0vw, 0vw)" },
    { transform: center },
  ];

  const animationOptions = {
    duration: 3000,
    easing: "ease",
  };

  await eventLoaf.animate(moveToCenterKeyframes, animationOptions).finished;
  await eventLoaf.style.setProperty("transform", center);

  //   add
  const frame = document.createElement("div");
  await addFrameToLoaf("loaf", frame);

  // move to stack
  const stackPos = "translate(10vw, -18vw)";
  const moveToStackKeyframes = [{ transform: center }, { transform: stackPos }];
  await eventLoaf.animate(moveToStackKeyframes, animationOptions).finished;
  await eventLoaf.style.setProperty("transform", stackPos);

  eventLoaf.removeChild(frame);

  stack?.appendChild(frame);
}

function addFrameToLoaf(text: string, frame: HTMLDivElement) {
  frame.classList.add("frame", "carried-frame");

  const frameText = document.createElement("p");
  frameText.innerText = text;

  frame.appendChild(frameText);
  eventLoaf.appendChild(frame);
}

orderLoafButton?.addEventListener("click", onOrderButtonClick);
