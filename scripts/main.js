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

    $("#register_butn").on("click touchstart", function(){
        $(".form_container.login").addClass("hidden");
        $(".form_container.register").removeClass("hidden");
    });

    $("#login_return").on("click touchstart", function(){
        $(".form_container.login").removeClass("hidden");
        $(".form_container.register").addClass("hidden");
    });


    $(".input_field.reg").focusout(function(){
        validateInput($(this).attr("id"));
    })


    //NOTE - just for testing, needs to be changed so form submitted on click
    $("#reg_continue_butn").click(function(){submitForm()});
})