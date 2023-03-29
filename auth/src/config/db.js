const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.CREDENTIALS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    logger.info("DB1 connection succesfull");
}).catch((err)=>{
    logger.error(err.message);
});
