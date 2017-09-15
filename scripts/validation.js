//TODO: tidy up js code

//regex used to test each input fieled for registration
valid_test = {"first_name_input": function(name){return name.match(/[^a-zA-Z]/g)},
              "surname_input": function(name){return name.match(/[^a-zA-Z]/g)},
              "email_input_reg": function(email){return !emailValidation(email)},
              "pass_input_reg": function(pass){return pass.length < 8},
              "pass_repeat_input": function(pass){return pass != $("#pass_input_reg").val()}
             }

function submitForm(){
    var ids = ["first_name_input", "surname_input", "email_input_reg", "pass_input_reg", "pass_repeat_input"];
        txt = {"first_name_input": "name", "surname_input": "name", "email_input_reg": "email",
               "pass_input_reg": "pass", "pass_repeat_input": "passr"};

        blanks = 0;
        errs = new Set();

    for(i = 0; i < ids.length; i++){
        t = validateInput(ids[i]);
        if(t == 0) errs.add(txt[ids[i]]);
        if(t == 1) blanks++;
    }

    if(blanks) errs.add("blank");

    if(errs.size){
        show_reg_errors(Array.from(errs));
    }
    else{
        alert("upload to server and continue to reg page")
    }
}

function validateInput(id){
    var val = $("#" + id).val();

    if(!val){
        if(id == "pass_repeat_input" && $(".valid_symbol.pass_input_reg").hasClass("hidden")) return 0;
        symbol(id, 0)
        return 1;
    }

    else if(valid_test[id](val)){
        symbol(id, 0);
        return 0;
    }

    else{
        symbol(id, 1);
        return 2;
    }
}


//changes valid symbol for each input to valid or invalid
function symbol(id, valid){
    $("#" + id + ".input_field").addClass("extended");

    tmp = "." + id + ".valid_symbol"
    $(tmp).removeClass("hidden");

    $(tmp).removeClass(valid ? "invalid" : "valid");
    $(tmp).addClass(valid ? "valid" : "invalid");

    if(valid){
        $(".cross." + id).addClass("hidden");
        $(".tick." + id).removeClass("hidden");
    }

    else{
        $(".cross." + id).removeClass("hidden");
        $(".tick." + id).addClass("hidden");
    }
}

function emailValidation(email){
    /* checks local - ^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~][a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]*[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]$
            upper and lower case
            numbers
            symbols - !#$%&'*+\-\/=?^_`{|}~.
            dot(.) - providing its not the first or last char

       checks domain - ^[a-zA-Z0-9.][a-zA-Z0-9-.]*[a-zA-Z0-9.]$
                       [.]{2,}
            upper and lower case
            numbers - although domain cant be all numbers
            hypen(-) - providing its not the first or last char
            dot - dots cannot be next to each other NOTE - unsure if domain can start with dot, going with can't */


    //NOTE: now works, but code needs tidied up

    var local, domain, tmp, r, r1;

    local_domain = email.split("@");

    if(local_domain.length != 2 || email.length > 254) return 0;

    local = local_domain[0];
    domain = local_domain[1];

    allowed_l = "a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~";
    r = "(?=^[" + allowed_l + "])";

    if(local.length > 1) r = r + "(?=[" + allowed_l + ".])(?=^[^.].*[^.]$)";
    else r = r + "(?=^[^.])";

    //local regex
    local_match = local.match(new RegExp(r, "g"));

    if(!local_match || local.length > 64) return 0;

    allowed_d = "a-zA-Z0-9";
    r = "^[" + allowed_d + "]";

    if(domain.length > 1) r = r + "[" + allowed_d + "-.]*[" + allowed_d + "]$";
    else r = "(?=" + r + ")(?=^[^-.])";

    //domain regex
    r = domain.match(new RegExp(r, "g"));
    r1 = domain.match(/[.]{2,}/g)

    if(!r || r1 || domain.length > 255) return 0;

    return 1;
}

function show_reg_errors(e){
    var ids = ["blank", "name", "email", "pass", "passr"];

    $("#reg_error_box").removeClass("hidden");

    for(i = 0; i < ids.length; i++){
        if(e.indexOf(ids[i]) == -1) $("#" + ids[i]).addClass("hidden");
        else $("#" + ids[i]).removeClass("hidden");
    }

    //recenters login form after error box is shown
    resize();
}
