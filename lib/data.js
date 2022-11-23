import { parse } from 'node-html-parser';
const fs = require('fs/promises');
var path = require('path');

export async function load() {
    var jsonPath = path.join(__dirname, '..', 'www.hlx.live.home.html');
    const data = await fs.readFile(jsonPath, { encoding: 'utf8' });
    const root = parse(data);
    const links = root.querySelectorAll('a');
    console.log(root);

    return data;
}