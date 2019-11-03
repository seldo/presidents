import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
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
  const [president,setPresident] = useState({})
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{display: `flex`, flexDirection: `row`}}>
        <div>
          <ol>
          {
            data.allTiersJson.edges.map(({node},index) => {
              return <li>
                <div style={{ maxWidth: `100px`, marginBottom: `1.45rem` }}>
                  <img style={{maxHeight: `80px`, borderRadius: `100%`}} src={"/presidents/"+node.Number+".jpg"} />
                </div>
                <p onMouseOver={() => setPresident(node)}>{node.President}</p>
              </li>
            })
          }
          </ol>
        </div>
        <div>
          {president.President}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
