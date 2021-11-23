//Declarar variables globals
//mà esquerra: 1. + velocitat 2. - velocitat 3. Afegir quadrats 4. Treure quadrats
//mà dreta: 1. a 2. s 3. b

let mostraFonsBlanc = true;
let mostraFonsFosc = false;
let mostraColors = false;

let movimentX;

let fons = 255;

arrayCercles = [];
arrayRectangles = [];





// Landmark indexes for fingertips [pointer, middle, ring, pinky]...these are the same for both hands
let fingertips = [8, 12, 16, 20]


/**
 * Setup
 * - Configure handsfree (set which models, plugins, and gestures you want to use)
 * - Create start/stop buttons. It's nice to always ask user for permission to start webcam :)
 */
function setup () {
  rectMode(CENTER);

  sketch = createCanvas(500, 500);

  for (let i = 0; i < 100; i++) {

    let x = int(random(0, 500));
    let y = int(random(0, 500));
    let r = int(random(10, 150));

    let c = new Cercle(x, y, r);
    arrayCercles.push(c);
  }
  
  for (let i = 0; i < 2; i++) {

    let x = 0;
    let y = int(random(0, 500));
    let t = int(random(5, 20));

    let r = new Rectangle(x, y, t);
    arrayRectangles.push(r);
  }
  
  
  // #1 Turn on some models (hand tracking) and the show debugger
  // @see https://handsfree.js.org/#quickstart-workflow
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true
  })
  handsfree.enablePlugins('browser')
  handsfree.plugin.pinchScroll.disable()
  
  // Add webcam buttons under the canvas
  // Handsfree.js comes with a bunch of classes to simplify hiding/showing things when things are loading
  // @see https://handsfree.js.org/ref/util/classes.html#started-loading-and-stopped-states
  buttonStart = createButton('Start Webcam')
  buttonStart.class('handsfree-show-when-stopped')
  buttonStart.class('handsfree-hide-when-loading')
  buttonStart.mousePressed(() => handsfree.start())

  // Create a "loading..." button
  buttonLoading = createButton('...loading...')
  buttonLoading.class('handsfree-show-when-loading')

  // Create a stop button
  buttonStop = createButton('Stop Webcam')
  buttonStop.class('handsfree-show-when-started')
  buttonStop.mousePressed(() => handsfree.stop())
  
  
  movimentX = int(random(1, 10));
}






/**
 * Main draw loop
 */
function draw () {
  fill(fons, 8); //mode 1
  rect(0, 0, 1000, 1000); //mode 1

  for (let i = 0; i < 100; i++) {

    arrayCercles[i].mostra();
    arrayCercles[i].canviarRadi();
  }
  
  for (let i = 0; i < arrayRectangles.length; i++) {

    arrayRectangles[i].canviaTamany();
    arrayRectangles[i].canviaPosicio();
    arrayRectangles[i].mostra();
  }


  detectarDits();

}







