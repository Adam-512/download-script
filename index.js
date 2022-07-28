import fetch from 'node-fetch';
import HttpsProxy from 'https-proxy-agent'
import fs from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const proxy = new HttpsProxy("http://127.0.0.1:7890")

const downloadFile = async (url) => {
    let config = {
        method: 'get',
        agent: proxy,
    };
    let response = await fetch(url, config).catch(err => console.log("request error", err))
    return await response.arrayBuffer();
}

const download_source = () => {
    const nation = ['au', 'ca', 'cf', 'dk', 'eu', 'gp', 'hk', 'jp', 'kr', 'mx', 'no', 'nz', 'pl', 'ru', 'se', 'sg', 'tw', 'us']
    return nation.map(v => {
        return {
            link: `https://cdn.stamped.io/cdn/flags/${v}.svg`,
            name: v
        }
    })
}

async function main() {
    let links = download_source()
    for (let item of links) {
        let bufferLogo = await downloadFile(item.link);
        let fileName = `${item.name}.svg`;
        fs.writeFile(path.resolve(__dirname, 'download')+ '/' + fileName, Buffer.from(bufferLogo), function (err) {
        })
    }
}

main()