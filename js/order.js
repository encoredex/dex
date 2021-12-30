const Orders = {
    getOrders: function() {
        obj = this;
        $.getJSON("https://m2-network.000webhostapp.com/server/orders.json?r="+getRandomInt(1000,100000), function(data) {
            orders = data;
            obj.show()
        });
    },
    show: function () {
        html = `<item class="profileValue">You can place multiple buy and sell orders for the same capital. Caplital will only be deducted from your balance when an order is completely executed. Any order exceeding the value of remaining capital will be autometically cancelled</item>`;
        for (order  of orders) {
            if (order.status != "complete") {
                if (order.type == "sell") {
                    html += `
                    <item class = "orderItem">
                        <symbolicon style="background: url('https://media.wazirx.com/media/${order.symbol}/84.png');background-size: cover ;height: 20px; width: 20px; top: 2px;"></symbolicon>
                        <name>${order.name} <symbol>(${order.symbol})</symbol></name> 
                        <otype>${(order.type == "buy")? `<g>${order.type}</g>` : `<r>${order.type}</r>`}</otype>
                        <odata>
                            <ohead>Quantity: </ohead>${order.quantity} ${order.symbol.toUpperCase()}<br>
                            <ohead>Status: </ohead>${order.status}
                        </odata>
                        <cancelOrder onClick="Orders.cancelOrder(${order.id})" h><i class="fa fa-close"></i> &nbsp; Cancel Order</cancelOrder>
                    </item>
                    `
                    continue
                }
                if (order.type == "buy") {
                    html += `
                    <item class = "orderItem">
                        <symbolicon style="background: url('https://media.wazirx.com/media/${order.symbol}/84.png');background-size: cover ;height: 20px; width: 20px; top: 2px;"></symbolicon>
                        <name>${order.name} <symbol>(${order.symbol})</symbol></name> 
                        <otype>${(order.type == "buy")? `<g>${order.type}</g>` : `<r>${order.type}</r>`}</otype>
                        <odata>
                            <ohead>Total: </ohead>₹${order.inr} <br>
                            <ohead>Status: </ohead>${order.status}
                        </odata>
                        <cancelOrder onClick="Orders.cancelOrder(${order.id})" h><i class="fa fa-close"></i> &nbsp; Cancel Order</cancelOrder>
                    </item>
                    `
                    continue
                }
            }
            html += `
            <item class = "orderItem">
                <symbolicon style="background: url('https://media.wazirx.com/media/${order.symbol}/84.png');background-size: cover ;height: 20px; width: 20px; top: 2px;"></symbolicon>
                <name>${order.name} <symbol>(${order.symbol})</symbol></name> 
                <otype>${(order.type == "buy")? `<g>${order.type}</g>` : `<r>${order.type}</r>`}</otype>
                <odata>
                    <ohead>At Price: </ohead>₹${order.price}<br>
                    <ohead>Quantity: </ohead>${order.quantity} ${order.symbol.toUpperCase()}<br>
                    <ohead>Total: </ohead>₹${order.inr} <br>
                    <ohead>Status: </ohead>${order.status}
                </odata>
            </item>
            `
        }
        App.show(html)
        page = "or"
    },
    cancelOrder: function(id) {
        swal({
            title: "Are you sure?",
            text: "This order will be cancelled",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var send = new FormData();
                send.append("id",id)
                $.ajax({
                    url: "server/cancel.php",
                    data: send,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (response) {
                        swal("Order Cancelled", {
                            icon: "success",
                        });
                        // console.log(response)
                        Orders.getOrders()
                    }
                })
            } else {
                
            }
          });
    }
}
