import { useState } from 'react';

const MealCard = ({meal}) => {


    return(
        <article className="card">
            <h3>{meal.name}</h3>
            <p>{meal.ingredients}</p>
        </article>
    );
}

export default MealCard;