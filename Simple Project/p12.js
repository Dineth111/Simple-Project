let result = document.getElementById("result");

function getResult(value) {
    result.value += value;
}

function clearResult() {
    result.value = "";
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
}

function calculateResult() {
    try {
        result.value = eval(result.value);
    } catch (e) {
        result.value = "Error";
    }
}
