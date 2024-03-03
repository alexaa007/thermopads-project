//Lookup Table
data = [
    {
        "S.N.": 1,
        "CATALOGUE NO.": "STF10",
        "Output at 10 Deg. C": 10,
        "Output at Maximum Temp.": 1,
        m: -0.16,
        c: 11.64,
    },
    {
        "S.N.": 2,
        "CATALOGUE NO.": "STF15",
        "Output at 10 Deg. C": 15,
        "Output at Maximum Temp.": 1.9,
        m: -0.24,
        c: 17.38,
    },
    {
        "S.N.": 3,
        "CATALOGUE NO.": "STF25",
        "Output at 10 Deg. C": 25,
        "Output at Maximum Temp.": 3.1,
        m: -0.4,
        c: 28.98,
    },
    {
        "S.N.": 4,
        "CATALOGUE NO.": "STF33",
        "Output at 10 Deg. C": 33,
        "Output at Maximum Temp.": 6.5,
        m: -0.48,
        c: 37.82,
    },
    {
        "S.N.": 5,
        "CATALOGUE NO.": "STP15",
        "Output at 10 Deg. C": 15,
        "Output at Maximum Temp.": 2,
        m: -0.09,
        c: 15.93,
    },
    {
        "S.N.": 6,
        "CATALOGUE NO.": "STP30",
        "Output at 10 Deg. C": 30,
        "Output at Maximum Temp.": 8,
        m: -0.16,
        c: 31.57,
    },
    {
        "S.N.": 7,
        "CATALOGUE NO.": "STP45",
        "Output at 10 Deg. C": 45,
        "Output at Maximum Temp.": 13,
        m: -0.23,
        c: 47.29,
    },
    {
        "S.N.": 8,
        "CATALOGUE NO.": "STP60",
        "Output at 10 Deg. C": 60,
        "Output at Maximum Temp.": 22,
        m: -0.27,
        c: 62.71,
    },
    {
        "S.N.": 9,
        "CATALOGUE NO.": "HTT30",
        "Output at 10 Deg. C": 30,
        "Output at Maximum Temp.": 19.8,
        m: -0.06,
        c: 30.6,
    },
    {
        "S.N.": 10,
        "CATALOGUE NO.": "HTT45",
        "Output at 10 Deg. C": 45,
        "Output at Maximum Temp.": 29.5,
        m: -0.1,
        c: 46.0,
    },
    {
        "S.N.": 11,
        "CATALOGUE NO.": "HTT60",
        "Output at 10 Deg. C": 60,
        "Output at Maximum Temp.": 42,
        m: -0.13,
        c: 61.29,
    },
    {
        "S.N.": 12,
        "CATALOGUE NO.": "CTLPT16",
        "Output at 10 Deg. C": 16,
        "Output at Maximum Temp.": 16,
        m: 0.0,
        c: 16.0,
    },
    {
        "S.N.": 13,
        "CATALOGUE NO.": "CTLPT25",
        "Output at 10 Deg. C": 25,
        "Output at Maximum Temp.": 25,
        m: 0.0,
        c: 25.0,
    },
    {
        "S.N.": 14,
        "CATALOGUE NO.": "CTLPT33",
        "Output at 10 Deg. C": 33,
        "Output at Maximum Temp.": 33,
        m: 0.0,
        c: 33.0,
    },
    {
        "S.N.": 15,
        "CATALOGUE NO.": "CTLPT45",
        "Output at 10 Deg. C": 45,
        "Output at Maximum Temp.": 45,
        m: 0.0,
        c: 45.0,
    },
    {
        "S.N.": 16,
        "CATALOGUE NO.": "CTLPT60",
        "Output at 10 Deg. C": 60,
        "Output at Maximum Temp.": 60,
        m: 0.0,
        c: 60.0,
    },
];

// Input Attributes
const tracerModel = document.currentScript.getAttribute("tracerModel");
console.log(tracerModel);
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

// Output Calculations
//Lookup Calculations
console.log(tracerModel);
const tracerModelInput = `${tracerModel}`;
const entry = data.find((item) => item["CATALOGUE NO."] === tracerModelInput);
if (entry) {
    const outputAt10DegC = entry["Output at 10 Deg. C"];
    const outputAtMaxTemp = entry["Output at Maximum Temp."];
    const mValue = entry.m;
    const cValue = entry.c;
    console.log("Found Tracer Values:", {
        outputAt10DegC,
        outputAtMaxTemp,
        m: mValue,
        c: cValue,
    });
} else {
    console.error(
        `Entry with CATALOGUE NO. ${tracerModelInput} not found in the data.`
    );
}
mVal = entry.m;
cVal = entry.c;

//Thermal Conductivity
const thermalConductivity =
    ((0.04422 - 0.052) / 50) * (50 - (maintainenceTemp + 5) / 2) + 0.043;

//Heat Loss
const heatLoss =
    (2 *
        3.142 *
        thermalConductivity *
        (1 + designMargin / 100) *
        (maintainenceTemp - minAmb)) /
    Math.log((lineOD + 2 * insulationThickness) / lineOD);

//@230V
const hl230v = mVal * maintainenceTemp + cVal; //Fix this

