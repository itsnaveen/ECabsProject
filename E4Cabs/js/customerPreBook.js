//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//back to home
function backtoCustomerhome()
{
     window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//redirect to driver next to customer page
function availabledriver()
{
    window.location='driverNextToCustomers.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//My Profile Button
 function myProfile()
{
   window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function logout(){
    navigator.notification.confirm(
    "Do you want to logout?",
    onLogoutCallback,
    "Confirm",
    "No, Yes"
    );
}

function onLogoutCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
        $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: {},
         }); 
        $.cookie("remember", false);
        window.location = "index.html";
    }
}

function cabNow()
{   
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function feedBack()
{
        window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
       window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

function preCab()
{
       window.location='customerPreBook.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}