var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
    window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

$.ajax({
   url:'http://115.115.159.126/ECabs/ECabs4U.asmx/DriverCabLaterBooking',
   type:'post',
   dataType:'json',
   data:"{'relatedId':'"+relatedId+"'}",
   contentType:"application/json; charset=utf-8",
   success: bindGrid,
   error:function (XMLHttpRequest, textStatus, errorThrown) {}
});

function bindGrid(data)
{
    var count = data.d.length;
    if(count > 0)
    {
            var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
            html += '<thead class="thead-grid">';
            html += '<tr>';
            html += '<th>JobNo</th>';
            html += '<th>Fare</th>';
            html += '<th>From</th>';
            html += '<th>To</th>';
            html += '<th>Status</th>';                      
            html += '</tr>';
            html += '</thead>';
            html +='<tbody class="altColor">';  
                 for(var i=0; i<count; i++)
                 {
                    var isCustomerAccepted = data.d[i]["CustomerResponse"];
                    var customerID = data.d[i]["CustomerID"];
                    console.log(customerID);
                    console.log(isCustomerAccepted);
                    if(isCustomerAccepted === true)
                     {
                        html += '<tr>';
                        html += "<td width='25%' height='30px' align='center'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["CustomerID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                        html += "<td width='15%' height='30px' align='center'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                        html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                        html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
                     
                   
                        html += "<td colspan='2'>"
                        +'<input type="button" value="Accept" class="accept-btn" onclick="AcceptJob(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["Fare"]+'\')"/><br/>'
                        +'<input type="button" value="Reject" class="reject-btn" onclick="RejectJob(\''+data.d[i]["CustomerRequestID"]+'\')"/>'
                        +"</td>";
                     
                     //else if(isCustomerAccepted === false)
                     //{
                     //    html += "<td width='10%' height='30px' align='center'>Awaiting customer response</td>";
                     //}
                    
                        html += '</tr>';
                    }                    
                 }
            html +='</tbody>';
            html +='</table>';
            $('#msg').append(html);
     }
     else
     {
         $('#bookingmsg').show();
     }
}

function AcceptJob(jobno, jobfare)
{
    $('#hidJobNo').val(jobno);
    var fare = jobfare;
    if(fare === 15 || fare > 15)
    {
        $('#lblconfirmfare').html('&pound'+jobfare);
        $('#lblconfirmjob').text(jobno);
        $('#popup_box').show();
        $('#divComission').show();
        $('#transparent_div').show();
    }
    else
    {
            var reqID = $('#hidJobNo').val();
            $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },
                complete: function(){
                   $('#imgLoader').hide();
                },
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === "true")
                    {
                       alert('Job booked successfully.');
                       window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
    }
}

function ShowDetailBooking(data, customerid)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDCabLaterBooking";
       $.ajax(url, {
          type:"POST",
          datatype:"json",
          data:"{'customerReqID':'"+data+"', 'customerid':'"+customerid+"', 'relatedId':'"+relatedId+"'}",
          contentType: "application/json; charset=utf-8",
           success: showDetail,
           error: function (XMLHttpRequest, textStatus, errorThrown) 
           {
               
           }
       });
    }

function showDetail(data)
{
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lblDriverName').text(": "+data.d[2]);
    $('#lblStartDate').text(": "+data.d[3]);
    $('#lblStartTime').text(": "+data.d[4]);
    $('#lblSearchTime').text(": "+data.d[5]);
    $('#lblBidTime').text(": "+data.d[6]);
    $('#lblDSR').text(": "+data.d[7]);  
    $('#popup_box').show();
    $('#divCabLaterBooking').show();
    $('#transparent_div').show();
    
}

function Cancel()
{
    $('#popup_box').hide();
    $('#divCabLaterBooking').hide();
    $('#transparent_div').hide();
}
function RejectJob(data)
{
    var isTrue = confirm("Confirm you want to reject this job offer?");
    if(isTrue)
    {
            var rid = data;   
            var status = "Reject";
            $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },
                complete: function(){
                   $('#imgLoader').hide();
                },
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                     alert("Job rejected successfully.");
                     window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
    }
    else
    {
        return false;
    }
            
}

function RejectComission()
{
     $('#divDeal').hide();
     $('#popup_box').hide();
     $('#transparent_div').hide();
}

function Confirmcomission()
{
            var reqID = $('#hidJobNo').val();
            $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },
                complete: function(){
                   $('#imgLoader').hide();
                },
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === "true")
                    {
                       alert('Job booked successfully.');
                       window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
     window.location.href = "https://sandbox.gocardless.com/pay/YH0MFHY7"; //for commission 1.2pond
     $('#divDeal').hide();
     $('#popup_box').hide();
    $('#transparent_div').hide();
}

function HomePage(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function MyProfilePage(){
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
