$(document).ready(function(){
    //clears inputs on page load
    //email_validation("test@[123.255.123.123]")
    //email_validation("test@[123.12e3.123.123]")
    //email_validation("test@[IPv6:2001:db8::1]")

    //testing error message transition
    $(document).click(function(){
        if($(".error_msg").hasClass("hidden")) $(".error_msg").removeClass("hidden");
        //else $(".error_msg").addClass("hidden");
    })

    $(".header_content").click(function(){
        if($(this).attr("id") == "login_header"){
            form_change("login");
        }
        else{
            form_change("register");
        }
    })

    window.addEventListener('resize', resize, false);

    $(".show_pass_button").click(function(){"#" + show_pass(this.id);})

    $("#forgot_pass_icon").tooltip({tooltipClass: "tooltip", position: {my: "center top-10", at: "left bottom", collision: "flipfit" }});

    var error_icon_ids = ["login.email", "login.password", "reg.fname", "reg.sname", "reg.email", "reg.password", "reg.password_repeat"];

    for(var i = 0; i < error_icon_ids.length; i++){
        $(".error_icon." + error_icon_ids[i]).tooltip({tooltipClass: "tooltip_error", position: {my: "left top", at: "left bottom", collision: "flipfit"}});
    }

    //$(".error_icon.login.email").tooltip({tooltipClass: "tooltip_error", position: {my: "left top", at: "left bottom", collision: "flipfit"}});
    //$(".error_icon.login.password").tooltip({tooltipClass: "tooltip_error", position: {my: "left top", at: "left bottom", collision: "flipfit"}})
    //$(".error_icon.reg.sname").tooltip({tooltipClass: "tooltip_error", position: {my: "left top", at: "left bottom", collision: "flipfit", content: "Valid First Name Required"}})


    $(".submit_button.login").click(function(){login_form_submit();});
})

/* resizes contents to fit current window size */
function resize(){

}

/* changes form: login -> register or login <- register */
function form_change(form){
    if(form == "register"){
        $("#login_header").removeClass("active");
        $("#register_header").addClass("active");
        $("#login_inputs").addClass("hidden");
        $("#login_inputs_cloak").addClass("move");
        $("#register_inputs").removeClass("hidden");
        $("#register_inputs_cloak").addClass("move");
    }
    else{
        $("#login_header").addClass("active");
        $("#register_header").removeClass("active");
        $("#login_inputs").removeClass("hidden");
        $("#login_inputs_cloak").removeClass("move");
        $("#register_inputs").addClass("hidden");
        $("#register_inputs_cloak").removeClass("move");
    }
}

/* toggles password show */
function show_pass(id){
    field_id = id.replace("_show", "").replace("_button", "_field")
    var type = $(field_id).prop("type");
        attr = type == "password" ? "text" : "password";
        txt = type == "password" ? "hide" : "show";
    $(field_id).attr("type", attr);
    $(id).text(txt);
}

function login_form_submit(){
    var valid_pass = login_validtion("password", true);
        valid_email = login_validtion("email", true);
}

function login_validtion(input_field_name, is_submit){
    if(input_field_name == "email"){
        var email = $("#email_field").val();

        if(email.length <= 0 && is_submit == true){
            $(".error_icon.login.email").removeClass("hidden");
            $(".input_container.login.email").addClass("error");
            $("#email_field").addClass("error");
            $(".error_icon.login.email").attr("title", "Email Adddress Required");
            return false;
        }

        $(".error_icon.login.email").addClass("hidden");
        $(".input_container.login.email").removeClass("error");
        $("#email_field").removeClass("error");
        return true;
    }

    else if(input_field_name == "password"){
        //emtpy field
        var pass = $("#password_field").val();
        var error = 0;

        if(pass.length <= 0 && is_submit == true){
            $(".error_icon.login.password").removeClass("hidden");
            $(".input_container.login.password").addClass("error");
            $("#password_field").addClass("error");
            $("#forgot_pass_icon").addClass("error");
            $("#show_pass_button").addClass("error");
            $("#forgot_pass_icon_circle").addClass("error");
            return false;
        }

        else{
            $(".error_icon.login.password").addClass("hidden");
            $(".input_container.login.password").removeClass("error");
            $("#password_field").removeClass("error");
            $("#forgot_pass_icon").removeClass("error");
            $("#show_pass_button").removeClass("error");
            $("#forgot_pass_icon_circle").removeClass("error");
            return true;
        }
    }
}

function test(email){
    console.log(email_validation(email));
}


function email_validation(email){
    //testing email format validation
    var email_addr = email.split("@");

    //exactly one "@" sign is present
    if(email_addr.length != 2){return false;}

    //local-part
    //TODO - check for quotes

    //checks local-part only contains chars: a-z A-Z 0-9 ! # $ % & ' * + - / = ? ^ _ ` { | } ~ .
    //var reg_expr = /[a-z]|[A-Z]|[0-9]|[\!\#\$\%\&\'\*\+-\/\=\?\^\_\`\{\|\}\~\.]/g;
    var reg_expr = /[a-zA-Z0-9\!\#\$\%\&\'\*\+-\/\=\?\^\_\`\{\|\}\~\.]/g;
    if(email_addr[0].match(reg_expr).length != email_addr[0].length) return false;

    //checks if starts or ends with dot or if there if two or more dots appear consecutively
    var start_end = email_addr[0].match(/^[.]|[.]$/g);
        two_consec = email_addr[0].match(/[.]{2}/g);
    if(start_end != null || two_consec != null) return false;

    //domain
    var is_ip = valid_ip(email_addr[1]);
    if(is_ip == true) return true;
    var domain = email_addr[1].split(".");
    if(domain.length != 2 || (domain.length == 2 && (domain[0].length == 0 || domain[1].length == 0))) return false;

    //checks domain only contain chars: a-z A-Z 0-9 -
    reg_expr = /[a-z]|[A-Z]|[0-9]|[\-]/g;
    if(domain[0].match(reg_expr).length != domain[0].length || domain[1].match(reg_expr).length != domain[1].length) return false;

    //checks if domain starts with a hyphen
    reg_expr = /^[\-]|[\-]$/g;
    if(domain[0].match(reg_expr) != null || domain[1].match(reg_expr) != null) return false;

    return true;
}

function valid_ip(ip){
    //checks if square-brackets
    if(ip.match(/^[\[]|[\]]$/g) == null) return false;

    var ip_addr = ip.replace("[", "").replace("]", "");

    if(ip_addr.match(/[\:]/g) != null){
        //IPv6
        //checks only certain chars were used: a-f A-F 0-9
        ip_addr = ip_addr.replace(/^[Ii][Pp][Vv][6][\:]/g, "").split(":");
        for(var i = 0; i < ip_addr.length; i++){
            //if(ip_addr.match(/[^a-fA-F0-9]/g)) return false;
        }

        //expand '::'

    }
    else{
        //IPv4e
        //checks there are four octets
        ip_addr = ip_addr.split(".");
        if(ip_addr.length != 4) return false;

        //octets only contain chars 0-9 and are in range 0 - 255
        var only_digits = /[^0-9]/g;
        for(var i = 0; i < 4; i++){
            if(ip_addr[i].match(only_digits) != null) return false;
            if(parseInt(ip_addr[i]) < 0 || parseInt(ip_addr[i]) > 255) return false;
            if(ip_addr[i].length == 0) return false;
        }

        console.log("Valid IPv4 address")
        return true;
    }
}
