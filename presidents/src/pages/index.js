import React, { useState } from "react"
import { Drawer } from '@material-ui/core';
import useEventListener from "@use-it/event-listener"
import { useSwipeable, Swipeable } from 'react-swipeable'

import Layout from "../components/layout"
import SEO from "../components/seo"
import FunFacts from "../components/funfacts"
import "./index.css"
import PresidentImage from "../components/presidentImage"

const IndexPage = ({pageContext}) => {
  const presidents = pageContext.presidents
  const tiers = []
  presidents.forEach( (p,index) => {
    if(!tiers[p.Tier]) tiers[p.Tier] = []
    tiers[p.Tier].push(p)
  })
  let tierOrder = ['Awesome','Great','Above average','Average','Below average','Awful','The worst']
  const [president,setPresident] = useState({})
  const [drawerOpen,setDrawerOpen] = useState(false)
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const swipeHandlers = useSwipeable({ onSwiped: (eventData) => {
    if(eventData.dir === "Right") {
      advancePresident("back")
    } else if (eventData.dir === "Left") {
      advancePresident("forward")
    }
  }})

  useEventListener('keydown', (e) => {
    if(e.code === "ArrowLeft") {
      advancePresident("back")
    } else if (e.code === "ArrowRight") {
      advancePresident("forward")
    }
  })

  let advancePresident = (direction) => {
    if(drawerOpen) {
      let currentPresidentIndex = presidents.indexOf(president)
      let nextIndex
      if (direction === "back") {        
        nextIndex = currentPresidentIndex - 1
        if (nextIndex < 0) nextIndex = presidents.length - 1
      } else if (direction === "forward") {
        nextIndex = currentPresidentIndex + 1
        if (nextIndex >= presidents.length) nextIndex = 0
      } else {
        return
      }
      setPresident(presidents[nextIndex])
    }
  }

  return (
    <Layout>
      <SEO 
        title="US Presidents, Ranked" 
        description="A list of all the US presidents, arbitrarily ranked by @seldo"
      />
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
                      return <li key={president.Number}>
                        <a
                          alt={president.President} 
                          href={"/president/"+president.Number}
                          onClick={(e) => {
                            e.preventDefault()
                            setPresident(president)
                            toggleDrawer()
                          }}
                        >
                          <div>
                            <div className="imgHolder">
                              <PresidentImage 
                                number={president.Number} 
                                size="thumbnail"
                                alt={president.President}
                              />
                            </div>
                            <div className="seo">
                              <FunFacts president={president}/>
                            </div>
                          </div>
                        </a>
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
      <section className="about">
        <h2>What is this?</h2>
        <p>
          Once upon a time, for fun, I embarked on a project to read <a href="http://seldo.com/weblog/2019/09/27/biographies_of_every_us_president_as_audiobooks">biographies of every US president</a> up to George HW Bush. 
          Naturally, I ended up having some opinions about which presidents were better. I also wanted to play with Gatsby and Netlify. So I built this little website to do all those things.
        </p>
        <p>
          I welcome questions and suggestions <a href="https://twitter.com/seldo">on Twitter</a>, but it is pretty unlikely I will change my rankings as a result of you yelling at me.
        </p>
        <h3>How can a war criminal be great?!</h3>
        <p>
          It is important to note that these presidents are very much ranked <b>on a curve</b>; they are almost without fail huge assholes, many of whom committed atrocities. These rankings are only relative to the other presidents and not an absolute judgement of their worth as human beings.
        </p>
        <h3>Why stop at Bush 41?</h3>
        <p>The arbitrary line I stopped at is "last dead president". Carter is still alive, so biographies of him are incomplete. Once presidents die, people feel more free to say less complimentary things about them (for instance, everyone denied Eisenhower was having an affair, even though he <b>obviously</b> was having an affair, until he died). Add to that the problem that for more recent presidents, some of the things they did are still classified. New facts about Nixon's presidency were still being revealed in 2007, and Reagan and Carter's presidencies are still largely shrouded in secrecy. So I will update to include later presidents only upon their death.</p>
      </section>
      <footer>
        © {new Date().getFullYear()} <a href="https://twitter.com/seldo">@seldo</a>.
      </footer>
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(president)} {...swipeHandlers}>
        <FunFacts president={president} passInClose={toggleDrawer}/>
      </Drawer>
    </Layout>
  )
}

export default IndexPage
