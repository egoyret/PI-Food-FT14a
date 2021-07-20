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
    if (name) {
      try {
        let response = [];
        const resAxios = await axios.get(spoonacularURL + 'complexSearch?query=' + name + '&number=100' + '&addRecipeInformation=true' + '&apiKey=' + API_KEY );
        const { number, results} = resAxios.data ;
         
         if (results.length > 0) {
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
        
        recPropias.forEach(e => {
        let objprop = {nombre: e.nombre, imagen: e.imagen, idApi: e.id, fuente: 'Propia', puntuacion: e.puntuacion, dietas: e.diets.map(d => d.id  )}
        
        response.push(objprop);
        })
        
        response.length > 0 ?  res.json(response)    : res.send('No vino nada');
        
      }
      catch (error) {next(error)};
    } 
    else 
    {
     // Si no viene parametro de serach le mando todas las recetas propias 
     const recPropias = await Recipe.findAll({include: Diet});
     
     console.log('RecPropias: ', recPropias);
     const response = [];
     recPropias.forEach(e => {
      let objprop = {nombre: e.nombre, imagen: e.imagen, idApi: e.id, fuente: 'Propia', puntuacion: e.puntuacion, dietas: e.diets.map(d => d.nombre  ) }
      response.push(objprop);
      })
     return res.json(response);
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
        tipo_dieta : diets,
        tipo_plato: dishTypes,
        resumen: summary,
        puntuacion: spoonacularScore,
        nivel_salud: healthScore,
        paso_a_paso: instructions
       }
       res.status(200).json(obj);
      }
      else {
        const receta =  await Recipe.findByPk(idReceta, {include: Diet})
        console.log('receta id: ', receta);
        if (receta) {
         let obj = {
         idApi: receta.id, 
         nombre: receta.nombre,
         imagen: receta.imagen,
         tipo_dieta: receta.diets.map(d => d.nombre), 
         resumen: receta.resumen,
         puntuacion: receta.puntuacion,
         nivel_salud: receta.nivel,
         paso_a_paso: receta.instrucciones
         }
         res.json(obj)
        }
        else { res.status(400)}
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
    imagen: "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
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
