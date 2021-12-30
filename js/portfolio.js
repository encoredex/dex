const Portfolio = {
    getPortfolio: function() {
        obj = this;
        $.getJSON("https://m2-network.000webhostapp.com/server/portfolio.json?r="+getRandomInt(1000,100000), function(data) {
            portfolio = data;
        });
    },
    show: function() {
        var html = `
            <div style="zoom:90%">
            <assetvalue>₹0.00</assetvalue>
            <ttl>Total Portfolio Value</ttl>`;
        for(asset of portfolio.assets) {
            html += `
                <item class="portfolioItem" ${ (asset.symbol != 'inr')?`onClick="BuySell.show('${asset.symbol}','${asset.name}')"` : `` }> 
                    <symbolicon style="background: url('https://media.wazirx.com/media/${asset.symbol}/84.png');background-size: cover ;"></symbolicon>
                    <name>${asset.name} <symbol>(${asset.symbol})</symbol></name> 
                    <portfolioprice class="price-${asset.symbol}inrp"> ${asset.quantity} ${asset.symbol}&nbsp;<inrvalue>₹0.00</inrvalue></portfolioprice>
                </item>`
        }
        html+="</div>"
        App.show(html)
        page = "po"
    },
}
