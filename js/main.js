var portfolio
var marketData
var page = "mr"
var globalSymbol = ""
var globalName = ""

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){
    App.setFavicon("img/icon.png")
    App.loop()
    Portfolio.getPortfolio()
    Market.show()
    // if (typeof window.localStorage !== 'undefined') {
    //     if (localStorage.getItem("r") == 'true' || localStorage.getItem("r") == 'true'  ) {
    //         $(".acc").val("795233")
    //     }
    // } else {
        
    // }
    

    $(".ld").fadeOut(0, function (){
        $(".ld").remove();
    });
    
    $("loginButton").click(function(){
        acc = $(".acc").val()
        pass = $(".pass").val()
        if (acc == 775255 && pass==6969) {
            $(".loginForm").remove()
            // localStorage.setItem("r",true)
        } else {
            swal({
                title: "Error",
                text: "Account number or password incorrect",
                icon: "warning",
            })
        }
    })
    resize()
    $('a').remove();
})