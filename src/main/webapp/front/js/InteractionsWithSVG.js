const svg = document.getElementById("graph");
const rInput = document.getElementById("rValue");
const clearButton = document.querySelector(".clear");
const dots = [];
function addDot(x, y, r) {
    dots.push({x, y});
    redrawGraph(r);
}
function redrawGraph(r) {
    svg.querySelectorAll("circle").forEach((circle) => circle.remove());

    // Перерисовываем точки
    dots.forEach((dot) => {
        const centerX = 150;
        const centerY = 150;
        const scale = 100;


        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", (dot.x/r)*100);
        circle.setAttribute("cy", -(dot.y/r)*100);
        circle.setAttribute("r", "2");
        circle.setAttribute("fill", "red");

        //console.log(`Draw dot at (${dot.x.toFixed(2)}, ${dot.y.toFixed(2)})`);

        svg.appendChild(circle);
    });
}

svg.addEventListener("click", (event) => {
    graphWarning.style.display = "none";
    const rValue = parseFloat(document.getElementById("R").value);
    if (isNaN(rValue) || rValue <= 1 || rValue >= 4) {
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

    addDot(svgX, svgY, rValue);

    let formData = {
        X: svgX,
        Y: svgY,
        R: rValue
    };

    $.ajax({
        url: 'Controller',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            addRowToTable(response.x, response.y, response.r, response.hit,
                response.executionTime, response.currentTime);
            console.log("x: " + response.x + ", y: " + response.y + ", r: " + response.r +
                ", hit: " + response.hit + ", execution Time: " + response.executionTime +
                ", time: " + response.currentTime);
        },
        error: function(xhr, status, error) {
            alert("There was an error with the submission. Please try again.");
            console.error(xhr.responseText);
        }
    });
    dots.forEach(d => console.log(" " + d.x + " " + d.y));
});

clearButton.addEventListener("click", () => {
    const circles = svg.querySelectorAll("circle");
    circles.forEach(circle => {
        circle.remove();
    });
    dots.length = 0;
    graphWarning.style.display = "none";
});