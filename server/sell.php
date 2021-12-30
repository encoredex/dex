<?php
    $str = file_get_contents('orders.json');
    $json = json_decode($str, true);
    array_unshift($json ,[
        "name" => $_POST['name'],
        "symbol" => $_POST['symbol'],
        "inr" => 0.0,
        "quantity" => (float)$_POST['amount'],
        "price" => 0.0,
        "status" => "pending",
        "type" => "sell",
        "id" => (int)$_POST['id']
    ]);
    $put = json_encode($json);
    if (file_put_contents("orders.json", $put))
        echo "JSON file created successfully...";
    else 
        echo "Oops! Error creating json file...";
    var_dump( $json);
?>