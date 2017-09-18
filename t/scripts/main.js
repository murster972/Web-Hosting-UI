$(document).ready(function(){
    $(".pass.show").on("click touch", function(){
        var id = $(this).attr("id");
            t = $("." + id).attr("type");

        $("." + id).attr("type", t == "password" ? "text" : "password");
        $(".show_icon." + id).attr("src", "images/" + (t == "password" ? "show" : "hide") + "_icon.png");
    })

    $("#register_butn").on("click touchstart", function(){
        $(".form_container.login").addClass("hidden");
        $(".form_container.register").removeClass("hidden").trigger("regScreenShown");
    });

    $("#login_return").on("click touchstart", function(){
        $(".form_container.login").removeClass("hidden");
        $(".form_container.register").addClass("hidden").trigger("regScreenShown");;
    });


    $(".input_field.reg").focusout(function(){
        var id = $(this).attr("id");

        validateInput(id);

        if(id == "pass_input_reg") validateInput("pass_repeat_input");
    })

    $(".form_container.register").on("regScreenShown", function(){resize()})


    //NOTE - just for testing, needs to be changed so form submitted on click
    $("#reg_continue_butn").click(function(){submitForm()});

})

$('#login_butn').click(function(){
    var email = $("#email_input").val();
    var password = $("#pass_input").val();
    $.post("ajax/userManagement.php", {"action":"login","email":email,"password":password}, function(data){
        extractedData = JSON.parse(data)
        loginResult = extractedData.result
        if(loginResult=="Success"){
            window.location.href = "/";
        }else{
            $('#error_container').removeClass("hidden");
            resize();
            console.log("test");
        }
    })
    return false
})
