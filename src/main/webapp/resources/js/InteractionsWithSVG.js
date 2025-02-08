const svg = document.getElementById("graph");
const rInput = document.getElementById("form:r").value;
const dots = [];

function redrawGraph(r) {
    svg.querySelectorAll("circle").forEach((circle) => circle.remove()); // Убираем старые точки

    const rows = Array.from(document.querySelectorAll("#resultsTable_data tr"));

    rows.forEach(row => {
        const x = parseFloat(row.cells[0].innerText); // X из первой ячейки
        const y = parseFloat(row.cells[1].innerText); // Y из второй ячейки
        drawDot(x, y, r)
        console.warn(x + " " +  y + " " + isHit(x, y, r))
    });

}

svg.addEventListener("click", (event) => {
    const rValue = parseFloat(document.getElementById("form:r").value);
    if (isNaN(rValue) || rValue < 1 || rValue > 4) {
        rError.style.display = "block";
        rError.innerHTML = "R must be integer between 1 and 4";
        return;
    }

    const rect = svg.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const svgX = ((offsetX - 150) / 100) * rValue;
    const svgY = ((150 - offsetY) / 100) * rValue;

    console.log(`Координаты: x = ${svgX.toFixed(2)}, y = ${svgY.toFixed(2)}`);

    drawDot(svgX, svgY, rValue);

    dots.forEach(d => console.log(" " + d.x + " " + d.y));

    document.getElementById("form:x").value = svgX;
    document.getElementById("form:y").value = svgY;
    document.getElementById("form:SendButton").click();
});
function isHit(xs, ys, rs) {
    try {
        let x = parseFloat(xs);
        let y = parseFloat(ys);
        let r = parseFloat(rs);

        if (x <= 0 && y >= 0) return String(x >= -r && y <= r);

        if (x > 0 && y > 0) return "false";

        if (x < 0 && y < 0) return String(y >= -x - r );

        return String(x * x + y * y <= r * r);
    } catch (e) {
        return null;
    }
}
window.addEventListener('load', () => {

});
function drawDot(x, y, r) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const hit = isHit(x, y, r);
    circle.setAttribute("cx", (x/r)*100);
    circle.setAttribute("cy", -(y/r)*100);
    circle.setAttribute("r", "2");


    if (hit === "true") {
        circle.setAttribute("fill", "green");
    } else {
        circle.setAttribute("fill", "red");
    }

    svg.appendChild(circle);
}
window.onload = function() {
    const rValue = parseFloat(document.getElementById("form:r").value);
    redrawGraph(rValue);
};
