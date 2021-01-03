const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); 
            // JSON.parse() digunakan untuk mengubah nilai objek berbentung string kembali ke bentuk objek JS
        }

        historyData.unshift(data);
        // unshift() digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index dan untuk mengembalikan panjang array setelah ditambahkan dengan nilai baru

        // digunakan untuk menampilkan 5 history terakhir
        if (historyData.length > 5) {
            historyData.pop();
            // pop() digunakan untuk menghapus nilai index terakhir
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
        // JSON.stringify() digunakan untuk mengubah objek JS ke dalam bentuk string
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
 }

 renderHistory();