import React from 'react';
import AnimalCards from '../components/AnimalCards'


const AnimanlContainer = props => {

  return (
      <div>

        {props.animals.map((animal, idx) => {
         return <AnimalCards key={idx} animal={animal} animals={props.animals} />
       })
      }

      </div>
  )
};

export default AnimanlContainer
