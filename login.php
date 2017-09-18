<?php
require_once("core/init.php");
$USER = new User();
if($USER->logged_in()){
    header('Location: /');
    exit();
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Login or Sign-up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/png" href="images/favicon.png"/>
        <link rel="stylesheet" href="style/login.css">
        <link rel="stylesheet" href="style/main.css">
        <link rel="stylesheet" href="style/mobile.css">
        <script defer type="text/javascript" src="scripts/jquery-3.2.1.js"></script>
        <script defer type="text/javascript" src="scripts/main.js"></script>
        <script defer type="text/javascript" src="scripts/validation.js"></script>
        <script type="text/javascript">
			window.addEventListener("resize", resize, false);
			window.addEventListener("load", resize, false);

			function resize(){
                var h1 = $(".form_container.register").height() - 15;
                    h2 = $(".form_container.login").height()
                    hw = window.innerHeight;

                $(".side_shields").height("100%");
                $(".form_container.login").css("margin-top", (hw - h2) / 2 + "px");

                if(h1 <= hw){
                    $(".form_container.register").css("margin-top", (hw - h1) / 2 - 10 + "px");
                    $("#reg_continue_butn").css("margin-bottom", "0px");
                }
                else{
                    $(".form_container.register").css("margin-top", "0px");
                    $("#reg_continue_butn").css("margin-bottom", "15px");
                }
			}
		</script>
    </head>
    <body>
         <div id="containers_wrapper">
            <div id="content_container">
                <div class="side_shields left"></div>
                <div class="side_shields right"></div>
                <div class="form_container login ">
                    <div class="title">Login</div>
                     <div id="error_container" class="hidden">
                        <p>Invalid Details</p>
                        <div id="error_container_bottom"></div>
                    </div>
                    <div class="input_container">
                        <input class="input_field" id="input" type="email input" placeholder="Email Address" title="Email Address" name="email_login">
                        <div class="email forgot">
                            <div class="forgot_icon" title="Forgot Email">?</div>
                        </div>
                    </div>
                    <div class="input_container">
                        <input id="pass_input" class="input_field pass_login pass input" type="password" placeholder="Password" title="Password" name="pass_login">
                        <div class="pass show" id="pass_login">
                            <img class="show_icon pass_login" src="images/hide_icon.png" title="Show Password"/>
                        </div>
                        <div class="pass forgot">
                            <div class="forgot_icon" title="Forgot Password">?</div>
                        </div>
                    </div>
                    <input type="button" class="input_container" id="login_butn" value="Login">
                    <div id="register_butn" class="input_container end">Sign-up</div>
                </div>
                <div class="form_container register hidden">
                    <div class="title register">Sign up</div>
                    <div id="login_return">Already have an account?</div>
                    <div id="reg_error_box" class="hidden">
                        <div id="blank" class="reg_error_item_container hidden">
                            <div class="reg_err_item_dash">-</div>
                            <div class="reg_err_item">Fields with (*) are required</div>
                        </div>
                        <div id="name" class="reg_error_item_container hidden">
                            <div class="reg_err_item_dash">-</div>
                            <div class="reg_err_item">First name and surname can only contain: a-z, A-Z</div>
                        </div>
                        <div id="email" class="reg_error_item_container hidden">
                            <div class="reg_err_item_dash">-</div>
                            <div class="reg_err_item">Email address must have valid syntax</div>
                        </div>
                        <div id="pass" class="reg_error_item_container hidden">
                            <div class="reg_err_item_dash">-</div>
                            <div class="reg_err_item">Password must be 8 or more characters</div>
                        </div>
                        <div id="passr" class="reg_error_item_container hidden">
                            <div class="reg_err_item_dash">-</div>
                            <div class="reg_err_item">Passwords must match</div>
                        </div>

                        <div id="reg_error_bar" class=""></div>
                    </div>
                    <div class="input_container">
                        <div class="valid_symbol hidden first_name_input">
                            <span class="tick hidden first_name_input">✓</span>
                            <span class="cross hidden first_name_input">x</span>
                        </div>
                        <input id="first_name_input" class="input_field reg" type="text" placeholder="First Name" title="First Name">
                        <div class="required_icon"><div class="star">*</div></div>
                    </div>
                    <div class="input_container">
                        <div class="valid_symbol hidden surname_input">
                            <span class="tick hidden surname_input">✓</span>
                            <span class="cross hidden surname_input">x</span>
                        </div>
                        <input id="surname_input" class="input_field reg" type="text" placeholder="Surname" title="Surname">
                        <div class="required_icon"><div class="star">*</div></div>
                    </div>
                    <div class="input_container">
                        <div class="valid_symbol hidden email_input_reg">
                            <span class="tick hidden email_input_reg">✓</span>
                            <span class="cross hidden email_input_reg">x</span>
                        </div>
                        <input id="email_input_reg" class="input_field reg" type="email" placeholder="Email Address" title="Email Address">
                        <div class="required_icon"><div class="star">*</div></div>
                    </div>
                    <div id="pass_req_container">
                        <div id="pass_req_title">Password Requirments</div>
                        <div id="pass_req_text">
                            <div class="pass_req_item">- 8 or more characters</div>
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="valid_symbol hidden pass_input_reg">
                            <span class="tick hidden pass_input_reg">✓</span>
                            <span class="cross hidden pass_input_reg">x</span>
                        </div>
                        <input id="pass_input_reg" class="input_field reg pass_reg" type="password" placeholder="Password" title="Password">
                        <div class="pass show" id="pass_reg">
                            <img class="show_icon pass_reg" src="images/hide_icon.png" title="Show Password"/>
                        </div>
                        <div class="required_icon"><div class="star">*</div></div>
                    </div>
                    <div class="input_container">
                        <div class="valid_symbol hidden pass_repeat_input">
                            <span class="tick hidden pass_repeat_input">✓</span>
                            <span class="cross hidden pass_repeat_input">x</span>
                        </div>
                        <input id="pass_repeat_input" class="input_field reg pass_reg" type="password" placeholder="Password Repeat" title="Password Repeat">
                        <div class="required_icon"><div class="star">*</div></div>
                    </div>
                    <input type="button" class="input_container" id="reg_continue_butn" value="Continue">
                </div>
            </div>
        </div>
    </body>
</html>
