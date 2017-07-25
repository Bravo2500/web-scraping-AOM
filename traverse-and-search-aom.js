var console = (Components.utils.import("resource://gre/modules/devtools/Console.jsm", {})).console; 
console.log("START RUN");
var searchWord = "platform";
//var resultPerPage = 125, totalResults = 1870 - 250;
var hits = 0;
var iim,title, abstract, link;
//for(var page = 0; page < Math.ceil(totalResults/resultPerPage); page++){
	//SWEEP current page 
	/*var currentPageResults = resultPerPage;
	if(page == Math.ceil(totalResults/resultPerPage) - 1){
		console.log("reached last page");
		currentPageResults = totalResults % resultPerPage;
	}*/
	// console.log("results in this page: " + currentPageResults);
	//for(var loop = 1; loop <= currentPageResults; loop++){
	for(var loop = 1; loop <= 39; loop++){
		iim = "CODE:\n";
		iim+="TAB T=1\n";
		iim+="TAG POS=" + loop + " TYPE=A ATTR=TXT:Abstract EXTRACT=HREF\n";
		iim+="TAB OPEN\n";
		iim+="TAB T=2\n";
		iimPlay(iim);
		link = iimGetExtract();
		var successful = -1;
		while(successful < 1){
			iim = "CODE:\n";
			iim+="URL GOTO="+link+"\n";
			successful =  iimPlay(iim);
		}
		iim = "CODE:\n";
		iim+="TAG POS=1 TYPE=H1 ATTR=ID:article-title-1 EXTRACT=TXT\n";
		iimPlay(iim);
		title = iimGetExtract().toLowerCase();
		if(title.includes(searchWord)){
			console.log(title + "\n" + link);	
			hits++;
		} else {
			iim="CODE:\n TAG POS=1 TYPE=P ATTR=ID:p-1 EXTRACT=TXT\n";
			iimPlay(iim);
			abstract = iimGetExtract().toLowerCase();
			if(abstract.includes(searchWord)){
				hits++;
				console.log(title + "\n" + link);	
			}
		}
		console.log("'" + searchWord + "' in " + hits + " out of " + loop);
		//iim="CODE:\n WAIT SECONDS=1\n";
		iim+="TAB CLOSE\n";
		iimPlay(iim);
	}
	//console.log("end of page " + page + ".  keyword '" + searchWord + "' appeared in " + hits + " cases");
	/*if(page < Math.ceil(totalResults/resultPerPage) - 1){ // If not last page --> click on Next...
		iim = "CODE:\nTAG POS=1 TYPE=A ATTR=CLASS:next-results-link EXTRACT=HREF\n";
		iim+="TAB T=1\n";
		iimPlay(iim);
		console.log("going to next page...");
		var link = iimGetExtract();
		var succ = - 1;
		while(succ < 1){
			iim = "CODE:\n";
			iim+="URL GOTO=" + link + "\n";
			succ = iimPlay(iim);
		}
	}*/
//}
console.log("end of search. keyword '" + searchWord + "' appeared in " + hits + " cases");
alert("keyword '" + searchWord + "' appeared in " + hits + " cases");