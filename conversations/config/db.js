const mongoose = require('mongoose');

mongoose.connect(process.env.CONVERSATIONS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("DB connection succesfull");
}).catch((err)=>{
    console.log(err.message);
});
