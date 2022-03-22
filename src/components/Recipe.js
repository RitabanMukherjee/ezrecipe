import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { changeLoadingStatus } from '../features/loadingTrackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {IoFastFoodOutline} from 'react-icons/io5'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { updateCounter } from '../features/recipeCounterSlice';

const Recipe = () => {
    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe.value)
    const [details, setDetails] = useState({})
    const loading = useSelector((state) => state.loadingTracker.value);
    const navigation = useNavigate();

  useEffect(() => {
        const fetchData = async() => {
            dispatch(changeLoadingStatus(true));
            
            try{
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`);
                setDetails(response.data.meals[0]);
            }catch(error){
                console.log(error);
                navigation('*')
            }
            dispatch(changeLoadingStatus(false));
        }

        fetchData();       
    
    }, [dispatch, recipe])


  return (
    <>
    {
      loading ? 
      <motion.div
      initial={{ y: '20vh'}}
      animate={{scale: 1.5, y:'70vh'}}
      transition={{repeat: 'Infinity', duration: 0.7}}
      className='loading-div'
  >
      <h1>Coming Right Up....</h1>
      <IoFastFoodOutline style={{fontSize: '5rem'}}/>
  </motion.div>
      : 
      <div>
          <h1 style={{color: 'blue'}}>{details.strMeal}</h1>
      <img src={details.strMealThumb} alt='' className='img-recipe'/>
<h1 style={{color: 'blue'}}>List of Ingredients:</h1>
<div className='ingredient-div'>
    <p>{details.strIngredient1}</p>
    <p>{details.strIngredient2}</p>
    <p>{details.strIngredient3}</p>
    <p>{details.strIngredient4}</p>
    <p>{details.strIngredient5}</p>
    <p>{details.strIngredient6}</p>
    <p>{details.strIngredient7}</p>
    <p>{details.strIngredient8}</p>
    <p>{details.strIngredient9}</p>
    <p>{details.strIngredient10}</p>
    <p>{details.strIngredient11}</p>
    <p>{details.strIngredient12}</p>
    <p>{details.strIngredient13}</p>
    <p>{details.strIngredient14}</p>
    <p>{details.strIngredient15}</p>
    <p>{details.strIngredient16}</p>
    <p>{details.strIngredient17}</p>
    <p>{details.strIngredient18}</p>
    <p>{details.strIngredient19}</p>
    <p>{details.strIngredient20}</p>
</div>
<h1 style={{color: 'blue'}}>Detailed Instructions:</h1>
      <div className='instruction-div'>{details.strInstructions}</div>
      <div style={{height: '5vh'}}></div>
      <motion.button
                 type='button' className='submit-btn'
                 initial={{scale: 1}}
                 whileHover={{scale: 1.2}}
                 whileTap={{scale: 0.8}}
                 onClick={() => dispatch(updateCounter({idMeal: details.idMeal, strMeal: details.strMeal, strCategory: details.strCategory, strArea: details.strArea, strMealThumb: details.strMealThumb}))}
                 >
                     Add to Favorites</motion.button>
                     <div style={{width: '5vw', height: '5vh'}}></div>
      <motion.button type='button'
       className='submit-btn'
       initial={{scale: 1}}
        whileHover={{scale: 1.2}}
        whileTap={{scale: 0.8}}
       onClick={() => navigation(-1)}>Go Back</motion.button>
        <div style={{width: '5vw', height: '5vh'}}></div>
     </div>
    }
    </>
  )
}

export default Recipe