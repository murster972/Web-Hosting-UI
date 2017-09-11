valid_inputs = {}

function submitForm(){
    
}

function validateInput(id){
    
}

function emailValidation(email){
    /* checks local - ^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~][a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]*[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]$
            upper and lower case
            numbers
            symbols - !#$%&'*+\-\/=?^_`{|}~.
            dot(.) - providing its not the first or last char

       checks domain - ^[a-zA-Z0-9.][a-zA-Z0-9-.]*[a-zA-Z0-9.]$
            upper and lower case
            numbers - although domain cant be all numbers
            hypen(-) - providing its not the first or last char
            dot - dots cannot be next to each other NOTE - unsure if can start with dot */

    var local, domain, tmp, r, r1;

    tmp = email.split("@");

    if(tmp.length != 2) return 0;

    local = tmp[0];
    domain = tmp[1];

    console.log(local, domain);

    //local regex
    r = local.match(/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~][a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]*[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]$/g);
    
    //console.log(r, r[0].length, local.length);

    if(!r) return 0;


    //domain regex
    r = domain.match(/^[a-zA-Z0-9.][a-zA-Z0-9-.]*[a-zA-Z0-9.]$/g);
    r1 = domain.match(/[.]{2,}/g)
    
    if(!r || r1) return 0;

    return 1;

}