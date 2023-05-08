// Elements
const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const chefLoaf = document.querySelector("#chef-loaf") as HTMLElement;
const stack = document.querySelector("#stack") as HTMLElement;
const eventQueue = document.querySelector("#event-queue");
const webAPI = document.querySelector("#web-api");

// Coords
const startCoords = [0, 0];
const centerCoords = [38, -18];
const eventQueueCoords = [40, 4];
const stackCoords = [10, -18];
const webAPICoords = [78, -18];

// This lets me chain timeouts
function promiseTimeout(callback: () => any, timeout: number) {
  return new Promise<void>((resolve) => {
    const resolver = () => {
      callback();
      resolve();
    };
    setTimeout(resolver, timeout);
  });
}

async function onOrderButtonClick(e: Event) {
  await moveToLocation([0, 0], centerCoords, eventLoaf);

  const frame = document.createElement("div");
  await addFrameToLoaf(frame, "orderLoaf()");

  await moveToLocation(centerCoords, stackCoords, eventLoaf);
  addFrameToBox(frame, stack);

  await promiseTimeout(() => addOrderInstructions("prepare()"), 1000);
  await promiseTimeout(() => addOrderInstructions("sendToKitchen()"), 1000);

  await promiseTimeout(async () => {
    const topStackFrame = stack?.lastElementChild;
    if (topStackFrame && webAPI && chefLoaf) {
      addFrameToLoaf(topStackFrame);
      await moveToLocation(stackCoords, webAPICoords, eventLoaf);
      addFrameToBox(topStackFrame, webAPI);
      await moveToLocation(webAPICoords, startCoords, eventLoaf);
      await moveToLocation([0, 0], [-40, 40], chefLoaf);
    }
  }, 1000);
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
  cat: HTMLElement
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

  await cat.animate(moveToQueueKeyframes, animationOptions).finished;
  await cat.style.setProperty("transform", destination);
}

orderLoafButton?.addEventListener("click", onOrderButtonClick);
