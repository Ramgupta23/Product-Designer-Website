var timeout;

const scroll = new LocomotiveScroll({
    // el ka mtlb kis elemnt pr lga rahe hai
    el: document.querySelector('#main'),
    smooth: true
})

function firstPageAnim(){
    var tl=gsap.timeline();


  tl.from("#nav",{
    y:'-10',
    opacity:0,
    duration:1.5,
    ease:Expo.easeInOut
})
.to(".boundingelem",{
    y:0,
    ease:Expo.easeInOut,
    duration:2,
    delay:-1,
    stagger:.2 
})
.from("#herofooter",{
    y:'-10',
    opacity:0,
    duration:1.5,
    delay:-1,
    ease:Expo.easeInOut
})

}


//jab mouse move ho toh hum log skew kr paye (sukad jaye) aur 
// maximum skew and minimum skew define kar paaye
// jab mouse move ho toh chapta ki value bade,
// aur jab mouse chlmna bnanda ho jaye toh chapta hta lo
 
// var timeout;

function circleChaptaKaro(){
    //define default scale value
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
    //    var xdiff = dets.clientX - xprev;
    //    var ydiff = dets.clientY - yprev;
       
    this.clearTimeout(timeout);


        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);//final scaling of x
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);//final scaling of y


        xprev=dets.clientX;//purani value or fast value 
        yprev=dets.clientY;

      
        // console.log(xdiff,ydiff);

        circleMouseFollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;//jb mouse stop hoga
        },100);
    });
 }
// circleChaptaKaro();

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        // console.log(dets);
        // console.log(dets.clientX,dets.clientY);
        document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale} )`;
    });
}
circleMouseFollower();
circleChaptaKaro();
 firstPageAnim();


//teeno element ko select karo,uske baad teeno par ek mousemove lagao
// jab mousemove ho to ye pata karo ki mouse kaha par HTMLDetailsElement,
// jiska matlab hai mouse ki x and y position pata karo, ab mouse kix y position ke badle us image ko show karo and us image ko move karo,
//  move karte waqt rotate karo,and jaise jaise mouse tez chale waise waise roatation bhi tej ho jaye

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diffrot=0;

    elem.addEventListener("mouseleave",function(dets){

    
    
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration:0.5,
    
        });
         });


     elem.addEventListener("mousemove",function(dets){
    //  console.log("hello ji")
    // console.log(details.clientX,details.clientY);//mouse location
    //  elem.querySelector("img"). 

    // div details
    //console.log(dets.clientY-elem.getBoundingClientRect)
   

    var diff=dets.clientY - elem.getBoundingClientRect().top; 
    diffrot=dets.clientX - rotate;
   rotate=dets.clientX;
//    gsap.utils.clamp(-20,20,diff);


    gsap.to(elem.querySelector("img"),{
        opacity: 1,
        ease: Power3,
        // top:dets.clientY,
        // left:dets.clientX,
        top:diff,
        left: dets.clientX ,
        rotate: gsap.utils.clamp(-20,20,diffrot * 0.5),     

    });
     });
});






