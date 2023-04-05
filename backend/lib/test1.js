const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs");

html_to_pdf = async ({ templateHtml, dataBinding, options }) => {
  const template = handlebars.compile(templateHtml);
  const finalHtml = encodeURIComponent(template(dataBinding));

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
    waitUntil: "networkidle0",
  });
  await page.pdf(options);
  await browser.close();
};

// const dataBinding={
//     name:"Vikram",
//     flightId:"AI-123",
// }


//let image =fs.readFileSync('backend/mailbody/Cloud9logo.png').toString('base64')


module.exports={html_to_pdf};