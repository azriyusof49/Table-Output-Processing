let csvData = [];

function loadCSV() {
    fetch('Table_Input.csv')
        .then(response => response.text())
        .then(data => {
            parseCSV(data);
            processData();
        });
}

function parseCSV(text) {
    const rows = text.trim().split('\n');
    
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        
        const [key, value] = row.split(',');
        csvData[key.trim()] = parseFloat(value.trim());
    });
    
    console.log('CSV Data:', csvData);
}

function processData() {
    const dataProcessing = [
        {
            category: "Alpha",
            value: csvData['A5'] + csvData['A20']
        },
        {
            category: "Beta",
            value: csvData['A15'] / csvData['A7']
        },
        {
            category: "Charlie",
            value: csvData['A13'] * csvData['A12']
        }
    ];
    
    const resultBody = document.getElementById('table-body');
    resultBody.innerHTML = '';
    
    dataProcessing.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.category}</td>
            <td>${item.value.toFixed(2)}</td>
        `;
        resultBody.appendChild(tr);
    });
}
