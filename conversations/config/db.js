const mongoose = require('mongoose');

mongoose.connect(process.env.MESSAGES_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("DB connection succesfull");
}).catch((err)=>{
    console.log(err.message);
});
