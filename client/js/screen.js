   // Go to https://dashboard.tokbox.com/ to get your OpenTok API Key and to generate
    // a test session ID and token:
   var apiKey,
    sessionId,
	opentok,
	session, 
	ffWhitelistVersion='52',
	extensionId='ajhifddimkapgcifgcodmmfdlknahffk',
    token;

$(document).ready(function() {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  $.get('https://localhost:8443/DemoTokbox/DemoServletTokBok', function(res) {
  
    apiKey = res.API_KEY || res.apiKey;
    sessionId = res.sessionId;
    token = res.token ;           //token;
    opentok=res.opentok;
    console.log("your apiKey : "+apiKey);
    console.log("Your sessionId : "+sessionId);
    console.log("your token : "+token);
    console.log("your token : "+opentok);
    initializeSession();
  });

  
  function initializeSession() {
  session = OT.initSession(apiKey, sessionId);
  
  
   session.connect(token, function(error) {
      if (error) {
        alert('Error connecting to session: ' + error.message);
        return;
      }
      // publish a stream using the camera and microphone:
      var publisher = OT.initPublisher('camera-publisher');
      session.publish(publisher);
      document.getElementById('shareBtn').disabled = false;
    });
	
	 session.on('streamCreated', function(event) {
      if (event.stream.videoType === 'screen') {
        // This is a screen-sharing stream published by another client
      
	  var subOptions = {
          width: event.stream.videoDimensions.width / 2,
          height: event.stream.videoDimensions.height / 2
        };
 

 session.subscribe(event.stream, 'screen-subscriber', subOptions);
      } else {
        // This is a stream published by another client using the camera and microphone
        session.subscribe(event.stream, 'camera-subscriber');
      }
    });
	
  }
  });
  
    OT.registerScreenSharingExtension('chrome', extensionId, 2);
  
  function screenshare() {
      OT.checkScreenSharingCapability(function(response) {
        console.info(response);
        if (!response.supported || response.extensionRegistered === false) {
          alert('This browser does not support screen sharing.');
        } else if (response.extensionInstalled === false
            && (response.extensionRequired || !ffWhitelistVersion)) {
          alert('Please install the screen-sharing extension and load this page over HTTPS.');
        } else if (ffWhitelistVersion && navigator.userAgent.match(/Firefox/)
          && navigator.userAgent.match(/Firefox\/(\d+)/)[1] < ffWhitelistVersion) {
            alert('For screen sharing, please update your version of Firefox to '
              + ffWhitelistVersion + '.');
        } else {
          // Screen sharing is available. Publish the screen.
          // Create an element, but do not display it in the HTML DOM:
          var screenContainerElement = document.createElement('div');
          var screenSharingPublisher = OT.initPublisher(
            screenContainerElement,
            { videoSource : 'screen' },
            function(error) {
              if (error) {
                alert('Something went wrong: ' + error.message);
              } else {
                session.publish(
                  screenSharingPublisher,
                  function(error) {
                    if (error) {
                      alert('Something went wrong: ' + error.message);
                    }
                  });
              }
            });
          }
        });
    



   

   }
   
  