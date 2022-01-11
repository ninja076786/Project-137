status="";
objects=[]




function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function modelLoaded(){
    console.log("OKOKOKOKOOKOKOKOKOKOKOKOKOKOKOKOKOKKKOOKOKOKOKOKOKOKOKOKKOOKKKOOK MOdel Loaded!");
    status=true;
}
function gotResult(error, results){
    if(error){
        console.log(error);        
    }
    console.log(results);
    objects=results;
}



function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected!!";
            fill("#FFFFFF");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#A80B44");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("num_of_obj").innerHTML=object_name+" Found!!";
            
        }
else{
    document.getElementById("num_of_obj").innerHTML=object_name+" Not Found...";
}
        }
    }
}




function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...";
    object_name=document.getElementById("name").value
}







