export const calculateNutritionalValue = function(userStance, articleStance, articleLength) {
  let stanceNutrition = Math.round(Math.abs(userStance - articleStance) / 2 * 10); 
  let lengthNutrition = Math.round( (articleLength - 5000) / 3000)
  lengthNutrition > 3 ? lengthNutrition = 3 : null;
  return stanceNutrition + lengthNutrition <= 10 ? stanceNutrition + lengthNutrition : 10;
}
