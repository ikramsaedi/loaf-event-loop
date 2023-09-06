// Apologies to anyone reading this! The onOrderButtonClick is a bit of a big monster function

// Elements
const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;
const chefLoaf = document.querySelector("#chef-loaf") as HTMLElement;
const stack = document.querySelector("#stack") as HTMLElement;
const eventQueue = document.querySelector("#event-queue");
const webAPI = document.querySelector("#web-api");

// Coords relative to the event loaf element specifically
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
  // go to center and pick up order
  await moveToLocation([0, 0], centerCoords, eventLoaf);
  const frame = document.createElement("div");
  await addFrameToLoaf(frame, "orderLoaf()");

  // move to stack & add order instructions
  await moveToLocation(centerCoords, stackCoords, eventLoaf);
  addFrameToBox(frame, stack);
  await promiseTimeout(() => addOrderInstructions("prepare()"), 1000);
  await promiseTimeout(() => addOrderInstructions("sendToKitchen()"), 1000);

  // add top frame to event loaf
  let topStackFrame = stack?.lastElementChild as HTMLElement;
  await promiseTimeout(async () => {
    addFrameToLoaf(topStackFrame);
  }, 1000);

  if (topStackFrame && webAPI) {
    // move to web API and put frame on it
    await moveToLocation(stackCoords, webAPICoords, eventLoaf);
    addFrameToBox(topStackFrame, webAPI);

    // add baking gif to DOM
    const bakingGif = document.createElement("img");
    bakingGif.src = "./assets/baking.gif";
    webAPI.appendChild(bakingGif);

    await moveToLocation(webAPICoords, stackCoords, eventLoaf);

    while (stack?.lastElementChild) {
      await promiseTimeout(() => {
        // maybe see if u can fade it before it disappears
        stack.removeChild(stack?.lastElementChild as HTMLElement);
      }, 1000);
    }

    await promiseTimeout(() => {
      while (topStackFrame.firstChild) {
        topStackFrame.removeChild(topStackFrame.firstChild);
      }
      const frameText = document.createElement("p");
      frameText.innerText = "serveLoaf()";
      webAPI.removeChild(bakingGif);
      topStackFrame.appendChild(frameText);
      chefLoaf.appendChild(topStackFrame);
    }, 2000);

    await moveToLocation([0, 0], [-40, 36], chefLoaf);
    chefLoaf.removeChild(topStackFrame);

    eventQueue?.appendChild(topStackFrame);
    await moveToLocation([-40, 36], [0, 0], chefLoaf);

    // move to eventQueue
    await moveToLocation(stackCoords, eventQueueCoords, eventLoaf);
    const frame = eventQueue?.firstElementChild as HTMLElement;
    await addFrameToLoaf(frame);
    // move back to stack
    await moveToLocation(eventQueueCoords, stackCoords, eventLoaf);
    await addFrameToBox(frame, stack);

    // ugh the nesting! ideally would like to not have this nested
    await promiseTimeout(() => {
      stack.removeChild(stack?.firstElementChild as HTMLElement);
      const frame = document.createElement("div");
      frame.classList.add("frame");
      addFrameToLoaf(frame, "Loaf is served! 🍞");
    }, 2000);
  }
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
  const moveToDestinationKeyframes = [
    { transform: current },
    { transform: destination },
  ];

  await cat.animate(moveToDestinationKeyframes, animationOptions).finished;
  await cat.style.setProperty("transform", destination);
}

orderLoafButton?.addEventListener("click", onOrderButtonClick);
