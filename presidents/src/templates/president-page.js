import React from "react"
import FunFacts from "../components/funfacts"
import Layout from "../components/layout"

import SEO from "../components/seo"

export default ({ pageContext }) => {
  let president = pageContext.president
  return (
    <Layout>
      <SEO
        title={`President ${president.President}`}
        description="A list of all the US presidents, arbitrarily ranked by @seldo"
      />
      <div className="presidentPage">
        <FunFacts president={president} />
        <div class="backCTA">
          <a href="/">Back to index</a>
        </div>
      </div>
    </Layout>
  )
}