//TRACER OUTPUT @ Neg Tol
const tracerOutput = 0;

//Spiral Ratio
const spiralRatio = 0;

//Tracer for Valves
const tracerForValves = 0;

//Tracer for Flanges
const tracerForFlanges = 0;

//Tracer for Supports
const tracerForSupports = 0;

//Tracer for Pumps
const tracerForPumps = 0;

//Tracer Length
const tracerLength = 0;

//Operating Load
const operatingLoad = 0;

//Operational Current
const operationalCurrent = 0;

//Startup Load
const startupLoad = 0;

//Tracer for Startup Current
const startupCurrent = (startupLoad * 1000) / 230;

//Div Template
const createVariableDiv = (variableName, variableValue, className) => {
    const variableDiv = document.createElement("div");
    variableDiv.style.margin = "5px 0px";
    variableDiv.style.padding = "10px 10px 10px 10px";
    variableDiv.style.width = "100%";
    variableDiv.style.border = "1px solid #ccc";
    variableDiv.style.borderRadius = "5px";
    variableDiv.style.boxSizing = "border-box";
    variableDiv.textContent = `${variableName}: ${variableValue}\n`;
    variableDiv.className = className; // Add the specified class
    return variableDiv;
};

//Div for Inputs
const appendInputVariableDiv = (variableName, variableValue) => {
    const inputVariableDiv = createVariableDiv(
        variableName,
        variableValue,
        "input-variable"
    );
    inputContainerDiv.appendChild(inputVariableDiv);
};

const inputContainerDiv = document.createElement("div");
inputContainerDiv.style.display = "inline-block";
inputContainerDiv.style.verticalAlign = "top";
inputContainerDiv.style.width = "35%";
inputContainerDiv.style.height = "800px";
inputContainerDiv.style.margin = "50px 50px 50px 50px";
inputContainerDiv.style.padding = "20px 50px 50px 50px";
inputContainerDiv.style.border = "1px solid #ccc";
inputContainerDiv.style.borderRadius = "10px";

const inputHeading = document.createElement("h2");
inputHeading.textContent = "Input";
inputContainerDiv.appendChild(inputHeading);

appendInputVariableDiv("Tracer Model", tracerModel);
appendInputVariableDiv("Line Size", lineSize);
appendInputVariableDiv("Line OD", lineOD);
appendInputVariableDiv("Pipe Length", pipeLength);
appendInputVariableDiv("Insulation Thickness", insulationThickness);
appendInputVariableDiv("Maintainence Temperature", maintainenceTemp);
appendInputVariableDiv("Operational Temperature", operationalTemp);
appendInputVariableDiv("Design Temperature", designTemp);
appendInputVariableDiv("No. of Valves", valveCount);
appendInputVariableDiv("No. of Flanges", flangeCount);
appendInputVariableDiv("No. of Supports", supportCount);
appendInputVariableDiv("No. of Pumps", pumpCount);
appendInputVariableDiv("Minimum Ambiant Temperature", minAmb);
appendInputVariableDiv("Maximum Ambiant Temperature", maxAmb);
appendInputVariableDiv("Design Margin", designMargin);

document.body.appendChild(inputContainerDiv);

//Div for Outputs
const outputContainerDiv = document.createElement("div");
outputContainerDiv.style.display = "inline-block";
outputContainerDiv.style.height = "800px";
outputContainerDiv.style.verticalAlign = "top";
outputContainerDiv.style.width = "35%";
outputContainerDiv.style.margin = "50px 50px 50px 50px";
outputContainerDiv.style.padding = "20px 50px 50px 50px";
outputContainerDiv.style.border = "1px solid #ccc";
outputContainerDiv.style.borderRadius = "10px";

const appendOutputVariableDiv = (variableName, variableValue) => {
    const outputVariableDiv = createVariableDiv(
        variableName,
        variableValue,
        "output-variable"
    );
    outputContainerDiv.appendChild(outputVariableDiv);
};

const outputHeading = document.createElement("h2");
outputHeading.textContent = "Output";
outputContainerDiv.appendChild(outputHeading);

appendOutputVariableDiv("Thermal Conductivity", thermalConductivity);
appendOutputVariableDiv("Heat Loss", heatLoss);
appendOutputVariableDiv("Heat Loss @230V", hl230v);
appendOutputVariableDiv("Tracer output", tracerOutput);
appendOutputVariableDiv("Spiral Output", spiralRatio);
appendOutputVariableDiv("Tracer For Valves", tracerForValves);
appendOutputVariableDiv("Tracer For Flanges", tracerForFlanges);
appendOutputVariableDiv("Tracer For Supports", tracerForSupports);
appendOutputVariableDiv("Tracer For Pumps", tracerForPumps);
appendOutputVariableDiv("Tracer Length", tracerLength);
appendOutputVariableDiv("Operating Load", operatingLoad);
appendOutputVariableDiv("Operational Current", operationalCurrent);
appendOutputVariableDiv("Startup Load", startupLoad);
appendOutputVariableDiv("Startup Current", startupCurrent);
appendOutputVariableDiv("Startup Current", startupCurrent);
appendOutputVariableDiv("Startup Current", startupCurrent);

document.body.appendChild(outputContainerDiv);

//Server Push
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
