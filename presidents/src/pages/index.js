import React, { useState } from "react"
import { Drawer } from '@material-ui/core';

import Layout from "../components/layout"
import SEO from "../components/seo"
import FunFacts from "../components/funfacts"
import "./index.css"
import * as data from "../../tiers.json"

const IndexPage = () => {
  const tiers = []
  data.forEach( (p,index) => {
    if(!tiers[p.Tier]) tiers[p.Tier] = []
    tiers[p.Tier].push(p)
  })
  let tierOrder = ['Awesome','Great','Above average','Average','Below average','Awful','The worst']
  const [president,setPresident] = useState({})
  const [drawerOpen,setDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>
        US Presidents, Ranked
      </h1>
      <div>
        <ol className="tiersList">
        {
          tierOrder.map( (tier) => {
            return (
              <li key={tier}>
                <h2>{tier}</h2>
                <ol className="presidentList">
                  {
                    tiers[tier].map( (president) => {
                      return <li
                          key={president.Number}
                          onTouchEnd={() => {
                            setPresident(president)
                            toggleDrawer()
                          }}
                        >
                        <div className="imgHolder">
                          <img 
                            alt={president.Name}
                            src={"/presidents/"+president.Number+".jpg"} 
                          />
                        </div>
                      </li>
                    })
                  }
                </ol>
              </li>
            )
          })
        }
        </ol>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(president)}>
        <FunFacts president={president}/>
      </Drawer>
    </Layout>
  )
}

export default IndexPage
