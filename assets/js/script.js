// ---------- thin background lines (like the reference) ----------
function drawLines(svg, count, seed) {
  const w = window.innerWidth, h = window.innerHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.innerHTML = "";
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < count; i++) {
    const x0 = rand() * w, y0 = rand() * h;
    const len = 60 + rand() * 220, ang = rand() * Math.PI * 2, bend = (rand() - .5) * 160;
    const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
    const cx = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * bend;
    const cy = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * bend;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", `M${x0.toFixed(1)} ${y0.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
    svg.appendChild(p);
  }
}
const bg = document.getElementById("bgLines");
const paint = () => drawLines(bg, Math.round(window.innerWidth / 14), 7);
paint();
let t;
window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(paint, 200); });

// ---------- circle cursor ----------
const cursor = document.querySelector(".cursor");
if (cursor && matchMedia("(hover: hover)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.classList.add("on");
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll(".link-card").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
}

// ---------- the dog's open eye follows the mouse ----------
const pet = document.querySelector(".pet");
const eyes = document.querySelectorAll(".pet .eyes circle");
if (pet && eyes.length) {
  const base = [...eyes].map((c) => [+c.getAttribute("cx"), +c.getAttribute("cy")]);
  window.addEventListener("mousemove", (e) => {
    const r = pet.getBoundingClientRect();
    const dx = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width - .5)) * 12;
    const dy = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height - .5)) * 8;
    eyes.forEach((c, i) => { c.setAttribute("cx", base[i][0] + dx); c.setAttribute("cy", base[i][1] + dy); });
  });
}
