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
    console.log("inputs:\ni1: " + lineSize + "\ni2: " + lineOD);
    res.render("report", {
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
    const input1 = req.body.input1;
    const input2 = req.body.input2;
    const result1 = req.body.result1;
    const result2 = req.body.result2;
    console.log("inputs:", input1, input2, "\noutputs:", result1, result2);
    res.json({ success: true, message: "server push successful" });
});
