/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

// if (!process.env.GOOGLE_API_KEY) {
//   throw new Error("Must define env var GOOGLE_API_KEY")
// }
// const call =
//   "https://sheets.googleapis.com/v4/spreadsheets/14pdn9yikv2ET9SNz2mcdAoh4On5sgHfkI-HbCEfrLdI/values/'Tiers'!A:P?key=" +
//   process.env.GOOGLE_API_KEY
let presidents = require("./tiers.json")

// const getPresidents = async () => {
//   // get the presidents
//   try {
//     let fetch = await import("node-fetch")
//     let response = await fetch(call)
//     let json = await response.json()
//     let headers = json.values.shift()
//     presidents = json.values.map(president => {
//       let row = {}
//       headers.forEach((header, index) => {
//         row[header] = president[index]
//       })
//       return row
//     })
//   } catch (e) {
//     console.log(`Failed to fetch presidents`)
//     console.log(e)
//   }
// }

// exports.onPreBootstrap = async () => {
//   await getPresidents()
// }

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      presidents,
    },
  })
}

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions
  // Create pages for each president
  const presidentPageTemplate = path.resolve(`src/templates/president-page.js`)
  presidents.forEach(president => {
    createPage({
      path: "/president/" + president.Number,
      component: presidentPageTemplate,
      context: {
        president,
      },
    })
  })
}
