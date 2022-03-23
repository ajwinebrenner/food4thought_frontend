import { useState, useEffect } from "react";
import Header from "../components/Header";
import SubmissionForm from "../components/SubmissionForm";
import MealsContainer from "../containers/MealsContainer";
import SuggestedMealsContainer from "../containers/SuggestedMealsContainer";

const AccountPage = ({allMeals, user, setUser, faves}) => {

    const [faveMeals, setFaveMeals] = useState([]);

    const loadFaveMeals = () => {
        const faveArray = [];
        allMeals.forEach(meal => {
            for (let i = 0; i < faves.length; i++) {
                if (meal.id === faves[i]) {
                    faveArray.push(meal);
                }
            }
        });
        setFaveMeals(faveArray);
    }

    useEffect(loadFaveMeals, [allMeals, faves]);

    return(
        <>
            <SubmissionForm user={user} onSubmitUser={setUser}/>
            <SuggestedMealsContainer user = {user} faves = {faves}/>
            <MealsContainer meals={faveMeals} faves={faves}/>
        </>
    );
}

export default AccountPage;