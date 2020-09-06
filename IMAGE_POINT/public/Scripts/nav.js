const brgr = document.querySelector(".brgr");

let menu = document.querySelector(".nav_box_2");

brgr.addEventListener("click",()=>{
    menu.classList.add("nav_box_2_slide");
})

const nav_cut = document.querySelector(".nav_cut");
nav_cut.addEventListener("click",()=>{
    menu.classList.remove("nav_box_2_slide");
})

const msg_cut = document.querySelector(".msg_cut");

console.log(msg_cut);

if(msg_cut)
{
    msg_cut.addEventListener("click",()=>{
        document.querySelector(".msg").classList.add("hide");
    })
}