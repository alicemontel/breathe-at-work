 $(document).ready(function(){
    $('.modal').modal();
	$('.collapsible').collapsible();
	$('.dropdown-trigger').dropdown();
	$('.dropdown-content').on('onclick', function(event) {
		event.stopPropagation();
		});	
  });

$(document).on('click', '.dayTileOpened', function(e){
	var day = e.target.innerHTML;
	showDay(day);
});

$(document).on('click', '.modalHistory', function(e){
	var day = e.target.id;
	showDay(day);
});

function getBforeXmas(){
	today=new Date();
	var cmas=new Date(today.getFullYear(), 11, 25);
	var content = "";
	if (today.getMonth()==11 && today.getDate()>25) {
		cmas.setFullYear(cmas.getFullYear()+1); 
	}
	if(today.getMonth()==11 && today.getDate()==25) {
		content = "Joyeux Noël !";
	} else if (today.getMonth()==11 && today.getDate() ==24){
		content = "Passez un bon réveillon !";
	} else {
		var one_day=1000*60*60*24;
		content = "Il reste "+Math.ceil((cmas.getTime()-today.getTime())/(one_day))+" jours avant Noël !"; 
	}
	return content ; 
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.7);
}

function fillCalendar(){
	today=new Date();
	todayDay = today.getDate();
	todayMonth = today.getMonth();
	var xmas = new Date(2020, 11, 25);
	let arr = Array.from({length: 24}, (_, i) => i + 1);
	shuffle(arr);
	var calendarContent ="";
	for(i = 0; i < 4; i++){
      	calendarContent+="<tr>";
		for(j = 0; j < 6; j++){
      		var day = arr[j+i*6];        	
			//if( todayMonth == 11 && day<=todayDay || today >= xmas){
			if(day<=todayDay){
				calendarContent += "<td class=\"td\"><a class=\"dayTileOpened modal-trigger\" href=\"#";
				calendarContent += "modal1";
			} else {
				calendarContent += "<td class=\"td\"><a class=\"dayTileClosed modal-trigger\" href=\"#";
				calendarContent += "modalClosed";
			}	
			calendarContent += "\">";
			calendarContent += day;
			calendarContent += "</a></td>";
      	}
      	calendarContent+="</tr>";
    }
	return calendarContent;
}

function fillHistory(){
	var historyContent = "<ul class=\"collapsible\">";
	var today = new Date();
	todayDay = today.getDate();
	var index = 0;
	var xmas = new Date(2020, 11, 25);
	if (today >= xmas){
		index = 25;
	}
	//if(todayMonth == 11){
	if (todayMonth == 10){
		index = todayDay;	
	}
	for(i=1; i<=index; i++){
		historyContent += "<li><input type=\"button\" id=\""+i+"\" class=\"modalHistory modal-trigger\" href=\"#modal1\" value='";
		var title = getTitle(i.toString());
		historyContent += title;
		historyContent += "\'/></li>";
	}
	return historyContent+"</ul>" ; 
}