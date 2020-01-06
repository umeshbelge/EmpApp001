var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var nodemailer = require('nodemailer');

var jwt = require('jsonwebtoken');
var config = require('./config');
var middleware = require('./middleware');

var MongoClient = require('mongodb').MongoClient;

var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

console.log('ala');
var url = "mongodb://localhost:27017";

class HandlerGenerator {
  login (req, res) { console.log('ala re al')
    
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}


let handlers = new HandlerGenerator();



app.post('/login',function(req,res){

	let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = '';
    let mockedPassword = '';
    var allUsers;
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

		if (err) throw err;
		const db=client.db('empmanagement');


		db.collection("userdata").find({}).toArray(function(err, result) {
		    if (err) throw err;
		    
		    allUsers = result;

		    console.log(allUsers);
		    for(index in allUsers)
			{
				if(allUsers[index].username===username && allUsers[index].password===password)
				{
					mockedUsername = allUsers[index].username;
					mockedPassword = allUsers[index].password;
				}
			} 

		    if (username && password) {
		    	console.log('username '+username)
		    	console.log('mockedUsername '+mockedUsername)
		    	console.log('password '+password)
		    	console.log('mockedPassword '+mockedPassword)
		      if (username === mockedUsername && password === mockedPassword) {
		        let token = jwt.sign({username: username},
		          config.secret,
		          { expiresIn: '24h' // expires in 24 hours
		          }
		        );
		        // return the JWT token for the future API calls
		        res.json({
		          success: true,
		          message: 'Authentication successful!',
		          token: token
		        });
		      } else {
		        res.json({
		          status:403,
		          success: false,
		          message: 'Incorrect username or password'
		        });
		      }
		    } else {
		      res.json({
		      	status: 400,
		        success: false,
		        message: 'Authentication failed! Please check the request'
		      });
		    }
		    
		});

	})	

	
})

app.get('/',function(req,res){

	res.send("Welcome to ATMECS...");
})


app.get('/checkemployee/:id',middleware.checkToken,function(req,res){
	console.log('asdasasa')
	console.log('req param '+req.params.id);

	var id=req.params.id;

	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

		if (err) throw err;
		// empmanagement.emprecords

		console.log("Connected successfully to server");
		const db=client.db('empmanagement');
		console.log(id)
		db.collection("emprecords").findOne({"empId":parseInt(id)}, function(err, result) {
		    if (err) throw err;
		    
		    if(result!=null)
		    {	
		    	res.send(result);
		    }
		    else
		    {
		    	res.send({"message":"Employee id is not correct.Please enter correct emp id."})
		    }	
		});

		/*db.collection('empdata').findOne({'empid':parseInt(id)})
		.then(function(doc) {
		        if(!doc)
		            throw new Error('No record found.');
		      console.log(doc);//else case
		});*/
		//client.close();
	});	
})

app.get('/list',middleware.checkToken,function(req,res){
	console.log('in list')
	console.log('req param '+req.params.id);

	var id=req.params.id;

	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

		if (err) throw err;
		// empmanagement.emprecords

		console.log("Connected successfully to server");
		const db=client.db('empmanagement');
		//console.log(id)
		db.collection("emprecords").find({}).toArray(function(err, result) {
		    if (err) throw err;
		    
		    // if(result!=null)
		    // {	
		    	res.send(result);
		    // }
		    // else
		    // {
		    // 	res.send({"message":"Employee id is not correct.Please enter correct emp id."})
		    // }	
		});

		/*db.collection('empdata').findOne({'empid':parseInt(id)})
		.then(function(doc) {
		        if(!doc)
		            throw new Error('No record found.');
		      console.log(doc);//else case
		});*/
		//client.close();
	});	
})

app.post('/insertEmployee',middleware.checkToken,bodyParser.json(),function(req,res){

	
	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

		if (err) throw err;

		//console.log("Connected successfully to server");
		const db=client.db('empmanagement');
		//console.log(req.body)
		db.collection("emprecords").insertOne(req.body, function(err,res){

			if (err) throw err;
		    console.log("1 document inserted");
		    
		})
		client.close();
	});	


});

app.post('/register',bodyParser.json(),function(req,res){

	
	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

		if (err) throw err;

		//console.log("Connected successfully to server");
		const db=client.db('empmanagement');
		//console.log(req.body)
		db.collection("userdata").insertOne(req.body, function(err,res){

			if (err) throw err;
		    console.log("1 document inserted");
		    
		})
		client.close();
	});	


});

app.delete('/delete/:id',middleware.checkToken, function (req, res) {
  
  var id=req.params.id;
  	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

  		if (err) throw err;

		//console.log("Connected successfully to server");
		const db=client.db('empmanagement');
		
		db.collection("emprecords").deleteOne({"empId":parseInt(id)}, function(err,res){

			if (err) throw err;
		    console.log("1 document deleted");
		    
		})
		client.close();
  	})	
})

app.put('/Edit',middleware.checkToken,bodyParser.json(),function(req,res){
	
	//var id=req.params.id;
	//console.log('ala edit')	
	MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,client){

  		if (err) throw err;

		console.log("Connected edit");
		const db=client.db('empmanagement');

		var empid={"empId":req.body.empId}
		var updatedRecords={$set : req.body}
		
		db.collection("emprecords").updateOne(empid,updatedRecords, function(err,res){

			if (err) throw err;
		    console.log("1 document inserted in edit");
		    
		})
		client.close();
  	})	

})


app.get('/sendMail',function(req,res){


		var transporter = nodemailer.createTransport({
		  	host: 'smtp.ethereal.email',
	        port: 587,
	        secure: false,
			  auth: {
			    user: 'umeshbelge@gmail.com',
			    pass: 'Donotask@123'
			  }
		})  

		var mailOptions = {	
		  from: 'umeshbelge@gmail.com',
		  to: 'umesh.belge@atmecs.com',
		  subject: 'Sending Email using Node.js',
		  text: 'That was easy!'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		    res.send(info.response)
		  }
		});



})



app.listen('5050',function(){
	console.log('listening..');
})
