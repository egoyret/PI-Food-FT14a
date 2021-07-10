const { Recipe, Diet } = require ('../db.js');
const { Op } = require("sequelize");
const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');

const { API_KEY } = process.env;

const spoonacularURL = 'https://api.spoonacular.com/recipes/';


// Endpoint para recetas:
// Sin parametros (query): lista todas las recetas propias
// Con parametro (query name): lista recetas de la API y propias que coincidan con le parametro.
router.get('/', async function(req, res, next) {
    const { name } = req.query ;
    //console.log('name: ',name);
    if (name) {
      try {
        let response = [];
        const resAxios = await axios.get(spoonacularURL + 'complexSearch?query=' + name + '&number=9' + '&addRecipeInformation=true' + '&apiKey=' + API_KEY );
        const { number, results} = resAxios.data ;
         
         if (results.length > 0) {
          // let response = [];
          let obj = {};
          for (let i = 0; i< results.length ; i++ ) {
            //const resAxios = await axios.get(spoonacularURL + results[i].id + '/information?includeNutrition=false'+ '&apiKey=' + API_KEY );  
            obj = {nombre: results[i].title, imagen: results[i].image, idApi: results[i].id, fuente: 'Api', puntuacion: results[i].spoonacularScore,  dietas: results[i].diets }
            response.push(obj);
          }
        } 
        // ahora busco en la base de datos por recetas propias  
        // ****** Falta arreglar para que no importe mayusculas/minuscula en la comparacion  *****
        const recPropias = await Recipe.findAll({where: {nombre: {[Op.substring]: name}}, include: Diet});  
        // console.log('Recetas propias filtarads: ' ,recPropias);
        recPropias.forEach(e => {
        let objprop = {nombre: e.nombre, imagen: "", idApi: e.id, fuente: 'Propia', puntuacion: e.puntuacion, dietas: e.diets.map(d => d.nombre  )}
        response.push(objprop);
        })
        
        response.length > 0 ?  res.json(response)    : res.send('No vino nada');
        
      }
      catch (error) {next(error)};
    } 
    else 
    {
     // Si no viene parametro de serach le mando todas las recetas propias 
     const recetas = await Recipe.findAll({include: Diet});
     //console.log('Recetas: ', recetas);
     return res.json(recetas);
    }
})

// Busca una receta en particular segun su id
router.get('/:idReceta', async function(req, res, next) {
    const idRecetaArray = req.params.idReceta.split('-');
    const idReceta = idRecetaArray[0];
    const fuente = idRecetaArray[1];
    try {
      if (fuente === 'Api') {
      
       const resAxios = await axios.get(spoonacularURL + idReceta + '/information?includeNutrition=false'+ '&apiKey=' + API_KEY );     
       const {id, title, image, summary, spoonacularScore, healthScore, instructions, diets, dishTypes } = resAxios.data;
       let obj = {
        idApi: id,
        nombre: title,
        imagen: image,
        tipo_dieta : diets.join(', '),
        tipo_plato: dishTypes.join(', '),
        resumen: summary,
        puntuacion: spoonacularScore,
        nivel_salud: healthScore,
        paso_a_paso: instructions
       }
       res.status(200).json(obj);
      }
      else {
        const receta =  await Recipe.findByPk(idReceta, {include: Diet})
        let obj = {
        id: receta.id, 
        nonbre: receta.nombre,
        imagen: '',
        tipo_dieta: receta.diets.join(),
        resumen: receta.resumen,
        puntuacion: receta.puntuacion,
        nivel_salud: receta.nivel,
        paso_a_paso: receta.instrucciones
        }
        res.json(obj)
      } 
    }
    catch (error) {next(error)};
})

// Carga recetas propias en la base de datos
router.post('/', async function(req, res, next){
 const {nombre, resumen, puntuacion, nivel, image, instrucciones, dietas} = req.body ;
 try {
 const recipe = await Recipe.create({
    nombre: nombre,
    resumen: resumen,
    puntuacion: puntuacion,
    nivel: nivel,
    imagen: image,
    instrucciones: instrucciones
    
  })

  if (Array.isArray(dietas) && dietas.length > 0) {
  const dietasResult = await Promise.all(
    dietas.map(value => Diet.findByPk(value))
  )
  // En caso que me vengan codigos ivalidos de tipo de dieta (filtro los nulos)
  const dietasResultFiltered = dietasResult.filter(e => e)

  // Actualizo la tabla intermedia d elas foreign keys
  await recipe.setDiets(dietasResultFiltered)
  }

  return res.status(200).send(recipe)
}
catch (error) {next(error)}; 

})



module.exports = router;
