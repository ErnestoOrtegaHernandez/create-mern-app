const app = require('./app')
const port = process.env.PORT || 4000
const mongoose = require("mongoose")
const mongoDbURL = process.env.MONGODBURL || "mongodb://localhost:27017/dbName" //replace dbName with your database name. If it doesn't exist, it will be created


mongoose
	.connect(mongoDbURL, { useNewUrlParser: true })
	.then(() => {
		app.listen(3000, () => {
			console.log(`Listening on port: ${port}`)
		})
	})
  .catch((error)=>{
    console.log('ERROR CONNECTING TO MONGODB')
    console.log('=================================')
    console.log(error)
  })