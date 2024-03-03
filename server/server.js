import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "../client/assets")));
app.use(express.static(join(__dirname, "../client/scripts")));

app.listen(port, () => {
    console.log(`Server:${port}`);
});

app.get("/form", (_, res) => {
    res.render("form");
});

app.post("/report", (req, res) => {
    const tracerModel = req.body.tracer_model;
    const lineSize = req.body.line_size;
    const lineOD = req.body.line_od;
    const pipeLength = req.body.pipe_length;
    const insulationThickness = req.body.insulation_thickness;
    const maintainenceTemp = req.body.maintainence_temp;
    const operationalTemp = req.body.operational_temp;
    const designTemp = req.body.design_temp;
    const valveCount = req.body.valve_count;
    const flangeCount = req.body.flange_count;
    const supportCount = req.body.support_count;
    const pumpCount = req.body.pump_count;
    const minAmb = req.body.min_amb;
    const maxAmb = req.body.max_amb;
    const designMargin = req.body.design_margin;
    console.log("inputs:\ni1: " + tracerModel + "\ni2: " + lineOD);
    res.render("report", {
        tracerModel,
        lineSize,
        lineOD,
        pipeLength,
        insulationThickness,
        maintainenceTemp,
        operationalTemp,
        designTemp,
        valveCount,
        flangeCount,
        supportCount,
        pumpCount,
        minAmb,
        maxAmb,
        designMargin,
    });
});

app.post("/send-results", (req, res) => {
    const tracerModel = req.body.tracerModel;
    const lineSize = req.body.lineSize;
    const lineOD = req.body.lineOD;
    const pipeLength = req.body.pipeLength;
    const insulationThickness = req.body.insulationThickness;
    const maintainenceTemp = req.body.maintainenceTemp;
    const operationalTemp = req.body.operationalTemp;
    const designTemp = req.body.designTemp;
    const valveCount = req.body.valveCount;
    const flangeCount = req.body.flangeCount;
    const supportCount = req.body.supportCount;
    const pumpCount = req.body.pumpCount;
    const minAmb = req.body.minAmb;
    const maxAmb = req.body.maxAmb;
    const designMargin = req.body.designMargin;

    const thermalConductivity = req.body.thermalConductivity;
    const heatLoss = req.body.heatLoss;
    const hl230v = req.body.hl230v;
    const tracerOutput = req.body.tracerOutput;
    const spiralRatio = req.body.spiralRatio;
    const tracerForValves = req.body.tracerForValves;
    const tracerForFlanges = req.body.tracerForFlanges;
    const tracerForSupports = req.body.tracerForSupports;
    const tracerForPumps = req.body.tracerForPumps;
    const tracerLength = req.body.tracerLength;
    const operatingLoad = req.body.operatingLoad;
    const operationalCurrent = req.body.operationalCurrent;
    const startupLoad = req.body.startupLoad;
    const startupCurrent = req.body.startupCurrent;
    console.log(
        "inputs:",
        tracerModel,
        lineSize,
        "\noutputs:",
        thermalConductivity,
        heatLoss
    );
    res.json({ success: true, message: "server push successful" });
});
