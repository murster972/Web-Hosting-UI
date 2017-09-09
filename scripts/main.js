var hidden = 1;
var changed = 0;

$(document).ready(function(){
    $(".pass.show").click(function(){
        if(hidden){
            $("#pass_input").attr("type", "text");
            src = "show_icon.png";
        }
        else{
            $("#pass_input").attr("type", "password");
            src = "hide_icon.png";
        }

        $("#show_icon").attr("src", "images/" + src);
        hidden = hidden ? 0 : 1;
    })
})