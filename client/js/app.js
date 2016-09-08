var apiKey,
    sessionId,
	opentok,
    token;

$(document).ready(function() {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  $.get('http://55.55.55.185:8086/DemoTokbox/DemoServletTokBok', function(res) {
  
    apiKey = res.API_KEY || res.apiKey;
    sessionId = res.sessionId;
    token = res.token ||  res.tokenOption_PUBLISHER;             //token;
    opentok=res.opentok;
    console.log("your apiKey : "+apiKey);
    console.log("Your sessionId : "+sessionId);
    console.log("your token : "+token);
    console.log("your token : "+opentok);

	

    initializeSession();
  });
});

function initializeSession() {
 var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    });

    console.log("subscriber......is calling");
  });

  session.on('sessionDisconnected', function(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (!error) {
      var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      });

      session.publish(publisher);
      console.log("Punblisher......is calling");
    }

	else {
      console.log('There was an error connecting to the session: ', error.code, error.message);
    }
  });
  

}
