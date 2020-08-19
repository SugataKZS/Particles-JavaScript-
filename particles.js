// --------------------- = ) ------------------------- \\
// MIT license: http://opensource.org/licenses/MIT
// demo version: https://sugatakzs.github.io/
// Author : Nikolay - https://t.me/SugataKZS
// GitHub : https://github.com/SugataKZS
// Vk : https://vk.com/oreg2003ggk
// v : Beta 1.0
// --------------------- ( = ------------------------- \\
(function() {
    let settings;
    class CiLine {
        constructor(numberCiline, ctx) {
            // color Circle
            this.r = Math.floor(Math.random() * (256));
            this.g = Math.floor(Math.random() * (256));
            this.b = Math.floor(Math.random() * (256));
            if (settings.ciline.randomParticleColor) {
                
                this.circleColor = `rgba(${this.r},${this.g},${this.b},`;
            } else {
                this.circleColor = settings.ciline.particlesColor;
            }
            
            // opacity
            this.lineeOpac = settings.ciline.minLineOpac;
            this.circleOpac = settings.ciline.minCircleOpac;
            // main params
            this.numberCiline = numberCiline;
            this.ctx = ctx;
            this.moveX = -1000;
            this.moveY = -1000;
            // circle xy
            (this.numberCiline >= 0 && this.numberCiline < settings.ciline.count / 4) ?
                this.xy = [[0, settings.maxWidth / 2], [0, settings.maxHeight / 2]]:
            (this.numberCiline >= settings.ciline.count / 4 && this.numberCiline < settings.ciline.count / 2) ?
                this.xy = [[settings.maxWidth / 2, settings.maxWidth], [0, settings.maxHeight / 2]]:
            (this.numberCiline >= settings.ciline.count / 2 && this.numberCiline <  settings.ciline.count / 1.33) ?
                this.xy = [[0, settings.maxWidth / 2], [settings.maxHeight / 2, settings.maxHeight]]:
            (this.numberCiline >= settings.ciline.count / 1.33 && this.numberCiline <=  settings.ciline.count) ?
                this.xy = [[settings.maxWidth / 2, settings.maxWidth], [settings.maxHeight / 2, settings.maxHeight]]:
            this.xy;
            this.circleX = Math.floor(this.xy[0][0] + Math.random() * (this.xy[0][1] + 1 - this.xy[0][0]));
            this.circleY = Math.floor(this.xy[1][0] + Math.random() * (this.xy[1][1] + 1 - this.xy[1][0]));
            this.MaxVelocity = settings.ciline.MaxVelocity;
            this.velocityX = Math.random()*(this.MaxVelocity*2)-this.MaxVelocity;
            this.velocityY = Math.random()*(this.MaxVelocity*2)-this.MaxVelocity;
           
            
            
        }
        setPosition() {
            if (this.MaxVelocity != settings.ciline.MaxVelocity) {
                this.MaxVelocity = settings.ciline.MaxVelocity;
                this.velocityX = Math.random()*(this.MaxVelocity*2)-this.MaxVelocity;
                this.velocityY = Math.random()*(this.MaxVelocity*2)-this.MaxVelocity;
                
            }
            
            (this.circleX + this.velocityX > settings.maxWidth && this.velocityX > 0 || this.circleX +  this.velocityX < 0 &&  this.velocityX < 0) ?
                this.velocityX*=-1:
                    this.velocityX;
            (this.circleY + this.velocityY > settings.maxHeight && this.velocityY > 0 || this.circleY +  this.velocityY < 0 &&  this.velocityY < 0) ?
                this.velocityY*=-1: 
                    this.velocityX;
            this.circleX += this.velocityX;
            this.circleY += this.velocityY;
            
        }
        draw() {
            let x,y;
            if (settings.ciline.randomParticleColor) {  
                this.circleColor = `rgba(${this.r},${this.g},${this.b},`;
            } else {
                this.circleColor = settings.ciline.particlesColor;
            }
            // circle-move
            this.ctx.beginPath();
            this.ctx.arc(this.circleX, this.circleY, settings.ciline.radiusMove, 0, 2 * Math.PI, true);
            if (this.ctx.isPointInPath(this.moveX, this.moveY)) {
                (this.lineeOpac < settings.ciline.maxLineOpac) ?
                    this.lineeOpac += 0.01: this.lineeOpac;
                (this.circleOpac < settings.ciline.maxCircleOpac) ?
                    this.circleOpac += 0.01: this.circleOpac;
                
             } else {
                
                (this.lineeOpac > settings.ciline.minLineOpac) ?
                    this.lineeOpac -= 0.01: this.lineeOpac;
                (this.circleOpac > settings.ciline.minCircleOpac) ? 
                    this.circleOpac -= 0.01: this.circleOpac;
             }
             
            // lines
        
            for (let i in settings.ciline.cilines) {
                if (this.ctx.isPointInPath(settings.ciline.cilines[i].circleX, settings.ciline.cilines[i].circleY)) {
                        
                    x = settings.ciline.cilines[i].circleX;
                    y = settings.ciline.cilines[i].circleY;
                    // line-1
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.circleX, this.circleY);   
                    this.ctx.lineTo(x, y); 
                    this.ctx.lineWidth = settings.ciline.widthline;
                    this.ctx.strokeStyle = settings.ciline.linesColor + this.lineeOpac;
                    this.ctx.stroke();   
                            
                        
                        
    
                        
                    
                }
    
            }
             // circle-view
             this.ctx.beginPath();
             this.ctx.arc(this.circleX, this.circleY, settings.ciline.radius, 0, 2 * Math.PI, true);
             this.ctx.fillStyle =   this.circleColor + this.circleOpac;
             this.ctx.fill();
            
            
            
            
            
    
            
            
        }
        isPoint(x,y) {
            this.moveX = x;
            this.moveY = y;
            
        
        }
    }
    
    class MainAnimation {
        constructor() {
            this.cvs;
            this.ctx;
            this.dpi;
            this.cilines = settings.ciline.cilines;
            
        }
        init() {
            // initial canvas and application css-styles ... 
            
            document.body.style.background = settings.background;
            let cvs = document.createElement('canvas');
            cvs.style.transform = 'translate(-50%, -50%)';
            cvs.style['margin-right'] = '-50%';
            cvs.style.position ='fixed';
            cvs.style.display = 'block';
            cvs.style.height = '100%';
            cvs.style.width = '100%';
            cvs.style.left = '50%';
            cvs.style.top = '50%';
            cvs.id = 'particles';
            this.cvs = document.body.appendChild(cvs);
            this.ctx = this.cvs.getContext('2d');
            // resize
            this.dpi = window.devicePixelRatio;
            settings.maxWidth = this.cvs.width = +getComputedStyle(this.cvs).getPropertyValue("width").slice(0, -2) * this.dpi;
            settings.maxHeight = this.cvs.height = +getComputedStyle(this.cvs).getPropertyValue("height").slice(0, -2) *this.dpi;
           
            addEventListener('resize', () => {
                // resize canvas
                this.resizeCVS();
            })
            // event-mousemove
            addEventListener('mousemove' , (e) => {
                let rect = this.cvs.getBoundingClientRect(),
                x = e.screenX - rect.left, y  = e.screenY - rect.top;
              
                for (let i in this.cilines) {
                    this.cilines[i].isPoint(x,y);
                   
                }
            })
            // init cilines
            this.initCilines();
            // starting animation
            this.startAnimation();
        }
        clearCVS() {
            // bg
            document.body.style.background = settings.background;
            // resize array
            if (settings.ciline.count > settings.ciline.cilines.length ) {
                for (let i = 0; i<=settings.ciline.count-settings.ciline.cilines.length;i++) {
                    this.cilines.push(new CiLine(+i, this.ctx));
                }
            } else if (settings.ciline.count < settings.ciline.cilines.length) {
                for (let i = 0; i<=settings.ciline.cilines.length - settings.ciline.count; i++) {
                    this.cilines.splice(i, 1);
                }
            }
            // clear
            this.ctx.clearRect(0, 0, this.cvs.width,this.cvs.height);
        }
        resizeCVS() {
            this.dpi = window.devicePixelRatio;
            settings.maxWidth = this.cvs.width =  Math.floor(+getComputedStyle(this.cvs).getPropertyValue("width").slice(0, -2) * this.dpi) ;
            settings.maxHeight = this.cvs.height = Math.floor(+getComputedStyle(this.cvs).getPropertyValue("height").slice(0, -2) *this.dpi);
    
        }
        initCilines() {
            for (let i = 0; i<=settings.ciline.count;i++) {
                this.cilines.push(new CiLine(+i, this.ctx));
            }
        }
        drawing() {
            for (let i in this.cilines) {
                this.cilines[i].setPosition();
                this.cilines[i].draw();
            }
        }
        startAnimation() {
            this.clearCVS();
            this.drawing();
            window.requestAnimationFrame(() => this.startAnimation());
        }
    }
    // starting
    addEventListener('load', () => {
        console.log('%cGitHub: https://github.com/SugataKZS/Particles-JavaScript-','color: rgb(250, 255, 145);');
        console.log('%cLicense: http://opensource.org/licenses/MIT','color: red;');
        if (typeof settingsParticles == "undefined") {
            console.log('Particles: Конфигурационный файл не был найден, включены стандартные настройки');
            settings = {
                background : 'rgb(255,255,255)',
                maxHeight : null,
                maxWidth : null,
                ciline : {
                    count : 80,
                    linesColor : 'rgba(0,0,0,',
                    particlesColor : 'rgba(0,0,0,',
                    randomParticleColor : true,
                    minCircleOpac: 0.2,
                    maxCircleOpac: 0.5,
                    minLineOpac: 0.03,
                    maxLineOpac: 0.2,
                    radius : 20,
                    radiusMove: 150,
                    widthline : 2,
                    MaxVelocity: 1,
                    cilines : []
                }
            }
        } else {
            settings = settingsParticles;
           
        }
        let Animation = new MainAnimation();
        Animation.init();
       
    })
})()