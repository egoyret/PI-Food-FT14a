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
      const resAxios = await axios.get(spoonacularURL + 'complexSearch?query=' + name + '&number=2'+ '&apiKey=' + API_KEY );
      const { number, results} = resAxios.data ;
      //console.log('number: ', number);
     if (results.length > 0) {
      let response = [];
      let obj = {};
      for (let i = 0; i< results.length ; i++ ) {
        const resAxios = await axios.get(spoonacularURL + results[i].id + '/information?includeNutrition=false'+ '&apiKey=' + API_KEY );  
        obj = {nombre: results[i].title, imagen: results[i].image, idApi: results[i].id, dietas: resAxios.data.diets }
        response.push(obj);
        }
      // ahora busco en la base de datos por recetas propias  
      // ****** Falta arreglar para que no importe mayusculas/minuscula en la comparacion  *****
      const recPropias = await Recipe.findAll({where: {nombre: {[Op.substring]: name}}, include: Diet});  
      // console.log('Recetas propias filtarads: ' ,recPropias);
      recPropias.forEach(e => {
        let objprop = {nombre: e.nombre, imagen: "", idApi: e.id, dietas: e.diets.map(d => d.nombre  )}
        response.push(objprop);
      })

      res.json(response);
     }
      else 
      {
       res.send('No vino nada');
      }
    }
    catch (error) {next(error)};
  } 
  else {
  const recetas = await Recipe.findAll({include: Diet});
  //console.log('Recetas: ', recetas);
  return res.json(recetas);
  }
})

// Busca una receta en partucular segun su id
router.get('/:idReceta', async function(req, res, next) {
    const idReceta = req.params.idReceta;
    if (idReceta > 100) {
    try {
     const resAxios = await axios.get(spoonacularURL + idReceta + '/information?includeNutrition=false'+ '&apiKey=' + API_KEY );     
     const {title, image, summary, spoonacularScore, healthScore, instructions, diets, dishTypes } = resAxios.data;
     let obj = {
        nombre: title,
        imagen: image,
        tipo_dieta : diets.join(),
        tipo_plato: dishTypes.join(),
        resumen: summary,
        puntuacion: spoonacularScore,
        nivel_salud: healthScore,
        paso_a_paso: instructions
     }
     res.status(200).json(obj);
    }
    catch (error) {next(error)};
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

})

// Carga recetas propias en la base de datos
router.post('/', async function(req, res, next){
 const {nombre, resumen, puntuacion, nivel, instrucciones, dietas} = req.body ;
 try {
 const recipe = await Recipe.create({
    nombre: nombre,
    resumen: resumen,
    puntuacion: puntuacion,
    nivel: nivel,
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

  return res.status(200).send("Cargo bien")
}
catch (error) {next(error)}; 

})



module.exports = router;
