       var correct_choice=0;//counts correct moves
       var wrong_choice=0;//counts the wrong moves
       var imgarray=new Array();//stores images
       var j;

       var p=18;
       var n=9;
       var h=0;
       var m=0;
       var s=0;
       var timeout;
       for(var i=0; i<=8; i++){
        j=i+1;
        imgarray[i]="MJs"+j+".png";
        imgarray[n]="MJt"+j+".png";
        imgarray[p]="MJw"+j+".png";
        n++;
        p++;
      }

      
       //returns an array to the function generate table
       //and it contains image sources for values
       function filltable(i,j){
    
        var array=new Array(i*j);
        var newarray=symbols();
        var n=0;
        var x=0;
        while(n<=(i*j)-1){
          for(var k=1;k<=2;k++){
            array[n]=newarray[x];
            n++;
           
          }
           x++;
          if(x==((newarray.length)-1))
           x=0;
        }
       
        array=shuffle(array);
 
        return array;
      }

      //shuffles an array
     function shuffle(o){ 
       for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
       return o;
      }






   

     //it chooses which symbols are gonna be used according to the number given    
     // and stores to an array which it returns 
     function symbols(){
          var number;
          var numbers=new Array();
          var symbols_array=new Array();
          var symbolElem=document.getElementsByName("symbols");
          var number_of_symbols=symbolElem[0].value;
          for(var i=0;i<=number_of_symbols;i++){
           number=Math.floor(Math.random()*27);
           numbers.push(number);
           for(var p=0;p<=numbers.length-1;p++){
              if(numbers[p]==number)
                number=Math.floor(Math.random()*27);
           }
           symbols_array[i]=imgarray[number];
          } 
          return symbols_array;
     } 
     //removes cell and so on the anchor and the imgage
     function removefathers(element){
        var parent=element.parentNode;
        parent=parent.parentNode;
        parent.remove();
     }
         
 
  //ads event to the tiles that didnt havefrom the begining as the game goes on
  function findnextimg(el){
    var a=el.parentNode;
    var td=a.parentNode;
    var nsibling=td.nextSibling;
    var psibling=td.previousSibling;
    if(nsibling!=null ){
     var newa=nsibling.firstChild;
   
		  var newimg=newa.firstChild;
		  if(!(typeof newimg.onclick=="function")){
			newimg.addEventListener('click',opacity);
			newimg.addEventListener('click',clickable);
		  }
	 
     }
    else if (psibling != null){
	 
      var newa=psibling.firstChild;
	  
       var newimg=newa.firstChild;
		   if(!(typeof newimg.onclick=="function")){
			 newimg.addEventListener('click',opacity);
			 newimg.addEventListener('click',clickable);
		   }
	  
      }
  }

 var clickarray=new Array();
 var previous_item=new Array();
 //the function acts when an image is clicked 
 //when another image is clicked again it compares the value of the old an the new one
 //image accordingly to the result it removes or not the 
 function clickable(){
	console.log("Clickable");
    var parent=this.parentNode;

         if(clickarray.length==0){
              clickarray[0]=this.src;
              previous_item[0]=this;
              
           }
           else if(clickarray.length==1){
             if(this.src!=clickarray[0]){
                this.className="img";
                wrong_choice++;
                score();
             }
              
             else if(parent!=previous_item[0].parentNode){
               findnextimg(this);
               findnextimg(previous_item[0]);
               removefathers(this);
               removefathers(previous_item[0]);
               clickarray.pop();
               previous_item.pop();
               correct_choice++;
               score();
            }
            else{
               clickarray.pop();
               previous_item.pop();
            }
         
          }
      checktable();
 }
 //check if the table is ready to be removed(there ara no images left in the cells)
 function checktable(){ 
     var td;
     var body=document.getElementById("ha");
     var table=body.childNodes[0];
     //if(table.hasChildNodes()){
       var tr=table.firstChild;

      for(var i=1;i<=(table.childNodes.length);i++){
         if(tr.hasChildNodes())
           return;
         
         else
          tr=tr.nextSibling;
       }
        
        
         body.removeChild(body.childNodes[0]);
         alert("correct moves:"+correct_choice+"\n"+"wrong moves:"+wrong_choice+"\n"+"Total time:"+h+":"+m+":"+s);
         wrong_choice=0;
         correct_choice=0;
         score();
         clearTimeout(timeout);
         
     //}
     /*else
       body.removeChild(body.childNodes[0]);*/
 }
 //when i click a tile it chenges its color(opacity)
 function  opacity(){
	console.log("Opacity");
      if(this.className!=" image")
          this.className=" image"; 
         else{
          this.className="img";
         }
 }
     //the function that generates the table and appends it to the body
     function generate_table() {
        clearTimeout(timeout);
       
        h=0;
        m=0;
        s=0;
        startTime();
        wrong_choice=0;
        correct_choice=0;
       // get the reference for the body
       var body = document.getElementById("ha");
       if(body.childNodes.length==1){
             body.removeChild(body.childNodes[0]);
       }		


 
       // creates a <table> element 
       var tbl     = document.createElement("table");
    
       //get number of cells and rows from user selection
       var selectElem=document.getElementsByName("selection");
       var rows=selectElem[1].value;
       var cells=selectElem[0].value;

       var array=filltable(rows,cells);
       
       // creating all cells
       for (var i=0; i <rows; i++) {
       // creates a table row
       var row = document.createElement("tr");

       for (var j=0;j <cells; j++) {
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var anchor=document.createElement("a");
        
        var img = document.createElement("img");
       
        img.src=array[(i*cells)+j];
        if(j==0 || j==cells-1){
          img.addEventListener('click',opacity);
          img.addEventListener('click',clickable);
          
        }
           
        anchor.appendChild(img);
        anchor.href="#";
        cell.appendChild(anchor);
       
        row.appendChild(cell);
     }
 
      // add the row to the end of the table body
      tbl.appendChild(row);
     }
 
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
    
   }
  //places score in the page  
  function score(){
       var el=document.getElementById("score");
       if (el.childNodes.length > 1) {
	 for(var i = 3; i>0; i--) {
	    el.removeChild(el.childNodes[i]);
                                                
	  }
      }
       var text=document.createTextNode("correct efforts:"+correct_choice);
       var text2=document.createTextNode("mistakes:"+wrong_choice);
       el.appendChild(text);
       el.appendChild(document.createElement("br"));
       el.appendChild(text2);
  }
 
  //the function begins the presanation of the time 
  function startTime() {
    
    s=checkTime(s); 
    m=checkTime(m);
    document.getElementById('time').innerHTML = h+":"+m+":"+s;
    timeout = setTimeout(function(){startTime()},1000);
    s++;
    if(s==60){
      s=0;
      m++;
    }
    if(m==60){
      m=0;
      h++;
   }
   m++;
   m--;
  }
  //formats the presantion of time
 function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
 }


