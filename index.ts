const orderLoafButton = document.querySelector("#order-loaf");
const eventLoaf = document.querySelector("#event-loop") as HTMLElement;

async function onOrderButtonClick(e: Event) {
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

  await eventLoaf.animate(moveToCenterKeyframes, animationOptions).finished;
  await eventLoaf.style.setProperty("transform", center);

  const frame = document.createElement("div");
  frame.classList.add("frame", "carried-frame");

  await eventLoaf.appendChild(frame);
  await eventLoaf.animate(
    [{ transform: center }, { transform: "translate(0vw, 0vw)" }],
    animationOptions
  );
}
orderLoafButton?.addEventListener("click", onOrderButtonClick);
