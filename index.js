const canvas=document.querySelector('canvas');
const c= canvas.getContext('2d');
canvas.width=1024;
canvas.height=576;

c.fillRect(0,0,canvas.width,canvas.height);
const gravity=0.7;
class Sprite{
    constructor({position,velocity,color}){
        this.position=position;
        this.velocity=velocity;
        this.width=50;
        this.height=150;
        this.color=color;
        this.attacking=false;
        this.attackbox={
            position:this.position,
            widht:100,
            height:50,
    }
}

    draw(){
        c.fillStyle=this.color;
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        if(this.attacking==true)
        {
        c.fillStyle='yellow'
        c.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.widht,this.attackbox.height)
        }
    }
    update(){
        this.draw();
        
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        if(this.position.y+this.height+this.velocity.y>canvas.height)
        {
            this.velocity.y=0;
        }
        else
        {
            this.velocity.y+=gravity;
        }
    }

    attack(){
        this.attacking=true;
        setTimeout(()=>{
            this.attacking=false;
        },100)
    }
}

const player=new Sprite({
    position:{
    x:0,
    y:0
},
    velocity:{
        x:0,
        y:0
    },
    color:'red'
})

const enemy=new Sprite({
    position:{
    x:canvas.width-500,
    y:canvas.height-500
},
    velocity:{
        x:0,
        y:0
    },
    color:'blue'    
})



console.log(player)


function animate()
{
    window.requestAnimationFrame(animate)
    // console.log('go');
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();
    console.log();


    movement();
    
    //  detect collision
    if(player.attackbox.position.x+player.attackbox.widht>=enemy.attackbox.position.x && player.attackbox.position.x<=enemy.attackbox.position.x+enemy.attackbox.widht && player.attackbox.position.y+player.attackbox.height>=enemy.attackbox.position.y && player.attackbox.position.y<=enemy.attackbox.position.y+enemy.attackbox.height && player.attacking==true)
    {   
        player.attacking=false;
        console.log('attacking')
    }


}
const keys={
    arrowUp:{
        pressed:false
    },
    arrowLeft:{
        pressed:false
    },
    arrowRight:{
        pressed:false
    },
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    }

}
function movement()
{
    if(keys.arrowUp.pressed && lastkey=='ArrowUp')
    {
        player.velocity.y=-5;
    }
    if(keys.arrowLeft.pressed && lastkey=='ArrowLeft')
    {
        player.velocity.x=-5;
    }
    if(keys.arrowRight.pressed && lastkey=='ArrowRight')
    {
        player.velocity.x=5;
    }
    if(keys.a.pressed && lastkey=='a')
    {
        enemy.velocity.x=-5;
    }   
    if(keys.d.pressed && lastkey=='d')
    {
        enemy.velocity.x=5;
    }
    if(keys.w.pressed && lastkey=='w')
    {
        enemy.velocity.y=-5;
    }

}
animate()

let lastkey;
window.addEventListener('keydown',(e)=>{
    switch(e.key)
    {
        case 'ArrowUp':
            keys.arrowUp.pressed=true;
            lastkey='ArrowUp';
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed=true;
            lastkey='ArrowLeft';
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed=true;
            lastkey='ArrowRight';
            break;
        case ' ':
            player.attack();
            break;
        case 'a':
            keys.a.pressed=true;
            lastkey='a';
            break;
        case 'd':
            keys.d.pressed=true;
            lastkey='d';
            break;
        case 'w':   
            keys.w.pressed=true;
            lastkey='w';
            break; 
        
        
    }
})
window.addEventListener('keyup',(e)=>{
    switch(e.key)
    {
        case 'ArrowUp':
            keys.arrowUp.pressed=false;
            player.velocity.y=0;
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed=false;    
            player.velocity.x=0;
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed=false;
            player.velocity.x=0;
            break;
        case 'a':
            keys.a.pressed=false;
            enemy.velocity.x=0;
            break;
        case 'd':
            keys.d.pressed=false;
            enemy.velocity.x=0;
            break;
        case 'w':
            keys.w.pressed=false;
            enemy.velocity.y=0;
            break;
        
    }
})