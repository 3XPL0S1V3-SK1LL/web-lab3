let xError = document.getElementById("xError");
let yError = document.getElementById("yError");
let rError = document.getElementById("rError");

document.getElementById("form:x").addEventListener("change", (event) => {
    let xValue = event.target.value;
    if(!checkX(xValue)) {
        event.target.value="";
    }
});
document.getElementById("form:y").addEventListener("change", (event) => {
    let yValue = event.target.value;
    if (!checkY(yValue)) {
        event.target.value = null;
    }
});
document.getElementById("form:r").addEventListener("change", (event) => {
    let rValue = event.target.value;
    if (!checkR(rValue)) {
        event.target.value = null;
    }
});

document.getElementById("form:SendButton").addEventListener("click", (event) => {
    let x = document.getElementById("form:x").value;
    let y = document.getElementById("form:y").value;
    let r = document.getElementById("form:r").value;

    console.log(x + " " + y + " " + r);
   if (checkX(x) && checkY(y) && checkR(r)) {
       xError.style.display = "none";
       yError.style.display = "none";
       rError.style.display = "none";
       drawDot(x, y, r);
   }
});

function checkX(value) {
    let nValue = value.replaceAll(",",".");
    if (!(/^-?\d+(\.\d+)?$/.test(nValue))) {
        xError.style.display = "block";
        xError.innerHTML = "X must be a valid number";
        return false;
    } else {
        let numX = parseFloat(nValue);

        if (numX < -5 || numX > 5) {
            xError.style.display = "block";
            xError.innerHTML = "X must be between -5 and 5";
            return false;
        } else {
            xError.style.display = "none";
            console.log("correct x:", numX);
            return true;
        }
    }
}
function checkY(value) {
    let nValue = value.replaceAll(",",".");
    if (!(/^-?\d+(\.\d+)?$/.test(nValue))) {
        yError.style.display = "block";
        yError.innerHTML = "Y must be a valid number";
        return false;
    } else {
        let numX = parseFloat(nValue);

        if (numX < -5 || numX > 3) {
            yError.style.display = "block";
            yError.innerHTML = "Y must be between -5 and 3";
            return false;
        } else {
            yError.style.display = "none";
            console.log("correct y:", numX);
            return true;
        }
    }
}
function checkR(value){
    let nValue = value;
    if (!(/^-?\d+(\.\d+)?$/.test(nValue))) {
        rError.style.display = "block";
        rError.innerHTML = "R must be a valid number";
        return false;
    } else {
        let numX = parseFloat(nValue);

        if (numX < 1 || numX > 4) {
            rError.style.display = "block";
            rError.innerHTML = "R must be between 1 and 4";
            return false;
        } else {
            rError.style.display = "none";
            console.log("correct r:", numX);
            return true;
        }
    }
}
document.getElementById("form:SendButton").addEventListener("mouseover", (event) => {
    let x = document.getElementById("form:x").value;
    let y = document.getElementById("form:y").value;
    let r = document.getElementById("form:r").value;

    console.log(x + " " + y + " " + r);

    // Проверяем все три значения
    if (checkX(x) && checkY(y) && checkR(r)) {
        xError.style.display = "none";
        yError.style.display = "none";
        rError.style.display = "none";
        event.target.disabled = false;
    } else {
        event.target.disabled = true;
    }
});

$(document).ready(function() {
    const slider = $('#form\\:slider');
    const valueDiv = $('#sliderValue');

    slider.on('slide', function(event, ui) {
        valueDiv.text("Значение: " + ui.value);
        if (checkR(ui.value)) redrawGraph(ui.value);
    });
});

