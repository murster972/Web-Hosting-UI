var hidden = 1;

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

    $(".button.login").click(function(){
        $(".form_container.login").removeClass("hidden");
        $(".form_container.register").addClass("hidden");
    })

    $(".button.register").click(function(){
        $(".form_container.login").addClass("hidden");
        $(".form_container.register").removeClass("hidden");
    })
})