import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const PresidentImage = ({number,size}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "presidents"}}, sort: {fields: relativePath, order: ASC}) {
        edges {
          node {
            relativePath
            relativeDirectory
            childImageSharp {
              thumbnail: fixed(width: 55, height: 65, cropFocus: CENTER) {
                ...GatsbyImageSharpFixed
              }
              sidePanel: fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  // gross hack to find the right one
  //return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
  let imgData = data.allFile.edges.find((element) => {
    return (element.node.relativePath === `presidents/${number}.jpg`)
  })
  if(size == 'thumbnail') {
    return <Img fixed={imgData.node.childImageSharp.thumbnail}/>
  } else {
    return <Img fluid={imgData.node.childImageSharp.sidePanel}/>
  }
  
}

export default PresidentImage
