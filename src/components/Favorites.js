import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { changeLoadingStatus } from '../features/loadingTrackerSlice';
import { useNavigate } from 'react-router-dom';
import { updateRecipe } from '../features/recipeSlice';

const Favorites = () => {
  const favoritesList = useSelector((state) => state.recipeCounter.value);
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(false);
  dispatch(changeLoadingStatus(false));
  const navigation = useNavigate();
  const [isPlural, setIsPlural] = useState(false);

const list = favoritesList.filter((item) => {
  return item.strMeal !== '';
})


useEffect(() => {
  if(list.length === 0){
    setIsEmpty(true);
    setIsPlural(false)
  }else if(list.length === 1){
    setIsPlural(false)
  }else{
    setIsPlural(true)
  }
},[list])



const distinctList =  [...new Map(list.map((item) => [item["strMeal"], item])).values()];

const finalList = distinctList.filter((item) => {
  return typeof(item) !== 'undefined';
})

console.log(distinctList)

  return (

    <>
    {
        isEmpty? 
        <div className='empty-favorites'>
          <h1 style={{color: 'blue'}}>You don't have any items favorited yet!</h1>
        </div>
        : 
    <div className='favorites'>
      {
        isPlural? <h1 className='favorites-number'>You have {distinctList.length} favorited recipes</h1>:
           <h1 className='favorites-number'>You have {distinctList.length} favorited recipe</h1>
      }
      
        {
          finalList.map((item) => {
            const {idMeal, strMeal, strCategory, strArea, strMealThumb} = item;
                return <> 
                <div className='meal' key={idMeal}>
                <img src={strMealThumb} className='img' alt={`${strMeal} depiction`}/>
                <div className='text'>
                <h2>{strMeal}</h2>
                <h2>{strCategory}</h2>
                <h2>{strArea}</h2>
                </div>
                <motion.button
                 type='button' className='btn'
                 initial={{scale: 1}}
                 whileHover={{scale: 1.2}}
                 whileTap={{scale: 0.8}}
                 onClick={() => {navigation(`../recipes/${idMeal}`); dispatch(updateRecipe(idMeal))}}
                 >
                     View Recipe</motion.button>
                </div>
                </>
          })
        }
    </div>
}
</>
  )
}

export default Favorites