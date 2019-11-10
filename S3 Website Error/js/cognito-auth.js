/*global RadishLogicApp _config AmazonCognitoIdentity AWSCognito*/

var RadishLogicApp = window.RadishLogicApp || {};

(function scopeWrapper($) {

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId,
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    RadishLogicApp.login = function () {
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        var authenticationData = {
            Username: username,
            Password: password,
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        var userData = {
            Username: username,
            Pool: userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                window.location = '/signedin.html';
            },
            onFailure: function(err) {
                console.log(err);
                alert(err.message || JSON.stringify(err));
            }
        });
    }

}(jQuery));
