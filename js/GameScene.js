class GameScene extends Phaser.Scene{
    constructor(){
        super("Game"); 
    }
    preload(){
        this.load.image('bg', '/img/fon.jpg');
        this.load.image('card', '/img/karta.jpg');

        this.load.image('card1', '/img/SpiteCard/1.jpg');
        this.load.image('card2', '/img/SpiteCard/2.jpg');
        this.load.image('card3', '/img/SpiteCard/3.jpg');
        this.load.image('card4', '/img/SpiteCard/4.jpg');
        this.load.image('card5', '/img/SpiteCard/5.jpg');
    }

    create(){
        this.createBackgraund();
        this.createCards(); 
        this.createText();
        this.CreateTimer();
        this.timeout = config.timeout;
        this.openedCard = null;
        this.numCardOpen = 0;
        this.start();
    }
    CreateTimer(){
        this.time.addEvent({
            delay: 1000,
           // callback: this.onTimerTik,
            callback: this.onTimerTik,
            callbackScope: this,
            //callback: this,
            loop: true
        });
    }
    onTimerTik(){
      //console.log("tik", this);
      this.timeOut.setText("Time: "+this.timeout);
      if(this.timeout<=0){
        this.start();
      }
      else{
        this.timeout--;
      }
      
    }

    start(){
        this.timeout = config.timeout;
        this.openedCard = null;
        this.numCardOpen = 0;
        this.initCards();
    }
    initCards(){
        let positions = this.getCardPosition();
       
        this.cards.forEach(card =>{
            let position = positions.pop();
            card.close();
            card.setPosition(position.x, position.y);
        });
    }
    createBackgraund(){
        this.add.sprite(0,0, 'bg').setOrigin(0,0); //примусово кажемо, що почни малювати від 0,0
    } 
    createCards(){
        this.cards = [];
        // let positions = this.getCardPosition();
        // Phaser.Utils.Array.Shuffle(positions);
        for(let value of config.cards){
            for(let i=0; i<2; i++){
                this.cards.push(new Card(this, value));
            }
        }  
        this.input.on("gameobjectdown", this.onCardClick, this);  
    }

    onCardClick(pointer, card){
       if(card.opened){
           return false;
       } 
       if(this.openedCard){
            if(this.openedCard.value === card.value){
             //Запам'ятати картинку
                this.openedCard = null;
                this.numCardOpen++;
            }
            else{
                this.openedCard.close();
                this.openedCard = card;
            }
       }else{
           this.openedCard = card;
        }
       card.open();
       if(this.numCardOpen===5){
           this.start();
       }
    }
     
    getCardPosition (){
        let positions = [];
        let kadsWid = 142+4;
        let kadsHeig = 200+4;
          
            // let offSetX = (this.sys.game.config.withC - kadsWid*config.col)/2;
             //let offSetY = (this.sys.game.config.heightC - kadsHeig*config.row)/2;
        let offSetX  = 100 +kadsWid/2 ;
        let offSetY = 100 + kadsHeig/2 ;         
        for(let col = 0; col<config.col; col++){
            for(let row = 0; row<config.row; row++){
                positions.push({
                    x: offSetX + col*kadsWid,
                    y: offSetY + row*kadsHeig,
                });
            }
        }
            return  Phaser.Utils.Array.Shuffle(positions);
    }
   createText(){
       this.timeOut = this.add.text(350,10,"", {
        font: '36px Arial',
          // fill: '#ffffff'
       });
   } 
}
