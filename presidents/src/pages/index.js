import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allTiersJson {
        edges {
          node {
            id
            President
            Cons
            Corruption
            Genocide
            Grade
            Number
            Pros
            Rape
            Slavery
            Tier
            War_Crimes
          }
        }
      }
    }  
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <h1>{data.allTiersJson.edges[0].node.President}</h1>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <img src="/static/presidents/1.jpg" />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
