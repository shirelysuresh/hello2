//Create variables here
var foodS,lastFed;
function preload() {
  dogImage= loadImage("dogImg.png");

  dogImage1=loadImage("dogImg1.png")
}


function setup() {
	createCanvas(1500,1200);

  foodobj = new Food()

  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodStock.set(20);
  
  dog = createSprite(750,800,10,20);
  dog.addImage(dogImage);

  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feed)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFood)

}


function draw() {  

  background("green")
 if(foodS!==undefined){
   textSize(20)
   fill("white")
   text("note press UP_ARROW to feed your dog",150,170)
   text("food remaining;"+foodS,150,150)
 }
 if(lastFed>=12){
   text("Last Feed : "+lastFed%12+"PM",340,30);
 }else if(lastFed===0){
  text("Last Feed : 12 AM",340,30);
 }else {
  text("Last Feed : "+lastFed +"AM",340,30);
 }
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage1)
  }
  if(keyDown(DOWN_ARROW)){
    
    dog.addImage(dogImage)
  }
  if (foodS === 0){
    foodS = 20
  }
  dog.display();
  drawSprites();
  //add styles here

}
function feedDog(){
  dog.addImage(dogImage1)
  foodobj.updateFoodStock(foodobj.getFoodStock(-1));
  database.ref("/").update({
    Food:foodobj.getFoodStock(),
    FeedTime:hour()
  })
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}
function readStock(data){
  foodS=data.val();
}
function addFood(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

