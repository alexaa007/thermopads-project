const input1 = parseFloat(document.currentScript.getAttribute("something1"));
const input2 = parseFloat(document.currentScript.getAttribute("something2"));

const result1 = input1 + input2;
const result2 = input1 * input2;

const paragraph = document.createElement("p");

paragraph.textContent = "addition: " + result1 + "\nmultiplication:" + result2;
document.body.appendChild(paragraph);

function sendResultsToServer() {
    fetch("/send-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ input1, input2, result1, result2 }),
    })
        .then((response) => response.json())
        .then((data) => console.log("Results logged on server:", data))
        .catch((error) => console.error("Error:", error));
}

sendResultsToServer();
