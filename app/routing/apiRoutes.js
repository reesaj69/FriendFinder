// Dependencies
// =======================================================================================
var friends = require('../data/friends.js');

// Export the function
module.exports = function(app) {
//========================================================================================

    // Sets the get for the api/friends route
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

//========================================================================================

    // Sets the post for the api/friends route
    app.post('/api/friends', function(req, res) {
        // Set variables only needed for the post
        var diff = 40;
        var matchName = '';
        var matchPhoto = '';
    //====================================================================================

        // The forEach loop function loops through the data in friends.js to find a match
        friends.forEach(function(friend) {
            // Variables for comparing matches
            var differenceArray = [];
            var totalDifference = 40;
    //=====================================================================================
            // Function is used to assist in adding the values in the Array
            function add(total, num) {
                return total + num;
            }

            // Create a loop that loops through each item of the scores arrays from both the 
            //stored data and the new user, and then substracts the absolutes, and then pushes 
            //the new value to the differenceArray


            for (var i = 0; i < friend.scores.length; i++) {
                differenceArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // Reduce the differenceArray into a single value in a variable
            totalDifference = differenceArray.reduce(add, 0);


            // If the above value is smaller than the previous difference
            if (totalDifference < diff) {

            // Set it to the previous difference
                diff = totalDifference;

            // Use the variables to set the appropriate friend match
                matchName = friend.name;
                matchPhoto = friend.photo;
            }
        });

    //=====================================================================================
    //The closest match will be the user with the least amount of difference and that data will 
    //be sent as a json object back to the client

        res.json({
            name: matchName,
            photo: matchPhoto
        });

    // Add the new user's sent data object to friends.js

        friends.push(req.body);
    });
};

//Programs runs okay but the images need to be resize 