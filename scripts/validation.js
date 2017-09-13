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
        errs = []

    for(i = 0; i < ids.length; i++){
        t = validateInput(ids[i]);
        if(t) errs.push(txt[ids[i]]);
        if(t == 2) blanks++;
    }

    if(blanks) errs.push("blank");

    if(errs){

    }

    else{
        
    }
}

function validateInput(id){
    var val = $("#" + id).val();
    
    if(valid_test[id](val)){
        symbol(id, 0);
        return 0;
    }
    else if(!val){
        if(id == "pass_repeat_input" && $(".valid_symbol.pass_input_reg").hasClass("hidden")) return 0;
        symbol(id, 0)
        return 1;
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
            dot - dots cannot be next to each other NOTE - unsure if domain can start with dot */


    //BUG: Local regex doesnt match if only one character

    var local, domain, tmp, r, r1;

    tmp = email.split("@");

    if(tmp.length != 2 || email.length > 254) return 0;

    local = tmp[0];
    domain = tmp[1];

    l_regex_start = "^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]";
    l_regex_end = ["[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]", "[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]"];

    //local regex
    r = local.match(/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~][a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]*[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]$/g);
    
    if(!r || local.length > 64) return 0;

    //domain regex
    r = domain.match(/^[a-zA-Z0-9.][a-zA-Z0-9-.]*[a-zA-Z0-9.]$/g);
    r1 = domain.match(/[.]{2,}/g)
    
    if(!r || r1 || domain.length > 255) return 0;

    return 1;

}