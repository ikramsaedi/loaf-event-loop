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
function onOrderButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const center = "translate(38vw, -18vw)";
        const moveToCenterKeyframes = [
            { transform: "translate(0vw, 0vw)" },
            { transform: center },
        ];
        const animationOptions = {
            duration: 3000,
            easing: "ease",
        };
        yield eventLoaf.animate(moveToCenterKeyframes, animationOptions).finished;
        yield eventLoaf.style.setProperty("transform", center);
        //   add
        const frame = document.createElement("div");
        yield addFrameToLoaf("orderLoaf()", frame);
        // move to stack
        const stackPos = "translate(10vw, -18vw)";
        const moveToStackKeyframes = [{ transform: center }, { transform: stackPos }];
        yield eventLoaf.animate(moveToStackKeyframes, animationOptions).finished;
        yield eventLoaf.style.setProperty("transform", stackPos);
        eventLoaf.removeChild(frame);
        frame.classList.remove("carried-frame");
        stack === null || stack === void 0 ? void 0 : stack.appendChild(frame);
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
orderLoafButton === null || orderLoafButton === void 0 ? void 0 : orderLoafButton.addEventListener("click", onOrderButtonClick);
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
