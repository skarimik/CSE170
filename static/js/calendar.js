var clientId = '353317309491-3ed3on54tpim02gc5sg7tt8njnfi24gs.apps.googleusercontent.com';
var apiKey = 'AIzaSyAfF8MHYCh7ZVo189HR9MyQ6NOjK4J88Ck';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}
function makeApiCall() {
     var event = {
"summary":"Here",
"description":"Now",
"start":
{
"dateTime":"2016-04-21T12:00:00.000-07:00",
"timeZone":"America/Los_Angeles"
}
,"end":
{
"dateTime":"2016-04-21T12:30:00.000-07:00",
"timeZone":"America/Los_Angeles"
}
};
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
          
    request.execute(function(event) {
      appendPre('Event created: '+event.htmlLink);
    });
  });
}