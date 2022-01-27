class Card extends Phaser.GameObjects.Sprite{
    constructor(scene,value){
        super(scene, 0, 0, 'card' );
        this.scene = scene;
        this.value = value;
       // this.setOrigin(0.5,0.5);
        this.opened = false;
        this.scene.add.existing(this);
        this.setInteractive();
       // this.flip();       
      //  this.on('pointerdown', this.open, this);
    }
    open(){
       // this.setTexture("card"+this.value);
        this.opened = true;
        this.flip();
        //console.log(this, "clicked");
    }
    close(){
       // if(this.opened){
            this.flip();
            // this.setTexture("card");
             this.opened = false;
            // console.log(this, "clicked"); 
      //  }
       
     }
     
     flip(){
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete:()=>{
                this.show();
            }
            });
        }
    show(){
        let texture = this.opened ? 'card' + this.value: 'card';  
        this.setTexture(texture);   
        this.scene.tweens.add({
        targets: this,
        scaleX: 1,
        ease: 'Linear',
        duration: 150,
        });
    }    

} 