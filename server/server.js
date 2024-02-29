import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ejs from "ejs";

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

app.get("/form", (req, res) => {
    res.render("form");
});

app.post("/report", (req, res) => {
    const something1Value = req.body.something_1;
    const something2Value = req.body.something_2;
    console.log("inputs:\ni1: " + something1Value + "\ni2: " + something2Value);
    res.render("report", { something1Value, something2Value });
});

app.post("/send-results", (req, res) => {
    const input1 = req.body.input1;
    const input2 = req.body.input2;
    const result1 = req.body.result1;
    const result2 = req.body.result2;
    console.log("inputs:", input1, input2, "\noutputs:", result1, result2);
    res.json({ success: true, message: "server push successful" });
});
