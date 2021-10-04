//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Importo la conexión con express
const server = require('./src/app.js');

// Importo la conexión a la base de datos
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
// Inicializo el modelo de base de datos, haciendo los cambios que correspondan en la tablas que ya existan o creando tablas nuevas (force: true).
// Luego me pongo a escuchar el puerto 3001
const update = false ;
conn.sync({ force: update }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    if (update)
    {
      const dietas = ["Gluten Free","Ketogenic", "Vegetarian", "Lacto-Vegetarina", "lacto ovo vegetarian", "Ovo-Vegetarian","Vegan","Pescatarian","Paleo","Primal","Whole30", "dairy free"];
      dietas.forEach(async (element) => await Diet.create({nombre: element}));
      console.log('Tipos de dieta pre-cargadas')
    }

  });
});


// Probando
// server.listen(3001, () => {console.log('listening at 3001')});
