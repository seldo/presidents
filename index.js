const csv = require('fast-csv');
const fs = require('fs')

let flatData = []

csv
    .parseFile('./biographies.csv',{headers:true})
    .on('error', error => console.error(error))
    .on('data', row => flatData.push(row))
    .on('end', rowCount => {
        let entries = flatData.map((row) => {
            return `<li>
                <h2>${row['Name']}</h2>
                <h3><a href="${row['Book Link']}">${row['Book']}</a> by ${row['Book Author']}</h3>
                <p>${ (row['Recommend?'] == 'Y') ? 'Recommended. ' : 'Not recommended. ' }${row['Book mini-review']}</p>
                <blockquote class="twitter-tweet">
                    <a href="${row['Tweets']}">Tweet</a>
                </blockquote>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
            </li>`
        })

        //fs.writeFileSync('./data/slides.json', JSON.stringify(structuredData,null,1))
        console.log(entries.join("\n"))
    });