function detectarDits () {

  let bounds = document.querySelector('canvas').getClientRects()[0];
  const hands = handsfree.data?.hands;

  // Paint with fingers
  if (hands?.pinchState) {
    // Loop through each hand
    hands.pinchState.forEach((hand, handIndex) => {
      // Loop through each finger
      hand.forEach((state, finger) => {
        if (hands.landmarks?.[handIndex]?.[fingertips[finger]]) {
          
          // Landmarks are in percentage, so lets scale up
          let x = sketch.width - hands.landmarks[handIndex][fingertips[finger]].x * sketch.width
          let y = hands.landmarks[handIndex][fingertips[finger]].y * sketch.height

          // Start line on the spot that we pinched
          if (hands?.pinchState && hands.pinchState[1][0] === 'start') { //start = click //important
            mostraFonsBlanc = true;
            mostraFonsFosc = false;
            mostraColors = false;
            fons = 255;
            print('a');

          } 
          
          else if (hands?.pinchState && hands.pinchState[1][1] === 'start') { //start = click //important
            mostraFonsBlanc = false;
            mostraFonsFosc = true;
            mostraColors = false;
            fons = 0;
            print('s');

          } 
          
          else if (hands?.pinchState && hands.pinchState[1][2] === 'start') { //start = click //important
            mostraFonsBlanc = false;
            mostraFonsFosc = false;
            mostraColors = true;
            fons = 0;
            print('d');

          } 
          
          if (hands?.pinchState && hands.pinchState[0][0] === 'start') {

              mesQuadrats();
              for (let i = 0; i < arrayRectangles.length; i++) {
                arrayRectangles[i].mostra();
              }
          } 
          
          else if (hands?.pinchState && hands.pinchState[0][1] === 'start') {

              menysQuadrats();
              for (let i = 0; i < arrayRectangles.length; i++) {
                arrayRectangles[i].mostra();
              }
          } 
          
          else if (hands?.pinchState && hands.pinchState[0][2] === 'start') {
            
            movimentX++;
            
          }
          
          else if (hands?.pinchState && hands.pinchState[0][3] === 'start') {
            
            movimentX--;
            
          }
          
          
          
          
          
          
          
          
          
          
          }
      })
    })  
  } 
  
  function mesQuadrats() {
    let x = 0;
    let y = int(random(0, 500));
    let t = int(random(5, 20));

    let r = new Rectangle(x, y, t);
    arrayRectangles.push(r);
    print('afegit');
  }
  
  function menysQuadrats() {
    let i = int(random(0, arrayRectangles.length));
    arrayRectangles.splice(i, 1)
    print('eliminat');
  }
          
          
          
          
          /*else if (hands?.pinchState && hands.pinchState[1][2] === 'held') { //manté apretat //important
            print("apretant dit 3")

          }

 
  if (hands?.pinchState && hands.pinchState[1][2] === 'released') { //deixa d'apretar //important

    print("deixa d'apretar")
  }*/
  
}


function keyPressed() {
    if (key == 'a') {

      mostraFonsBlanc = true;
      mostraFonsFosc = false;
      mostraColors = false;
      fons = 255;
      print('a');
      
    } else if (key == 's') {

      mostraFonsBlanc = false;
      mostraFonsFosc = true;
      mostraColors = false;
      fons = 0;
      print('s');
    } else if (key == 'd') {

      mostraFonsBlanc = false;
      mostraFonsFosc = false;
      mostraColors = true;
      fons = 0;
      print('d');
    }
  }

class Cercle {

  constructor(x, y, radi) {

    this.x = x;
    this.y = y;
    this.radi = radi;
    this.primerRadi = radi;
  }

  mostra() {

    if (mostraColors) {
      noFill();
      stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
      circle(this.x, this.y, this.radi);
    } 
    
    else if (mostraFonsBlanc) {
      noFill();
      stroke(int(random(0, 255)));
      circle(this.x, this.y, this.radi);
    } 
    
    else if (mostraFonsFosc) {
      noFill();
      stroke(int(random(0, 255)));
      circle(this.x, this.y, this.radi);
    }
  }

  canviarRadi() {


    this.radi -= int(random(1, 7));

    if (this.radi < 0) {
      this.radi += int(random(1, 7));
    } else if (this.radi > this.primerRadi) {
      this.radi -= int(random(1, 7));
    }
  }
}


class Rectangle {
  
  constructor(x, y, t) {
  
    this.x = x;
    this.y = y;
    this.t = t;
    this.primerTamany = t;
    
  }
  
  mostra() {
    
    if (mostraColors || mostraFonsFosc) {
  
      noStroke();
      fill(255);
      rect(this.x,this.y,this.t,this.t);
    }
    
    else if (mostraFonsBlanc) {
      
      noStroke();
      fill(0);
      rect(this.x,this.y,this.t,this.t);
    
    }
    
  }

  canviaTamany() {

    this.t = int(random(10,20));

  
  }

  canviaPosicio() {
    
    this.y = int(random(0, 500));
    this.x += int(random(1,movimentX));
    
    if (this.x > 500+(this.t/2)) {
      this.x = 0-(this.t/2);
    }
      
  
  }

}
  

