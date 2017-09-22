$(document).ready(function(){
    // menu js
    $(".menu_item").mouseenter(function(){
        if(window.innerWidth <= 750 || $(this).hasClass("account_icon")) return 0;
        $(".menu_item.active").css("border-color", "#0c77c9");
    })
    $(".menu_item").mouseleave(function(){
        if(window.innerWidth <= 750 || $(this).hasClass("account_icon")) return 0;
        $(".menu_item.active").css("border-color", "#fff");
    })
    $(".menu_item.active").hover(function(){
        if(window.innerWidth <= 750 || $(this).hasClass("account_icon")) return 0;
        $(".menu_item.active").css("border-color", "#fff");
    })
    $("#item_container").hover(function(){
        if(window.innerWidth <= 750) $(".menu_item.active").css("border-color", "#0c77c9");
        else $(".menu_item.active").css("border-color", "#fff");
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
    // $.post("ajax/userManagement.php", {"action":"login","email":email,"password":password}, function(data){
    //     extractedData = JSON.parse(data)
    //     loginResult = extractedData.result
    //     if(loginResult=="Success"){
    //         window.location.href = "/";
    //     }else{
    //         $('#error_container').removeClass("hidden");
    //         resize();
    //     }
    // })
    // return false
})
