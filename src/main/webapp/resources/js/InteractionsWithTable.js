function addRowToTable(x, y, r, hit, executionTime, currentTime) {
    addDot(x, y, r);
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
}