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
function onOrderButtonClick(e) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield eventLoaf.animate(moveToCenterKeyframes, animationOptions).finished;
        yield eventLoaf.style.setProperty("transform", center);
        const frame = document.createElement("div");
        frame.classList.add("frame", "carried-frame");
        yield eventLoaf.appendChild(frame);
        yield eventLoaf.animate([{ transform: center }, { transform: "translate(0vw, 0vw)" }], animationOptions);
    });
}
orderLoafButton === null || orderLoafButton === void 0 ? void 0 : orderLoafButton.addEventListener("click", onOrderButtonClick);
