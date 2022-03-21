import Header from "../components/Header";
import SuggestedMealsContainer from "../containers/SuggestedMealsContainer";
import MealsContainer from "../containers/MealsContainer";
import { useEffect, useState } from "react";

const MealsPage = () => {

    const [allMeals, setAllMeals] = useState([]);

    const loadAllMeals = () => {fetch("http://localhost:8080/meals")
            .then(response => response.json())
            .then(data => setAllMeals(data))
            .catch(error => console.error(error))   
}
    useEffect(loadAllMeals, []);


    return(
        <>
            <Header/>
            <SuggestedMealsContainer/>
            <MealsContainer meals={allMeals}/>
        </>
    );
}

export default MealsPage;