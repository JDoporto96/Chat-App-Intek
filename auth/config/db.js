const mongoose = require('mongoose');

mongoose.connect(process.env.CREDENTIALS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("DB1 connection succesfull");
}).catch((err)=>{
    console.log(err.message);
});
