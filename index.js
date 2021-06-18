const express = require('express');
const pdfkit = require('pdfkit');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const server = express();
server.use(express.static(__dirname))


server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.get('/bootstrap', (req, res) => {
    res.sendFile(__dirname + "/bootstrap.html");
})

server.get('/pdf', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const pdfOptions = {
            path: 'test.pdf',
            format: 'A4',
            margin: 0
        }
        await page.goto('http://localhost:3000', {
            'waitUntil':'networkidle2'
        });
        await page.pdf(pdfOptions);
        await browser.close();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

server.listen(3000, () => {
    console.log('server listening on port 3000')
})