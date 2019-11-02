const fs = require('fs')
const csv = require('fast-csv')

let data = []

csv
    .parseFile('./tiers.csv',{headers:true})
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', rowCount => {
        fs.writeFileSync('./tiers.json',JSON.stringify(data))
    })