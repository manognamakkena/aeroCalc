document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByTagName("button"));

    buttons.forEach((elem) => {
        elem.addEventListener("click", calculate)
    });

    document.addEventListener("keydown", (event) => {
        let pressedKey = event.key;

        const matchingButton = document.querySelector(`[data-key="${pressedKey}"]`)

        if (matchingButton) {
            event.preventDefault();
            matchingButton.click();
        }
    })

    function calculate(event) {
        const targetElement = event?.currentText || event?.target || this;

        if (!targetElement) return;

        const value = event.target.getAttribute('data-key') || event.target.innerText;
        let digit = targetElement.id;
        let currentText = display.innerText

        if (digit == 'C') {
            display.innerText = ""
        }
        else if (digit == '←') {
            display.innerText = currentText.slice(0, -1);
        }
        else if (digit == '%') {
            if (currentText != "")
                display.innerText = parseFloat(currentText) / 100
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