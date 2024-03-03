const lineSize = parseFloat(document.currentScript.getAttribute("lineSize"));
const lineOD = parseFloat(document.currentScript.getAttribute("lineOD"));
const pipeLength = parseFloat(
    document.currentScript.getAttribute("pipeLength")
);
const insulationThickness = parseFloat(
    document.currentScript.getAttribute("insulationThickness")
);
const maintainenceTemp = parseFloat(
    document.currentScript.getAttribute("maintainenceTemp")
);
const operationalTemp = parseFloat(
    document.currentScript.getAttribute("operationalTemp")
);
const designTemp = parseFloat(
    document.currentScript.getAttribute("designTemp")
);
const valveCount = parseFloat(
    document.currentScript.getAttribute("valveCount")
);
const flangeCount = parseFloat(
    document.currentScript.getAttribute("flangeCount")
);
const supportCount = parseFloat(
    document.currentScript.getAttribute("supportCount")
);
const pumpCount = parseFloat(document.currentScript.getAttribute("pumpCount"));
const minAmb = parseFloat(document.currentScript.getAttribute("minAmb"));
const maxAmb = parseFloat(document.currentScript.getAttribute("maxAmb"));
const designMargin = parseFloat(
    document.currentScript.getAttribute("designMargin")
);

const result1 = lineSize + lineOD;
const result2 = pipeLength * insulationThickness;

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
