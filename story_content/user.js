window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  var player = GetPlayer();

// Retrieve input values from Storyline variables
var DE = parseFloat(player.GetVar("DE")); // Environmental concentration (D(E))
var VI = parseFloat(player.GetVar("VI")); // Volume of the site of interest (V(I))
var v = parseFloat(player.GetVar("v")); // Flow rate (v)
var t = parseFloat(player.GetVar("t")); // Sampling time (t)
var DS = parseFloat(player.GetVar("DS")); // Final sample density (D(S))

// Calculate the sample volume V(S)
var VS = v * t;

// Calculate the initial concentration D(I) using the provided equation
var DI = DE - ((VS * (DS - DE))/(VI * (Math.exp(-VS / VI) - 1)));

// Round the DI value and remove decimals
var roundedDI = Math.round(DI);

// Function to format the number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if DI is greater than DE to validate the result
if (DI <= DE) {
    // Set ErrorMessage to true if error condition is met
    player.SetVar("ErrorMessage", true);
    player.SetVar("FormattedDI", "Error in Calculation");
} else {
    // Format the rounded DI with commas and set it back to Storyline variable
    var formattedDI = numberWithCommas(roundedDI); // Format with commas
    player.SetVar("FormattedDI", formattedDI); // Store in FormattedDI variable
    player.SetVar("ErrorMessage", false);
}
}

};
