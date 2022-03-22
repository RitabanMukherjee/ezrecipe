import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoadingStatus } from '../features/loadingTrackerSlice';
import {IoFastFoodOutline} from 'react-icons/io5'
import { updateCounter } from '../features/recipeCounterSlice';
import { changeInputText } from '../features/inputTextSlice';
import { useNavigate } from 'react-router-dom';
import { updateRecipe } from '../features/recipeSlice';

const Home = () => {
    const [recipes, setRecipes] = useState([{}])
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadingTracker.value);
    // const recipeList = useSelector((state) => state.recipeCounter.value);
    const [mealName, setMealName] = useState('chicken');
    const text = useSelector((state) => state.inputText.value);
    const navigation = useNavigate();
    const [surpriseMeal, setSurpriseMeal] = useState({});
    const [isFound, setIsFound] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            dispatch(changeLoadingStatus(true));
            
            try{
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
                setSurpriseMeal(response.data.meals[0]);
            }catch(error){
                console.log(error)
            }
            dispatch(changeLoadingStatus(false));
        }

        fetchData();
    }, [dispatch])
    

    const handleSubmit = (e) => {
        dispatch(changeInputText(mealName));
    }

    useEffect(() => {
        const fetchData = async() => {
            dispatch(changeLoadingStatus(true));
            
            try{
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
                setRecipes(response.data.meals);
            }catch(error){
                console.log(error);
                setIsFound(false);
            }
            dispatch(changeLoadingStatus(false));
        }

        fetchData();
    
      
    }, [dispatch,text])
    
    useEffect(() => {
        if(recipes && recipes.length > 0){
            setIsFound(true);
        }else{
            setIsFound(false);
            if(text === ''){
                dispatch(changeInputText('chicken'))
            }
        }
    },[dispatch, recipes])

  return (
      <>
    {
        loading? 
        <motion.div
        initial={{ y: '20vh'}}
        animate={{scale: 1.5, y:'70vh'}}
        transition={{repeat: 'Infinity', duration: 0.7}}
        className='loading-div'
    >
        <h1>Coming Right Up....</h1>
        <IoFastFoodOutline style={{fontSize: '5rem'}}/>
    </motion.div>
        : isFound?
    <>
        <div className='form-input'>
            <input type='text' placeholder={text} className='text-input' onChange={(e)=> setMealName(e.target.value)}></input>
            <div className='gap-div'></div>
            <button type='button' className='submit-btn'  onClick={(e) => handleSubmit()}>Search</button>
            <div className='gap-div'></div>
            <button type='button' className='submit-btn' onClick={() => {navigation(`../recipes/${surpriseMeal.idMeal}`); dispatch(updateRecipe(surpriseMeal.idMeal))}}>Surprise Me!</button>
        </div>
    <div className='home'> 
        {
            recipes.map((recipe) => {
                const {idMeal, strMeal, strCategory, strArea, strMealThumb} = recipe;
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
                <motion.button
                 type='button' className='btn'
                 initial={{scale: 1}}
                 whileHover={{scale: 1.2}}
                 whileTap={{scale: 0.8}}
                 onClick={() => dispatch(updateCounter({idMeal: idMeal, strMeal: strMeal, strCategory: strCategory, strArea: strArea, strMealThumb: strMealThumb}))}
                 >
                     Add to Favorites</motion.button>
                
                </div>
        </>
            })
        }
    </div>
    </>:
    <>
    <div className='form-input'>
            <input type='text' placeholder={text} className='text-input' onChange={(e)=> setMealName(e.target.value)}></input>
            <div className='gap-div'></div>
            <button type='button' className='submit-btn'  onClick={(e) => handleSubmit()}>Search</button>
            <div className='gap-div'></div>
            <button type='button' className='submit-btn' onClick={() => {navigation(`../recipes/${surpriseMeal.idMeal}`); dispatch(updateRecipe(surpriseMeal.idMeal))}}>Surprise Me!</button>
        </div>
    <div className='not-found-div'>
    <h1>The Recipe you are looking for does not exist in the database!</h1>
    <h2>But we have some other great recipes in store for you!</h2>
    <button type='button' className='submit-btn' onClick={() => {navigation(`../recipes/${surpriseMeal.idMeal}`); dispatch(updateRecipe(surpriseMeal.idMeal)); dispatch(changeInputText('chicken'))}}>Surprise Me!</button>
    <div style={{height: '5vh'}}></div>
    <button type='button' className='submit-btn' onClick={() => {navigation('../'); dispatch(changeInputText('chicken'))}}> Back to Main Page</button>
    </div> 
    </>
    }
    <div className='footer'>
        <h2 style={{color: 'blue'}}>Ritaban Mukherjee 2022</h2>
      </div>
    </>
  )
}

export default Home