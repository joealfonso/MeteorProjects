// Transmit a selection of data into the ether
  Meteor.publish('thePlayers', function(){

    // Get the ID of the current user
    var currentUserId = this.userId;

    // Return players "owned" by the current user
    return PlayersList.find({createdBy: currentUserId})
});

// Methods execute on the server after being triggered from the client
Meteor.methods({
  'insertPlayerData': function(playerNameVar) {
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerNameVar,
      score: 0,
      createdBy: currentUserId
    });
  },
  'removePlayerData': function(selectedPlayer) {
    var currentUserId = Meteor.userId();
    PlayersList.remove({
      _id: selectedPlayer,
      createdBy: currentUserId
    });
  },
  'modifyPlayerScore': function(selectedPlayer, scoreValue) {
    var currentUserId = Meteor.userId();
    PlayersList.update({
      _id: selectedPlayer,
      createdBy: currentUserId
    }, {
      $inc: {
        score: scoreValue
      }
    });
  }
});
