objects = [];
status = "";
function preload() {
    song = loadSound("ringing_old_phone.mp3");
}
function draw(){
image(video, 0, 0, 800, 600);
if(status != ""){
    objectDetction.detect(video, gotResults);
    for(i = 0; i<objects.length; i++){
        document.getElementById("result").innerHTML = "Objects Detected";
        document.getElementById("results").innerHTML = objects.length;

        fill("red");
        percentage = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == "person"){
        document.getElementById("result").innerHTML = "Baby found";
        song.stop();
    }
    else{
        document.getElementById("result").innerHTML = "Baby not found";
        song.play();
    }
}
}
}
function setup(){
    canvas = createCanvas(800,600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start() {
    objectDetction = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects = results;
}
}