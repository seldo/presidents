import React from "react"
import PresidentImage from "./presidentImage"

function FunFacts({president,passInClose}) {
  return (
    <div className="funFacts" onClick={passInClose}>
      <div className="imgContainer">
        <PresidentImage number={president.Number} size="sidePanel"/>
      </div>
      <h2>{president.President}</h2>
      <h3>Pros:</h3>
      <p>{president.Pros}</p>
      <h3>Cons:</h3>
      <p>{president.Cons}</p>
      <h3>Fun facts:</h3>
      <p>{president.Fun_Fact}</p>
      <div className="crimeList">
        <h3>Crime report</h3>
        { (president['Slavery'] || president['Genocide'] || president['War_Crimes'] || president['Rape'] || president['Corruption']) ? (
          <ul>
          {(president['Slavery']) ? <li>😡 Owned slaves</li> : <></>}
          {(president['Genocide']) ? <li>😡 Genocide</li> : <></>}
          {(president['War_Crimes']) ? <li>😡 War crimes</li> : <></>}
          {(president['Rape']) ? <li>😡 Sexual assault</li> : <></>}
          {(president['Corruption']) ? <li>😡 Corruption</li> : <></>}
          </ul>
        ) : (
          <p>No known crimes!</p>
        )}
      </div>
    </div>
  )
}

export default FunFacts
