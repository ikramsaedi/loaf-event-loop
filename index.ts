const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const stack = document.querySelector("#stack");
const eventQueue = document.querySelector("#event-queue");

async function onOrderButtonClick(e: Event) {
  await moveToLocation([0, 0], [38, -18]);

  //   add
  const frame = document.createElement("div");
  await addFrameToLoaf("orderLoaf()", frame);
  await moveToLocation([38, -18], [40, 4]);

  // stack = [10, -18]

  eventLoaf.removeChild(frame);
  frame.classList.remove("carried-frame");

  eventQueue?.appendChild(frame);

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

async function moveToLocation(
  currentCoords: number[],
  destinationCoords: number[]
) {
  const animationOptions = {
    duration: 3000,
    easing: "ease",
  };

  const current = `translate(${currentCoords[0]}vw, ${currentCoords[1]}vw)`;
  const destination = `translate(${destinationCoords[0]}vw, ${destinationCoords[1]}vw)`;
  const moveToQueueKeyframes = [
    { transform: current },
    { transform: destination },
  ];

  await eventLoaf.animate(moveToQueueKeyframes, animationOptions).finished;
  await eventLoaf.style.setProperty("transform", destination);
}

orderLoafButton?.addEventListener("click", onOrderButtonClick);
