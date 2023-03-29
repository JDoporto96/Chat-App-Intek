const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.PROFILES_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    logger.info("DB connection succesfull");
}).catch((err)=>{
   logger.error(err.message);
});
