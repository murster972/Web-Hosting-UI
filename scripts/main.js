var hidden = 1;
var changed = 0;

var test = 0;
var test1 = 0;

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


    //tests
    $("#login_butn").click(function(){
        $("#error_container").removeClass("hidden");
    })

    $("#reg_continue_butn").click(function(){
        if(!test){
            $("#first_name_input").addClass("extended");
            $(".valid_symbol").addClass("valid");
            $(".valid_symbol").removeClass("hidden");
            $("#tick").removeClass("hidden");
            test = 1;
            test1 = 1;
        }
        else{
            if(test1){
                $("#tick").addClass("hidden");
                $("#cross").removeClass("hidden");
                $(".valid_symbol").addClass("invalid");
                $(".valid_symbol").removeClass("valid");
                test1 = 0;
            }
            else{
                $("#cross").addClass("hidden");
                $("#tick").removeClass("hidden");
                $(".valid_symbol").addClass("valid");
                $(".valid_symbol").removeClass("invalid");
                test1 = 1;
            }
        }
    })
})