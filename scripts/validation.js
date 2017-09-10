valid_inputs = {}

function submitForm(){
    
}

function validateInput(id){
    
}

/* returns 1 if password meets requirments else 0 */
function isValidPassword(pass){
    /*
    //checks length is 8 or more chars
    (?=.*[a-zA-Z0-9-=\[\]\\;,.\/~!@#$%^&*\(\)_+{}|:<>? ]{8})

    //check pass has ALL requirments, i.e lower AND upper AND number AND symbols
    (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-=\[\]\\;,.\/~!@#$%^&*\(\)_+{}|:<>?])

    */
    var regexp = /(?=.*[A-Za-z0-9-=\[\]\\;,.\/~!@#$%^&*\(\)_+{}|:<>? ]{8})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-=\[\]\\;,.\/~!@#$%^&*\(\)_+{}|:<>?])/g
    
    return pass.match(regexp)
}