let csvData = {};

function loadCSV() {
    fetch("Table_Input.csv")
        .then((response) => response.text())
        .then((data) => {
            parseCSV(data);
            renderSourceTable();
            processData();
        })
        .catch((error) => {
            console.error("Failed to load CSV:", error);
        });
}

function parseCSV(text) {
    csvData = {};

    const rows = text.trim().split("\n");

    rows.forEach((row, index) => {
        if (index === 0) {
            return;
        }

        const [key, value] = row.split(",");
        csvData[key.trim()] = Number(value.trim());
    });

    console.log("CSV Data:", csvData);
}

function renderSourceTable() {
    const tableBody = document.getElementById("table-body2");
    tableBody.innerHTML = "";

    Object.entries(csvData).forEach(([key, value]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${key}</td>
            <td>${value.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function processData() {
    const dataProcessing = [
        {
            category: "Alpha",
            value: csvData["A5"] + csvData["A20"],
        },
        {
            category: "Beta",
            value: csvData["A15"] / csvData["A7"],
        },
        {
            category: "Charlie",
            value: csvData["A13"] * csvData["A12"],
        },
    ];

    const resultBody = document.getElementById("table-body");
    resultBody.innerHTML = "";

    dataProcessing.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.category}</td>
            <td>${item.value.toFixed(2)}</td>
        `;
        resultBody.appendChild(tr);
    });
}
