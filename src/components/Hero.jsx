import { useEffect, useRef, useState } from "react";
import GenRecipe from "./GenRecipe";
import IngredientList from "./IngredientList";
// import { getRecipeFromGemini } from "../api/gemini";
import { getRecipeFromGemini } from "../utils/getRecipe";

export default function Hero() {
  const [ingredients, setIngredients] = useState([]);
  // const [recipeShown, togglerecipeShown] = useState(false);
  const recipeSection = useRef(null);
  console.log(recipeSection);
  const [recipe, setRecipe] = useState("");

  const items = ingredients.map((element) => <li key={element}>{element}</li>);

  function handleSubmit(formData) {
    const newitem = formData.get("ingredient").trim();
    if (!newitem) return;
    setIngredients((prev) => [...prev, newitem]);
  }

  // function showRecipe() {
  //   togglerecipeShown((prev) => !prev);
  // }

  // showing ai recipe
  async function fetchRecipe() {
    const recipeText = await getRecipeFromGemini(ingredients);
    setRecipe(recipeText);
  }

  useEffect(() => {
    if (recipe !== "" && recipeSection.current != null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  return (
    <main className="flex justify-center items-center pt-20 flex-col gap-20 mr-6 ml-6  md:mr-35 md:ml-35">
      <div id="tagline" className="flex justify-center w-full max-w-4xl px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight text-shadow-amber">
            Few ingredients in the kitchen?
          </h1>
          <p className="text-2xl font-semibold md:text-3xl text-amber-700 mt-3">
            No Worries, We've got you covered!
          </p>
          <p className="text-lg mt-4 font-medium text-amber-600">
            Add your leftover ingredients and let us do the magic
          </p>
        </div>
      </div>

      <form
        className="flex sm:flex-row flex-col gap-10 md:gap-22 justify-center items-center"
        action={handleSubmit}
      >
        <input
          aria-label="Add Ingredients"
          type="text"
          placeholder="bread, cheese, tomatoes..."
          className="drop-shadow-lg hover:drop-shadow-xl bg-gray-100 h-12 w-75 md:h-12 md:w-150 rounded-md pl-2 text-amber-900 placeholder:text-amber-800"
          name="ingredient"
        />
        <button
          type="submit"
          className="rounded-md bg-amber-400 h-12 w-75 drop-shadow-lg hover:drop-shadow-xl text-[18px]"
        >
          + Add Ingredient
        </button>
      </form>

      {ingredients.length >= 0 && (
        <IngredientList ingredients={ingredients} getRecipe={fetchRecipe} />
      )}

      {recipe && <GenRecipe ref={recipeSection} recipe={recipe} />}
    </main>
  );
}
