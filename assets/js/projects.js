// background lines (same style as the home page)
const svg = document.getElementById("bgLines");
function paint() {
  const w = innerWidth, h = innerHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.innerHTML = "";
  let s = 11;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < Math.round(w / 18); i++) {
    const x0 = r() * w, y0 = r() * h, len = 60 + r() * 220, a = r() * Math.PI * 2, b = (r() - .5) * 160;
    const x1 = x0 + Math.cos(a) * len, y1 = y0 + Math.sin(a) * len;
    const cx = (x0 + x1) / 2 + Math.cos(a + Math.PI / 2) * b, cy = (y0 + y1) / 2 + Math.sin(a + Math.PI / 2) * b;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", `M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`);
    svg.appendChild(p);
  }
}
paint();
addEventListener("resize", paint);

// tag filters
const chips = document.querySelectorAll(".chip");
const posts = document.querySelectorAll(".post");
const empty = document.querySelector(".empty");
chips.forEach((chip) => chip.addEventListener("click", () => {
  chips.forEach((c) => c.classList.toggle("active", c === chip));
  const f = chip.dataset.filter;
  let shown = 0;
  posts.forEach((p) => {
    const ok = f === "all" || p.dataset.tags.split(" ").includes(f);
    p.hidden = !ok;
    if (ok) shown++;
  });
  empty.hidden = shown > 0;
}));

document.getElementById("year").textContent = new Date().getFullYear();
