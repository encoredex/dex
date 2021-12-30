<?php
    $str = file_get_contents('orders.json');
    $json = json_decode($str, true);
    $new_json = array();
    $entry_temp;
    foreach ($json as $entry) {
        if ($entry["id"] == $_POST["id"]) {
            $entry_temp = $entry;
        } else {
            array_push($new_json,$entry);
        }
    }
    $put = json_encode($new_json);
    
    var_dump( $new_json);
    if (file_put_contents("orders.json", $put))
        echo "JSON file created successfully...";
    else 
        echo "Oops! Error creating json file...";
?>