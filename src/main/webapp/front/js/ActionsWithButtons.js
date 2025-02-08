let xValue = null;
let error = document.getElementById("error");
let xError = document.getElementById("xError");
let rError = document.getElementById("rError");
let formError = document.getElementById("formError");
let graphWarning = document.getElementById("graphWarning")

// X Select
document.getElementById("xSelect").addEventListener("change", (event) => {
    xValue = event.target.value;
    if (![-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseInt(xValue))) {
        xValue = null;
        xError.style.display = "block";
        xError.innerHTML = "X must be an integer between -5 and 3.";
    } else {
        xError.style.display = "none";
        console.log("correct x");
    }
});

//R Validation
function validateR() {
    const rInput = document.getElementById("R");
    formatAnswer(rInput);
}
document.getElementById("R").addEventListener("input", validateR);

function checkR(r) {
    const numericValue = parseFloat(r);
    if (isNaN(numericValue) || numericValue < 1 || numericValue > 4) {
        rError.style.display = "block";
        rError.innerHTML = "R must be a number between 1 and 4.";
        return false;
    }
    rError.style.display = "none";
    return true;
}

function formatAnswer(input) {
    let value  = input.value;
    let string = value;
    value = value.replace(/[^0-9.,-]/g, "")
        .replace(/(?<!\d)\./g, "");
    let minuses = value.split("-");
    let dots = string.replace(",", ".").split(".");
    if (dots.length > 2 || minuses.length > 2) {
        value = value.slice(0, -1);
    }
    if (value.indexOf("-") > 0) {
        value = value.replace(/-/g, "");
    }
    input.value = value;
}

// Y Validation
function validateY() {
    const yInput = document.getElementById("y");
    formatAnswer(yInput);
}
document.getElementById("y").addEventListener("input", validateY);

function checkY(y) {
    const yError = document.getElementById("yError");
    const numericValue = parseFloat(y);
    if (isNaN(numericValue) || numericValue < -3 || numericValue > 5) {
        yError.style.display = "block";
        yError.innerHTML = "Y must be a number between -3 and 5.";
        return false;
    }
    yError.style.display = "none";
    return true;
}

// Send Button
document.querySelector(".SendButton").addEventListener("click", () => {
    let y = document.getElementById("y").value.replace(",", ".");
    let r = document.getElementById("R").value;
    if (xValue === null) {
        console.warn("Please select a value for X.");
        xError.style.display = "block";
        xError.innerHTML = "Select correct x (-5;3)";
        return;
    }
    if (!checkR(r)) {
        console.warn("Please enter a valid value for R.");
        return;
    }
    if (!checkY(y)) {
        console.warn("Please enter a valid value for Y.");
        return;
    }
    if (xValue > r || y > r) {
        graphWarning.style.display = "block";
        graphWarning.innerHTML = "Your dot is out of range, so you may not see it it on the schedule"
    }
    else {
        graphWarning.style.display = "none";
    }
    console.log(y)

    // Form data
    var formData = {
        X: xValue,
        Y: y,
        R: r
    };

    // AJAX Submission
    $.ajax({
        url: 'Controller',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            console.log(response.hit)
            addRowToTable(response.x, response.y, response.r, response.hit,
                response.executionTime, response.currentTime);
            addDot(response.x, response.y, response.r);
             console.log("x: " + response.x + ", y: " + response.y + ", r: " + response.r +
                 ", hit: " + response.hit + ", execution Time: " + response.executionTime +
                 ", time: " + response.currentTime);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            formError.style.display = "block";
            formError.innerHTML = JSON.parse(xhr.responseText).error;
            console.error("status: " + status);
        }
    });
});
function addRowToTable(x, y, r, hit, executionTime, currentTime) {
    const tableBody = document.querySelector("#resultsTable tbody");
    const newRow = document.createElement("tr");
    console.log(hit);
    const cells = [x, y, r, hit, executionTime, currentTime];
    cells.forEach(cellData => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        newRow.appendChild(cell);
    });

    tableBody.appendChild(newRow);
    addDot(x, y, r);
}

//insert dots in graph
// function addPointToGraph(x, y, r) {
//     const svg = document.getElementById("graph");
//
//     let svgX = (x / r) * 100;
//     let svgY = -(y / r) * 100;
//
//     const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle.setAttribute("cx", svgX);
//     circle.setAttribute("cy", svgY);
//     circle.setAttribute("r", "2");
//     circle.setAttribute("fill", "red");
//
//     svg.appendChild(circle);
// }


