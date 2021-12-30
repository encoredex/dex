const App = {
    show: function(html) {
        $("app").fadeOut(0)
        $("app").fadeIn(500)
        $("app").html(html+"<br>");
    },
    loop: function() {
        const update = function() {
            $.get({
                url: "https://api.wazirx.com/sapi/v1/tickers/24hr",
                success: function (response) {
                    // console.log(response)
                    marketData =response;
                    for(market of Server.markets) {
                        var pairInfo = marketData.filter(symbol => {
                            return symbol.symbol == market.abbreviation+"inr"
                        })[0]
                        var change = ((pairInfo.lastPrice/pairInfo.openPrice)*100)-100
                        $(`.price-${market.abbreviation}inr`).html(`₹`+pairInfo.lastPrice+`<movement>${(change >= 0)? `<g>+${change.toFixed(2)}%</g>` :  `<r>${change.toFixed(2)}%</r>` }<movement>`)
                        $(`.price-${market.abbreviation}inrx`).html(`₹`+pairInfo.lastPrice+`<br><movementt>${(change >= 0)? `<g>+${change.toFixed(2)}%</g>` :  `<r>${change.toFixed(2)}%</r>` }<movementt>`)
                        
                    }
                    var totalPrice = 0;
                    for(asset of portfolio.assets) {
                        if (asset.symbol == 'inr') {
                            $(`.price-${asset.symbol}inrp`).html(`${asset.quantity} ${asset.symbol}&nbsp;<inrvalue>₹${asset.quantity}</inrvalue>`)
                            totalPrice += asset.quantity
                            continue
                        }
                        var pairInfo = marketData.filter(symbol => {
                            return symbol.symbol == asset.symbol+"inr"
                        })[0]
                        var assetPrice = parseFloat(pairInfo.lastPrice * asset.quantity).toFixed(2)
                        totalPrice += pairInfo.lastPrice * asset.quantity
                        $(`.price-${asset.symbol}inrp`).html(`${asset.quantity} ${asset.symbol}&nbsp;<inrvalue>₹${assetPrice}</inrvalue>`)
                    }
                    $("assetvalue, .assetvalue").html(`₹${totalPrice.toFixed(2)}`)
                }
            })
            $("input").attr("onkeypress", "return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46")
            //console.clear()
            resize()
        }
        setInterval(update,1000)
    },
    setFavicon: function(src) {
        var link = document.createElement('link');
        var oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = src;
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    }
}

function resize () {
    if ($(window).width()>800) {
        $("app, .loginForm, .bottomBar, .appBar").css({
            "width": "50%",
            "left": "25%"
        })
    }
}
function withCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}