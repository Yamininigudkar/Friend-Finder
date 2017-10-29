
var friends = require('../data/friends.js');

var apiRoutes = function(app)
{
	// API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  
  // ---------------------------------------------------------------------------

  
  app.post("/api/survey", function(req, res)
  {
		  // req.body hosts is equal to the JSON post sent from the user
		  // This works because of our body-parser middleware
		  
		  var newfriend = req.body;
		  var newfriendScore = newfriend.scores
		  var totaldifference=[];
		  var scoreDiff=0;
		  var diff = 0;
		  var actualDiff=[]

		  console.log(newfriend,"New Friend")
		  //Calculating the difference in score for newFriend and each friend in friends array
		  //-----------------------------------------------------------------------------------
		  for (var i = 0; i < friends.length; i++)
		  {
		  	console.log(friends[i].name,"Log all names from friends Array")
		  	var match = friends[i].scores
		  	
		  	for (var j = 0; j < match.length; j++)
		  	{
		  		
		  		scoreDiff += Math.abs(parseInt(newfriendScore[j]) - parseInt(match[j]));
		  		
		  	}
		//Pushing the difference in score in total difference array	
		//------------------------------------------------------------  
		totaldifference.push(scoreDiff)
		scoreDiff = 0;
			  //totaldifference=0;

			}
			console.log(totaldifference,"totaldifference")

		 //Finding the best match by finding the least difference value
		 //------------------------------------------------------------------  

		 var index = 0;
		 var value = totaldifference[0];

		 for (var i = 0; i < totaldifference.length; i++)
		 {
		 	if(totaldifference[i]<value)
		 	{
		 		value = totaldifference[i];
		 		index =i ;
		 	}
		 }
		 console.log(index, "index")

		 var bestMatch = friends[index];
		 console.log(bestMatch)

		   friends.push(newfriend);//adding the newfriend to friends array
		   res.json(bestMatch)




		   
	   });//.post closing


// API to get all friends data
//======================================================================
  app.get("/all/view", function(req, res)
  {
  	res.json(friends);
  });
}//apiRoutes function

//Exporting apiRoutes function 
//=====================================================================================================================================
module.exports={"apiRoutes":apiRoutes}