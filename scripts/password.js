$(document).ready(function(){
    $(".pass.show").on("click touch", function(){
        var id = $(this).attr("id");
            t = $("." + id).attr("type");

        $("." + id).attr("type", t == "password" ? "text" : "password");
        $(".show_icon." + id).attr("src", "images/" + (t == "password" ? "show" : "hide") + "_icon.png");
    })
})
