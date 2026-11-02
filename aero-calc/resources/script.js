document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByTagName("button"));

    buttons.forEach((elem) => {
        elem.addEventListener("click", calculate)
    });

    function calculate() {
        let digit = this.id;
        let currentText = display.innerText

        if (digit == 'C') {
            display.innerText = ""
        }
        else if (digit == '←') {
            display.innerText = currentText.slice(0, -1);
        }
        else if (digit == "=") {
            try {
                display.innerText = eval(currentText);
            }
            catch (error) {
                alert("Invalid Experession");
                display.innerText = "";
            }
        }

        else {
            display.innerText += digit;
        }
    }
});