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
const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop");
const stack = document.querySelector("#stack");
const eventQueue = document.querySelector("#event-queue");
function onOrderButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        yield moveToLocation([0, 0], [38, -18]);
        //   add
        const frame = document.createElement("div");
        yield addFrameToLoaf("orderLoaf()", frame);
        yield moveToLocation([38, -18], [40, 4]);
        // stack = [10, -18]
        eventLoaf.removeChild(frame);
        frame.classList.remove("carried-frame");
        eventQueue === null || eventQueue === void 0 ? void 0 : eventQueue.appendChild(frame);
        setTimeout(() => addOrderInstructions("sendOrder()"), 1000);
        setTimeout(() => addOrderInstructions("confirmOrder()"), 2000);
    });
}
function addFrameToLoaf(text, frame) {
    frame.classList.add("frame", "carried-frame");
    const frameText = document.createElement("p");
    frameText.innerText = text;
    frame.appendChild(frameText);
    eventLoaf.appendChild(frame);
}
function addOrderInstructions(text) {
    // give order to kitchen
    // bake loaf
    // serve loaf to customer
    const frame = document.createElement("div");
    frame.classList.add("frame");
    const frameText = document.createElement("p");
    frameText.innerText = text;
    frame.appendChild(frameText);
    stack === null || stack === void 0 ? void 0 : stack.appendChild(frame);
}
function moveToLocation(currentCoords, destinationCoords) {
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
