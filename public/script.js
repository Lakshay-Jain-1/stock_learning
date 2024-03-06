let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.beginPath();
ctx.font = "15px Arial";

document.getElementById("myRange").addEventListener("input",()=>{
  document.getElementById("slidecontainer").innerHTML=``
  console.log(document.getElementById("myRange").value)
  const element = document.createTextNode(`${document.getElementById("myRange").value}%`)
  const beauty = document.createElement("h3")
  beauty.append(element)
  document.getElementById("slidecontainer").append(beauty)
})

document.getElementById("start").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Sending Money ₹1000", 30, 80);
  ctx.moveTo(50, 100);
  move(60, 100);

  function move(x, y) {
    if (x < 350) {
      setTimeout(function () {
        ctx.lineTo(x, y);
        ctx.stroke();
        x += 10;
        move(x, y);
      }, 100);
    } else {
      setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillText(
          ` repo rate ₹${
            (document.getElementById("myRange").value / 100) * 1000
          }`,
          150,
          50
        );
        ctx.fillText(
          `Sending Money ₹${
            1000 + (document.getElementById("myRange").value / 100) * 1000
          }`,
          150,
          79
        );
        interestrate(350, 100);
      }, 100);
    }
  }

  function interestrate(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.stroke();
    if (x > 50) {
      setTimeout(function () {
        ctx.lineTo(x-10, y);
        ctx.stroke();
        x -= 10;
        interestrate(x, y);
      }, 100);
    } else {
      setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 100);
    }
  }
});

document.getElementById("decrease").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("namechange").innerText = "Reverse Repo Rate";
 
  ctx.fillText(`Supplying Money ₹1000`, 125, 79);
  interestrate(350, 100);
});

function interestrate(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.stroke();
  if (x > 50) {
    setTimeout(function () {
      ctx.lineTo(x - 10, y);
      ctx.stroke();
      x -= 10;
      interestrate(x, y);
    }, 100);
  } else {
    setTimeout(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.fillText(
        `Sending Money ₹${
          1000 + (document.getElementById("myRange").value / 100) * 1000
        }`,
        30,
        80
      );
      ctx.beginPath();
      ctx.moveTo(60, 100);
      move();
    }, 100);
  }
}

var   x=60
function move() {
  
  
 
 
 
  if (x < 360) {
    
    setTimeout(function () {
      console.log(1)
      ctx.lineTo(x, 100);
      ctx.stroke();
      x += 10;
      move();
    }, 100);
  }else{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x=60;
  }
}

  