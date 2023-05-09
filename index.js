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
const chefLoaf = document.querySelector("#chef-loaf");
const stack = document.querySelector("#stack");
const eventQueue = document.querySelector("#event-queue");
const webAPI = document.querySelector("#web-api");
// Coords
const startCoords = [0, 0];
const centerCoords = [38, -18];
const eventQueueCoords = [40, 4];
const stackCoords = [10, -18];
const webAPICoords = [78, -18];
// This lets me chain timeouts
function promiseTimeout(callback, timeout) {
    return new Promise((resolve) => {
        const resolver = () => {
            callback();
            resolve();
        };
        setTimeout(resolver, timeout);
    });
}
function onOrderButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        // go to center and pick up order
        yield moveToLocation([0, 0], centerCoords, eventLoaf);
        const frame = document.createElement("div");
        yield addFrameToLoaf(frame, "orderLoaf()");
        // move to stack & add order instructions
        yield moveToLocation(centerCoords, stackCoords, eventLoaf);
        addFrameToBox(frame, stack);
        yield promiseTimeout(() => addOrderInstructions("prepare()"), 1000);
        yield promiseTimeout(() => addOrderInstructions("sendToKitchen()"), 1000);
        let topStackFrame = stack === null || stack === void 0 ? void 0 : stack.lastElementChild;
        yield promiseTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (topStackFrame && webAPI && chefLoaf) {
                addFrameToLoaf(topStackFrame);
            }
        }), 1000);
        if (topStackFrame && webAPI) {
            yield moveToLocation(stackCoords, webAPICoords, eventLoaf);
            addFrameToBox(topStackFrame, webAPI);
            const bakingGif = document.createElement("img");
            bakingGif.src = "./assets/baking.gif";
            webAPI.appendChild(bakingGif);
            // i intend to add a delay. want to show some sparkly animation to show the chef is working
            promiseTimeout(() => {
                while (topStackFrame.firstChild) {
                    topStackFrame.removeChild(topStackFrame.firstChild);
                }
                const frameText = document.createElement("p");
                frameText.innerText = "serveLoaf()";
                webAPI.removeChild(bakingGif);
                topStackFrame.appendChild(frameText);
            }, 2000);
            promiseTimeout(() => {
                chefLoaf.appendChild(topStackFrame);
            }, 2000);
            yield moveToLocation(webAPICoords, startCoords, eventLoaf);
            yield moveToLocation([0, 0], [-40, 36], chefLoaf);
            chefLoaf.removeChild(topStackFrame);
            eventQueue === null || eventQueue === void 0 ? void 0 : eventQueue.appendChild(topStackFrame);
            yield moveToLocation([-40, 36], [0, 0], chefLoaf);
            yield moveToLocation(startCoords, stackCoords, eventLoaf);
            yield promiseTimeout(() => {
                topStackFrame = stack === null || stack === void 0 ? void 0 : stack.lastElementChild;
                // maybe see if u can fade it before it disappears
                stack.removeChild(topStackFrame);
            }, 1000);
            yield promiseTimeout(() => {
                topStackFrame = stack === null || stack === void 0 ? void 0 : stack.lastElementChild;
                // maybe see if u can fade it before it disappears
                stack.removeChild(topStackFrame);
            }, 1000);
            yield promiseTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield moveToLocation(stackCoords, eventQueueCoords, eventLoaf);
                const frame = eventQueue === null || eventQueue === void 0 ? void 0 : eventQueue.firstElementChild;
                yield addFrameToLoaf(frame);
                yield moveToLocation(eventQueueCoords, stackCoords, eventLoaf);
                yield addFrameToBox(frame, stack);
                // ugh the nesting! ideally would like to not have this nested
                yield promiseTimeout(() => {
                    stack.removeChild(stack === null || stack === void 0 ? void 0 : stack.firstElementChild);
                    const frame = document.createElement("div");
                    frame.classList.add("frame");
                    addFrameToLoaf(frame, "Loaf is served! 🍞");
                }, 2000);
            }), 1000);
        }
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
        const moveToDestinationKeyframes = [
            { transform: current },
            { transform: destination },
        ];
        yield cat.animate(moveToDestinationKeyframes, animationOptions).finished;
        yield cat.style.setProperty("transform", destination);
    });
}
orderLoafButton === null || orderLoafButton === void 0 ? void 0 : orderLoafButton.addEventListener("click", onOrderButtonClick);
