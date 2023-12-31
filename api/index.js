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
const server = require('./src/app.js');
const { dataApi } = require('./src/controllers/controller.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ alter: true })
    .then(async () => {
        try {
            await dataApi();
            console.log('Base de datos cargada correctamente');
            server.listen(process.env.PORT, () => {
                console.log('Server up on port', process.env.PORT); // eslint-disable-line no-console
            });
        } catch (error) {
            console.error('Error al sincronizar los modelos:', error);
        }
    })

