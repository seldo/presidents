/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('node-fetch')

const call = "https://sheets.googleapis.com/v4/spreadsheets/14pdn9yikv2ET9SNz2mcdAoh4On5sgHfkI-HbCEfrLdI/values/'Tiers'!A:L?key=" + process.env.GOOGLE_API_KEY
let presidents = []

exports.onPreBootstrap = async () => {
    // get the presidents
    try {
        let response = await fetch(call)
        let json = await response.json()
        let headers = json.values.shift()
        presidents = json.values.map((president) => {
            let row = {}
            headers.forEach((header, index) => {
                row[header] = president[index]
            })
            return row
        })
    } catch (e) {
        console.log(`Failed to fetch presidents`)
        console.log(e)
    }
}

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions
    deletePage(page)
    createPage({
        ...page,
        context: {
            ...page.context,
            presidents
        },
    })
}

exports.onCreateNode = ({ node }) => {
    console.log(node.internal)
}