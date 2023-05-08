"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Elements
const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop");
const stack = document.querySelector("#stack");
const eventQueue = document.querySelector("#event-queue");
const webAPI = document.querySelector("#web-api");
// Coords
const startCoords = [0, 0];
const centerCoords = [38, -18];
const eventQueueCoords = [40, 4];
const stackCoords = [10, -18];
const webAPICoords = [78, -18];
function onOrderButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        yield moveToLocation([0, 0], centerCoords, eventLoaf);
        const frame = document.createElement("div");
        yield addFrameToLoaf(frame, "orderLoaf()");
        yield moveToLocation(centerCoords, stackCoords, eventLoaf);
        addFrameToBox(frame, stack);
        setTimeout(() => addOrderInstructions("prepare()"), 1000);
        setTimeout(() => addOrderInstructions("sendToKitchen()"), 2000);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const topStackFrame = stack === null || stack === void 0 ? void 0 : stack.lastElementChild;
            if (topStackFrame && webAPI) {
                addFrameToLoaf(topStackFrame);
                yield moveToLocation(stackCoords, webAPICoords, eventLoaf);
                addFrameToBox(topStackFrame, webAPI);
                moveToLocation(webAPICoords, startCoords, eventLoaf);
            }
        }), 3000);
    });
}
function addFrameToLoaf(frame, text) {
    frame.classList.add("frame", "carried-frame");
    const frameText = document.createElement("p");
    if (text)
        frameText.innerText = text;
    frame.appendChild(frameText);
    eventLoaf.appendChild(frame);
}
function addFrameToBox(frame, box) {
    eventLoaf.removeChild(frame);
    frame.classList.remove("carried-frame");
    box.appendChild(frame);
}
function addOrderInstructions(text) {
    const frame = document.createElement("div");
    frame.classList.add("frame");
    const frameText = document.createElement("p");
    frameText.innerText = text;
    frame.appendChild(frameText);
    stack === null || stack === void 0 ? void 0 : stack.appendChild(frame);
}
function moveToLocation(currentCoords, destinationCoords, cat) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield eventLoaf.animate(moveToQueueKeyframes, animationOptions).finished;
        yield eventLoaf.style.setProperty("transform", destination);
    });
}
orderLoafButton === null || orderLoafButton === void 0 ? void 0 : orderLoafButton.addEventListener("click", onOrderButtonClick);
