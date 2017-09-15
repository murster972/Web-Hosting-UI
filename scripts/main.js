//TODO: tidy up js code

$(document).ready(function(){
    $(".pass.show").on("click touch", function(){
        var id = $(this).attr("id");
            t = $("." + id).attr("type");

        $("." + id).attr("type", t == "password" ? "text" : "password");
        $(".show_icon." + id).attr("src", "images/" + (t == "password" ? "show" : "hide") + "_icon.png");
        $(".show_icon." + id).attr("title", t == "password" ? "Hide Password" : "Show Password");
    })

    $("#register_butn").on("click touchstart", function(){
        $(".form_container.login").addClass("hidden");

        //resets register form height
        $(".form_container.register").css("transition", "margin-left .5s")
        $(".form_container.register").height("auto");
        $(".form_container.register").trigger("regScreenShown").removeClass("hidden");
    });

    $("#login_return").on("click touchstart", function(){
        $(".form_container.login").removeClass("hidden");

        //stops scroll bar being shown on login screen
        $(".form_container.register").css("transition", "height 0s .5s, margin-top 0s .5s, margin-left .5s")
        $(".form_container.register").height($(".form_container.register").height());
        $(".form_container.register").height("100%");

        $(".form_container.register").addClass("hidden").trigger("regScreenShown");;
        $(".form_container.register").css("margin-top", 0);
    });


    //NOTE - should error at top for each field be reomved on focusout if valid or only on submit?
    $(".input_field.reg").focusout(function(){
        var id = $(this).attr("id");

        if(id == "pass_input_reg") validateInput("pass_repeat_input");
        else $(this).val($(this).val().trim());

        validateInput(id);
    })

    $(".form_container.register").on("regScreenShown", function(){resize()})

    $("#login_butn").click(function(){
        $("#error_container").removeClass("hidden");
        resize();
    })

    //NOTE - just for testing, needs to be changed so form submitted on click
    $("#reg_continue_butn").click(function(){submitForm()});
})
