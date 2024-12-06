const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://svaithi2004:yHc4GWxLSBeuGj-@cluster0.to7xf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
    console.log("mongo db is connected");
})
.catch((error)=>{
    console.log("mongo db is disconnected",error);
})

module.exports = mongoose.connection