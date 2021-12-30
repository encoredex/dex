const BuySell = {
    show: function(symbol,name) {
        globalSymbol = symbol
        globalName = name
        var html = `
        <SymbolChart>${name}(${symbol.toUpperCase()})</SymbolChart>
            <SymbolPrice class="price-${symbol}inrx">₹0.00</SymbolPrice>
            <br>
            <div class="chart">
            
            </div>
            <item class="buySellActions">
                <buy h onClick="BuySell.buy()">Buy</buy>
                <sell h onClick="BuySell.sell()">Sell</sell>
            </item>
            <item class="orderBook">
            <iframe class="spfr"
            src = "https://s.tradingview.com/embed-widget/technical-analysis/?locale=in#%7B%22interval%22%3A%221m%22%2C%22width%22%3A425%2C%22isTransparent%22%3Atrue%2C%22height%22%3A450%2C%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22showIntervalTabs%22%3Atrue%2C%22colorTheme%22%3A%22light%22%2C%22utm_source%22%3A%22in.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22technical-analysis%22%7D"
            ></iframe>
            </item>
            <div tdi>Golden Pass Active <br> Maker Fee: 0.00% | Taker Fee: 0.00%<br>All trades are completed within a span of 24 hours or marked as unsuccessful</div>
            `;
        page = "buysell"
        App.show(html)
        
        this.showChart(symbol);
    },
    showChart: function(symbol) {
        let width = ($(".chart").width())+10; 
        $(".chart").html(`<iframe style="height:300px;width:`+width+`px" scrolling="no" allowtransparency="true" frameborder="0" src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=in#%7B%22symbol%22%3A%22BINANCE%3A${symbol.toUpperCase()}USDT%22%2C%22width%22%3A350%2C%22height%22%3A200%2C%22dateRange%22%3A%221M%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%7D" ></iframe>`)
    },
    buy: function() {
        assetQuantity =  portfolio.assets.filter(function (asset) {
            return asset.symbol == "inr";
        })[0].quantity
        swal(`Enter amount in Rupee (₹)\nAvailable Balance: ₹${assetQuantity} `, {
            content: {
                element: "input",
                attributes: {
                  placeholder: "₹0.00 ",
                  type: "number",
                },
              },
          })
          .then((value) => {
              if (value == null || value == 0 ) {
                    swal("Enter a valid amount"); 
                    return;
                }
                if (value < 100) {
                    swal("Minimum buy amount is ₹100"); 
                    return;
                }
                if (value > assetQuantity) {
                    swal("Insufficient balance, available: ₹"+assetQuantity); 
                    return;
                }
                var send = new FormData();
                send.append("amount",value)
                send.append("name",globalName)
                send.append("symbol",globalSymbol)
                send.append("id",getRandomInt(1000000,10000000000))
                $.ajax({
                    url: "https://m2-network.000webhostapp.com/server/buy.php",
                    data: send,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (response) {
                        swal("Success!", "Order Placed!", "success");
                        //console.log(response)
                    }
                })
          });
    },
    sell: function() {
        assetQuantity =  portfolio.assets.filter(function (asset) {
            return asset.symbol == globalSymbol;
        })
        if (assetQuantity.length == 0) {
            swal(`No ${globalName}(${globalSymbol.toUpperCase()}) available to sell`); 
            return;
        }
        assetQuantity = assetQuantity[0].quantity;
        swal(`Enter amount in ${globalName} \nAvailable Balance: ${assetQuantity}${globalSymbol.toUpperCase()} `, {
            content: {
                element: "input",
                attributes: {
                  placeholder: "0.00 "+globalSymbol.toUpperCase(),
                  type: "number",
                },
              },
          })
          .then((value) => {
              if (value == null || value == 0 ) {
                    swal("Enter a valid amount"); 
                    return;
                }
                if (value > assetQuantity) {
                    swal("Insufficient balance, available: "+assetQuantity+" "+globalSymbol.toUpperCase()); 
                    return;
                }
                var send = new FormData();
                send.append("amount",value)
                send.append("name",globalName)
                send.append("symbol",globalSymbol)
                send.append("id",getRandomInt(1000000,10000000000))
                $.ajax({
                    url: "https://m2-network.000webhostapp.com/server/sell.php",
                    data: send,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (response) {
                        swal("Success!", "Order Placed!", "success");
                        //console.log(response)
                    }
                })
          });
    }
}
