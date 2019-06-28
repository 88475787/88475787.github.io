var x = 100;  //jogador(nave)
var y = 360;

var e1x = 500;   //inimigo 1(ellipse azul)
var e1y = 360;

var e2x = [];  //inimigo 2(ellipse amarela)
var e2y = [];

var vidas = 3;
var pontos = 0;
var nivel = 1;

var pulo = false;  //variáveis do pulo
var yp = 0;
var contFrames = 0;

var colisao = false;

var edx = 0;   //ellipse do disparo
var edy = 0; 
var estadodisparo = false; 

var qtdBolinha = 2;
var barreiradepontos = 20;

var tela = 1;

var nave;  //variáveis das imagens
var universo;
var universo2; 

function preload()
{
  nave=loadImage('nave.png')
  universo=loadImage('pngtree-cartoon-cute-universe-planet-background-design-backgroundplanetstarry-skywhite-cloudsadvertising-image_59960 (1).jpg')
  universo2=loadImage('c0968b40c058b34c3aa334fbd2710c54.jpg')
  }


function setup()  
{      //inicialização
createCanvas(400, 400)
frameRate(30)
for( var i=0 ;i<qtdBolinha; i++)
 {
 e2x[i]=random(0,400)
 e2y[i]=0
  }
}
function draw() 
{
if ( tela == 1)
{
  textSize(24);   
  fill(255, 204, 0);
  image(universo,2,2)
  text("Combate espacial" ,100 , 170)
  text("para comerçar pressione ENTER", 20, 195);
  if (keyIsDown(ENTER) ) {
    tela = 2;  
    } 
  }

if(tela==2 )   //inicio do jogo
{  
  background(55);
  image(universo2,350,120)
  fill(color(0, 0, 255));
  ellipse(e1x,e1y,50,50)   //elipse verde
  e1x=e1x-2
   if(e1x<=0)
   {
     e1x= random(400,500)     
   }
  
if(keyIsDown(RIGHT_ARROW))    //anda jogador(nave)
{    // andar pra direita
 x=x+5
   if( x > width ){
   x = 0;
   }
}
fill(255,204,0)
for( var i=0 ;i<qtdBolinha; i++)
{
  ellipse(e2x[i], e2y[i], 30, 30)    //bolinha amarela
  e2y[i]=e2y[i]+0
    if(nivel>1)
    {
     e2y[i]=e2y[i]+1
     }
    if(nivel>3)
    {
     e2y[i]=e2y[i]+2
    }
    if(e2y[i]>400)
    {
    e2y[i]= 0
    e2x[i]=random(0, 400);
    if(vidas!=0){
    vidas = vidas-1;
   }
  }
}

if(keyIsDown(UP_ARROW) && (! pulo) )
{     
pulo = true;
contFrames = 0;
}
if (pulo)
{
  contFrames++;
  yp = 0.5*(contFrames)*(contFrames - 30);
  if (yp > 0) {
    pulo = false;
    yp = 0;
   }
}
  
fill(51)
ellipse(x,y+yp,5,5)    //jogador  nave  //raios 25  
  
  
if(keyIsDown(LEFT_ARROW))
{       // andar pra esquerda
x=x-5
  if(x<=0){
  x=400
  }
}
image(nave,x,y+yp)
imageMode(CENTER)
if ((dist(x, y, e1x, e1y) < 50) && (!pulo))
 { //colisao   raio do jogador+largo/2 do inimigo 2
   if(colisao==false)
   {   
      colisao=true
      if (vidas!=0)
       {
          vidas=vidas-1 
          //text("vidas: "+vidas,10,30)
         ellipse(e1x,e1y,50,50)== fill(200)
         
           
        }
   }   
 } 
else
   {
    colisao=false
    }

for(j=0 ;j<qtdBolinha; j++){
  if(dist( edx, edy, e2x[j], e2y[j]) <= 15){
    pontos = pontos +3;
    e2y[j] = 0;
    e2x[j] = random(0, 400);
  }
}
  
if(pontos>barreiradepontos){    //a primeira vez passa 20
 nivel=nivel+1
 barreiradepontos=barreiradepontos+20    //barreira dobra
}

if(nivel>1)
{
   e1x=e1x-3
}
if(nivel==3)
{
   e1x=e1x-4
}
if(nivel==4){
    e1x=e1x-2
}
  
if((keyIsDown(CONTROL)&&estadodisparo==false))
{ 
    edx=x 
    edy=y 
    estadodisparo=true 
} 
  if((estadodisparo==true)&&(!pulo))
{ 
   fill(color(0, 0, 255));
    ellipse(edx,edy,7,7) 
    edy=edy-20
     if(edy<0)
     { 
      estadodisparo=false 
     }
  }
  
if ( nivel == 5)
{
    background(0);
    textSize(32); 
    fill(255, 204, 0);
    text("Você venceu!", 100, 200);
      tela = 4;
}
  
if ( vidas == 0)
{
    background(0);
    textSize(32); 
    fill('red');
    text("FIM DE JOGO", 100, 200);
    tela = 3
  }
}
  
 if (tela == 3)
 {
    background(0);
    textSize(27); 
    fill('red');
    text("FIM DE JOGO!",110,180)
    text("Para reiniciar pressione ENTER",7,220)
    if (keyIsDown(ENTER)) 
    {
       tela = 2;
      vidas = 3;
       pontos = 0;
       nivel = 1;
       barreiradepontos=20;
    } 
  }
  
  
  if(tela==4)
  {
    image(universo,400,270)
    textSize(27)
    fill(255, 204, 0);
    text("Você venceu!",110,180)
    text("Para reiniciar pressione ENTER",7,220)
    if(keyIsDown(ENTER))
    {
      tela = 2;
      vidas = 3;
       pontos = 0;
       nivel = 1;
       barreiradepontos=20;
     }
    
  }

  fill(0,200,153) 
  textSize(18)
  text("vidas: "+vidas,10,30) 
  text("pontos: "+pontos,100,30)
  text("nivel: "+nivel,210,30)
  
}