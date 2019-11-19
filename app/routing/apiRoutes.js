var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/data/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/data/friends", function(req, res) {
    console.log(req.body.scores);

    //Grabs all data to be used from arrays/objects
    var user = req.body;

    //iterates through user's input and comapares: 
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var friendIndex = 0;
    var difference = 40;

    //a for loop that iterates through the friends array, then sets the difference value from the user's inputs and the friends' values
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
          //use Math function to subtract the difference
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        //add this difference to the total 
        totalDifference += difference;
      }

      // set the new difference to the total difference if it is lower than the difference obtained from the logic above 
      if(totalDifference < difference) {
        friendIndex = i;
        difference = totalDifference;
      }
    }

    // add new user to friends array and send back
    friends.push(user);
    res.json(friends[friendIndex]);
  });
};