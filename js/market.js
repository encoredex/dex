const Market = {
    show: function() {
        var html = `<div style="zoom:90%">`;
        for(market of Server.markets) {
            html += `
                <item class="marketSymbol" onClick="BuySell.show('${market.abbreviation}','${market.name}')"> 
                    <symbolicon style="background: url('https://media.wazirx.com/media/${market.abbreviation}/84.png');background-size: cover ;"></symbolicon>
                    <name>${market.name} <symbol>(${market.abbreviation})</symbol></name> 
                    <price class="price-${market.abbreviation}inr">₹0.00 &nbsp;<movement>+0.00%</movement></price>
                </item>`
        }
        html+="</div>"
        App.show(html)
        page = "mr"
    }
}