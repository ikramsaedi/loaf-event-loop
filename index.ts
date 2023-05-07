const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const stack = document.querySelector("#stack");

async function onOrderButtonClick(e: Event) {
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
  await addFrameToLoaf("orderLoaf()", frame);

  // move to stack
  const stackPos = "translate(10vw, -18vw)";
  const moveToStackKeyframes = [{ transform: center }, { transform: stackPos }];
  await eventLoaf.animate(moveToStackKeyframes, animationOptions).finished;
  await eventLoaf.style.setProperty("transform", stackPos);

  eventLoaf.removeChild(frame);
  frame.classList.remove("carried-frame");

  stack?.appendChild(frame);

  setTimeout(() => addOrderInstructions("sendOrder()"), 1000);
  setTimeout(() => addOrderInstructions("confirmOrder()"), 2000);
}

function addFrameToLoaf(text: string, frame: HTMLDivElement) {
  frame.classList.add("frame", "carried-frame");

  const frameText = document.createElement("p");
  frameText.innerText = text;

  frame.appendChild(frameText);
  eventLoaf.appendChild(frame);
}

function addOrderInstructions(text: string) {
  // give order to kitchen
  // bake loaf
  // serve loaf to customer

  const frame = document.createElement("div");
  frame.classList.add("frame");
  const frameText = document.createElement("p");
  frameText.innerText = text;
  frame.appendChild(frameText);
  stack?.appendChild(frame);
}

orderLoafButton?.addEventListener("click", onOrderButtonClick);

fetch("https://loaf.dev").then((result) => console.log(result));

console.log("this will log before we see the result");

const process_control_block = {
  state: "new",
  id: 1234,
  registers: "memory assigned to the process",
};

const thread_control_block = {
  state: "new",
  id: 278,
  process_id: 1234,
  registers: "same as memory assigned to parent process",
};
