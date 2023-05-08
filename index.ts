// Elements
const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const stack = document.querySelector("#stack") as HTMLElement;
const eventQueue = document.querySelector("#event-queue");
const webAPI = document.querySelector("#web-api");

// Coords
const startCoords = [0, 0];
const centerCoords = [38, -18];
const eventQueueCoords = [40, 4];
const stackCoords = [10, -18];
const webAPICoords = [78, -18];

async function onOrderButtonClick(e: Event) {
  await moveToLocation([0, 0], centerCoords, eventLoaf);

  const frame = document.createElement("div");
  await addFrameToLoaf(frame, "orderLoaf()");

  await moveToLocation(centerCoords, stackCoords, eventLoaf);
  addFrameToBox(frame, stack);

  setTimeout(() => addOrderInstructions("prepare()"), 1000);
  setTimeout(() => addOrderInstructions("sendToKitchen()"), 2000);
  setTimeout(async () => {
    const topStackFrame = stack?.lastElementChild;
    if (topStackFrame && webAPI) {
      addFrameToLoaf(topStackFrame);
      await moveToLocation(stackCoords, webAPICoords, eventLoaf);
      addFrameToBox(topStackFrame, webAPI);
      moveToLocation(webAPICoords, startCoords, eventLoaf);
    }
  }, 3000);
}

function addFrameToLoaf(frame: Element, text?: string) {
  frame.classList.add("frame", "carried-frame");

  const frameText = document.createElement("p");
  if (text) frameText.innerText = text;

  frame.appendChild(frameText);
  eventLoaf.appendChild(frame);
}
function addFrameToBox(frame: Element, box: Element) {
  eventLoaf.removeChild(frame);
  frame.classList.remove("carried-frame");
  box.appendChild(frame);
}
function addOrderInstructions(text: string) {
  const frame = document.createElement("div");
  frame.classList.add("frame");
  const frameText = document.createElement("p");
  frameText.innerText = text;
  frame.appendChild(frameText);
  stack?.appendChild(frame);
}

async function moveToLocation(
  currentCoords: number[],
  destinationCoords: number[],
  cat: Element
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
