import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubmissionForm from "../components/SubmissionForm";
import MealsContainer from "../containers/MealsContainer";
import SuggestedMealsContainer from "../containers/SuggestedMealsContainer";

const AccountPage = ({allMeals, user, setUser, faves, setFaves, cardNum, setCardNum, setMealId, routeChange}) => {

    const [faveMeals, setFaveMeals] = useState([]);

    const loadFaveMeals = () => {
        console.log(faves);
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
        <hr/>
            <section className="ribbon">
                <h2 className="card__title centerText marginBelow">Find recommended recipe:</h2>
                <SubmissionForm user={user} onSubmitUser={setUser}/>
            </section>
            <SuggestedMealsContainer user = {user} faves = {faves} setFaves={setFaves} setMealId={setMealId}/>
            
            <section className="bigRibbon ">
                <h2 className="card__title white-text">Your favourites:</h2>
            </section>
            <MealsContainer meals={faveMeals} faves={faves} setFaves={setFaves} setMealId={setMealId}/>
            <Footer/>
        </>
    );
}

export default AccountPage;