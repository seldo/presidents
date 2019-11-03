import React from "react"

function FunFacts({president}) {
  return (
    <div className="funFacts">
      <img 
        alt={president.Name}
        src={"/presidents/"+president.Number+".jpg"} 
      />
      <h2>{president.President}</h2>
      <h3>Pros:</h3>
      <p>{president.Pros}</p>
      <h3>Cons:</h3>
      <p>{president.Cons}</p>
      <h3>Fun facts:</h3>
      <p>Facts go here.</p>
      <div className="crimeList">
        <h3>Crime report</h3>
        { (president['Slavery'] || president['Genocide'] || president['War Crimes'] || president['Rape'] || president['Corruption']) ? (
          <ul>
          {(president['Slavery']) ? <li>😡 Owned slaves</li> : <></>}
          {(president['Genocide']) ? <li>😡 Genocide</li> : <></>}
          {(president['War Crimes']) ? <li>😡 War crimes</li> : <></>}
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
