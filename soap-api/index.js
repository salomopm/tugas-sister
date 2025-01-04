const express = require("express");
const soap = require("soap");
const fs = require("fs");
const path = require("path");

const app = express();
const service = require("./service");

const wsdlPath = path.join(__dirname, "wsdl", "service.wsdl");

app.use(express.json());

app.listen(3000, () => {
    const wsdl = fs.readFileSync(wsdlPath, "utf8");
    soap.listen(app, "/soap", service, wsdl);
    console.log("SOAP server is running at http://localhost:3000/soap");
});
