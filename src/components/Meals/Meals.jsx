import useHTTP from "../../hooks/useHTTP";
import MealItem from "./MealItem";
import Error from "../Error";
import { useState } from "react";
import noodles from "../../assets/imgs/noodles.jpg";
import manchurinrice from "../../assets/imgs/manchurinrice.jpeg";
import veggiemanchirin from "../../assets/imgs/veggiemanchirin.jpg";
import chickenbiryani from "../../assets/imgs/chickenbiryani.jpg";
import vegbiryani from "../../assets/imgs/vegbiryani.jpg";
import mattonbiryani from "../../assets/imgs/mattonbiryani.jpg";
import vegitablepizza from "../../assets/imgs/vegitablepizza.jpg";
import paneerpizza from "../../assets/imgs/paneerpizza.jpg";
import chanapoha from "../../assets/imgs/chanapoha.jpg";

//since it's GET-Request we don't need to mention "config" obj
// to prevent infinite-loop we declare it outside of our Component
// create this obj once only at the first render and thereafter
// we're always using the same obj in the memory
const requestConfig = {};

export default function Meals() {
  // const {
  //   data: mealList,
  //   isLoading,
  //   error,
  // } = useHTTP('http://localhost:3000/meals', requestConfig, []);

  // if (isLoading) {
  //   return <p className="fetching-meals"> Fetching Meals... 🍴 </p>;
  // }

  // if (error) {
  //   return <Error title="Failed To Fetch Meals ⛔" message={error} />;
  // }

  // if (!mealList) {
  //   return <p className="no-meals"> No Meals Found 🔍 </p>;
  // }

  const [mealList, setMenuList] = useState([
    {
      id: 1,
      name: "Noodles",
      image: noodles,
      price: 49,
    },
    {
      id: 2,
      name: "Manchurin Rice",
      image: manchurinrice,
      price: 80,
    },
    {
      id: 3,
      name: "Veggie Manchurin",
      image: veggiemanchirin,
      price: 60,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      image: chickenbiryani,
      price: 250,
    },
    {
      id: 5,
      name: "Veg Biryani",
      image: vegbiryani,
      price: 130,
    },
    {
      id: 6,
      name: "Matton Biryani",
      image: mattonbiryani,
      price: 280,
    },
    {
      id: 7,
      name: "Veg Pizza",
      image: vegitablepizza,
      price: 180,
    },
    {
      id: 8,
      name: "Panner Pizza",
      image: paneerpizza,
      price: 180,
    },
    {
      id: 9,
      name: "Chana Poha",
      image: chanapoha,
      price: 180,
    },
  ]);

  return (
    <>
      <ul id="meals">
        {mealList.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
      <div className="copyright">
        Designed and Developed by{" "}
        <a href="https://www.royalswebtech.com/">
          <span>
            <i>© Royals WebTech 2024</i>
          </span>
        </a>
      </div>
    </>
  );
}

/* FIRST STEP TO FETCH DATA
* open separate TERMINAL
  - cd backend
  - npm install
  - node app.js

* so the backend can runs with the frontend
*/

/* useEffect
const [mealList, setMealList] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
         throw new Error(
          `Failed to fetch meals. HTTP error! status: ${response.status}`
         );
      }

      const meals = await response.json();
      setMealList(meals);
      /// console.log('Fetched meals:', meals);
    }

    fetchMeals();
  }, []);
*/
