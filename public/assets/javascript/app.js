var emailHeader = "<h1>Email</h>";
var emailInput = "<input>";
var passwordHeader = "<h1>Password</h>";
var passwordInput = "<input>";

$( "#LPbut" ).click(function() {
  $("#loginPanelRowTwoColOne" ).empty();
  $("#loginPanelRowTwoColTwo" ).empty();
  $("#loginPanelRowTwoColOne").append(emailHeader, emailInput);
  $("#loginPanelRowTwoColTwo").append(passwordHeader, passwordInput);
  $("#loginPanelRowTwoColOne").attr("id", "loginPanelEmailLogin");
  $("#loginPanelRowTwoColTwo").attr("id", "loginPanelEmailPassword");
});