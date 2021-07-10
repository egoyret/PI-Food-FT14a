const { Diet } = require ('../db.js');
const router = require('express').Router();

router.get('/types', function(req,res,next) {
    return Diet.findAll()
     .then(r => res.json(r))
     .catch(error => next(error))
});

router.get('/:id', function(req,res,next) {
    Diet.findByPk(req.params.id)
     .then(r => res.json(r))
     .catch(error => next(error))
});

/* router.get('/', function(req,res,next) {
res.send('Aqui estoy')
});
 */

// Pruba de carga via nombre
router.post('/:name', function(req, res) {
    console.log(req.params.name);
    Diet.create({
        nombre: req.params.name
    }).then(function(d){
        console.log(d.dataValues);
    })
    return res.end()
    
})

// Para precarga de nombres de todas las dietas via Postman
router.post('/', function(req, res) {
    var dietas = req.body
    for(let i=0; i<dietas.length; i++) {
        Diet.create({
            nombre: dietas[i]
        })
    }
    return res.end()
    
})



module.exports = router;
