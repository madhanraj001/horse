//Example:Smooth scroll for "Back to Top" button 
document.querySelector('.back-to-top').addEventListener('click',function(e)
{
e.preventDefault();
window.scrollTo({
top:0,
behavior:'smooth'
});
})