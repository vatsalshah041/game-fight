const canvas=document.querySelector('canvas');
const c= canvas.getContext('2d');
canvas.width=1024;
canvas.height=576;

c.fillRect(0,0,canvas.width,canvas.height);
const gravity=0.2;
class Sprite{
    constructor({position,velocity}){
        this.position=position;
        this.velocity=velocity;
        this.height=100;
    }

    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,100,100)
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
}

const player=new Sprite({
    position:{
    x:0,
    y:0
},
    velocity:{
        x:0,
        y:0
    }
})

const enemy=new Sprite({
    position:{
    x:canvas.width-500,
    y:canvas.height-500
},
    velocity:{
        x:0,
        y:0
    }    
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
    movement();
    


}
const keys={
    arrowUp:{
        pressed:false
    },
    arrowDown:{
        pressed:false
    }, 
    arrowLeft:{
        pressed:false
    },
    arrowRight:{
        pressed:false
    }
}
function movement()
{
    if(keys.arrowUp.pressed && lastkey=='ArrowUp')
    {
        player.velocity.y=-5;
    }
    if(keys.arrowDown.pressed && lastkey=='ArrowDown')
    {
        player.velocity.y=5;
    }
    if(keys.arrowLeft.pressed && lastkey=='ArrowLeft')
    {
        player.velocity.x=-5;
    }
    if(keys.arrowRight.pressed && lastkey=='ArrowRight')
    {
        player.velocity.x=5;
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
        case 'ArrowDown':   
            keys.arrowDown.pressed=true;
            lastkey='ArrowDown';
            break;
        case 'ArrowLeft':
            keys.arrowLeft.pressed=true;
            lastkey='ArrowLeft';
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed=true;
            lastkey='ArrowRight';
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
        case 'ArrowDown':
            keys.arrowDown.pressed=false;
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
    }
})