import MealCard from "../components/MealCard";
import ChefCardMini from "../components/ChefCardMini";
import { useState, useEffect, forceUpdate } from "react";
import { useNavigate } from "react-router-dom";

const SuggestedMealsContainer = ({user, faves, setFaves, setMealId}) => {

    const [suggested, setSuggested] = useState({});
    const [chefs, setChefs] = useState([]);
    

    //validation
    const hasInfo = () => {
        if (user.mainIngredient && user.difficulty) {
            return true;
        }
        else {
            return false;
        }
    }


    const suggest = () => {
        if (hasInfo()) {
            fetch("http://localhost:8080/user", { 
            // authorize
                method: "POST",
                headers: {
                    'Authorization': 'Basic '+btoa('foo:foo'), 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                // set by response body
                .then(response => response.json())
                .then(meal => {
                    setSuggested(meal);
                    // find relevant chefs
                    if (meal.chefs){
                        const chefCards = meal.chefs.map(chef => {
                            return <ChefCardMini chef={chef} key={chef.id} />
                        })
                        setChefs(chefCards);
                    } else {
                        setChefs([]);
                    }
                })
                // catch error
                .catch(error => console.error(error)
                    )   
        }
    
    }

    // redirect on click
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/chefs`; 
        navigate(path);
    }

    useEffect(suggest, [user]);
    // useEffect(() => {
    //     for (let i = 0; i<=faves.length; i++){
    //         if (suggested.id === faves[i]){
    //             setFavouriteClass('favourite');
    //             break;
    //         } 
    //     } 
    //     setFavouriteClass('');
    // }, [faves]);
    

    // create array of ChefCardMini and use that instead
    if (hasInfo()) {
        if (chefs.length > 1) {
            return (
                <>
                    <article className="columnFlex">
                        <MealCard meal={suggested} faves={faves} setFaves={setFaves} setMealId={setMealId}/>
                        <div className="innerBubble middleFlex chefs" onClick={() => routeChange()}>{chefs[0]} <label className="primary-text">|</label> {chefs[1]}</div>
                    </article>
                </>
            )
        } else {
            return (
                <>
                    <article className="columnFlex">
                        <MealCard meal={suggested} faves={faves} setFaves={setFaves} setMealId={setMealId}/>
                    </article>
                </>
            )
        }
    } else {
        return (
            <>
                <h3 className="centerText">Please enter user details</h3>
            </>
        )
    }   
}

export default SuggestedMealsContainer;