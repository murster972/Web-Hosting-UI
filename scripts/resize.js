/* function called on page load and window resize
   :param f: list of functions for resize to call*/
function resize(f){
    for(i = 0; i < f.length; i++) f[i]();
}
