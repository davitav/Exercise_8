var particleArray = [];  //array for Particles

var locX = 200; //locations of first system

var locY = 200;

var c = 1;

function setup() {
  createCanvas(800, 800);
  for(var i = 0; i < 3; i++){  //goes through the for loop and generates separate particle systems
    particleArray.push(new ParticleSystem(createVector(locX, locY)));
    locX = locX + 200; //locations incrementing for each particle system
    locY = locY + 150;   
  }
 
}

function draw() {
  background(51);
  for(var i = 0; i <= particleArray.length - 1; i++)  //iterating through the for loop, updating and displaying each system
    {
        particleArray[i].addParticle(i); //pushes individual particles into array
        particleArray[i].run(i); //updates and displays 
        c++;
    }
    
    
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.15);  //rate of change of velocity
  this.velocity = createVector(random(-1, 1), random(-1, 0));  //rate of change of position
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {  //update and display the particle system
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);  //accelerating the particles
  this.position.add(this.velocity);  //moving the particles
  this.lifespan -= 5;
};

// Display method
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(1);
  fill(127, this.lifespan);
  rect(this.position.x, this.position.y, 10, 10);
};

// Is the particle dead?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};


var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};