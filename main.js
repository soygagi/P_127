cancion = "";
izquierdaX = 0;
izquierdaY = 0;
derechaX = 0;
derechaY = 0;
scoreizquierda = 0;
scorederecha = 0;
function preload(){
    cancion = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreizquierda = results[0].pose.keypoints[9].score;
        scorederecha = results[0].pose.keypoints[10].score;
        console.log("scoreizquierda = "+scoreizquierda);
       izquierdaX = results[0].pose.leftWrist.x;
       izquierdaY = results[0].pose.leftWrist.y;
       console.log("izquierda x: "+izquierdaX+ "izquierdaY: "+izquierdaY);
       derechaX = results[0].pose.rightWrist.x;
       derechaY = results[0].pose.rightwrist.y;
       console.log("derecha x: "+derechax+ "derechaY: "+derechay);
    }  
}
function modelLoaded(){
     console.log("INICIALIZAR");
}
function draw(){
    image(video, 0, 0, 500,500);
    fill("FF0000");
    stroke("#FF0000");
    circle(derechaX, derechaY,20);
    if(derechaY>0&&derechaY<=100){
        document.getElementById("speed").innerHTML = "Velocidad = 0.5";
        song.rate(0.5);
    }else if(derechaY>100&&derechaY<=200){
        document,getElementById("speed").innerHTML = "Velocidad = 1x";
        song.rate(1);
    }else if(derechaY>200&&derechaY<=300){
        document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
        song.rate(1.5);
    }else if(derechaY>300&&derechaY<=400){
        document.getElementById("speed").innerHTML = "Velocidad =2x";
        song.rate(2);
    }else if(derechaY>400&&derechaY<=500){
        document.getElementById("speed").innerHTML = "Velidad = 2.5x"
        song.rate(2.5);
    }
    if(scoreizquierda > 0.2){
    circle(izquierdaX, izquierdaY,20);
    Numeroizquierday = Number(izquierdaY);
    remover_decimales = floor(Numeroizquierday);
    volumen = remover_decimales/500;
    document.getElementById("volumen").innerHTML = "Volumen: "+volumen;
    cancion.setVolume(volumen);
}    
}   
function play(){
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
}