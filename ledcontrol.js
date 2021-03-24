$(document).ready(function (e) {
  client = new Paho.MQTT.Client(
    "mqtt.netpie.io",
    443,
    "e854adb9-abb5-4279-a926-acb06895ed52"
  );
  var options = {
    useSSL: true,
    userName: "NBntRnzovKo33kgong6roxpCMxTb1iVh",
    password: "AunWcLPKDaBM-HP$o0Xv6fEZy!vjKdlM",
    onSuccess: onConnect,
    onFailure: doFail,
  };
  client.connect(options);

  function onConnect() {
    $("#status").text("Connected").removeClass().addClass("connected");
    client.subscribe("@msg/led1");
    //client.subscribe("@shadow/led1")
    mqttSend("@msg/led1", "GET");
    console.log("Connected");
  }

  function doFail(e) {
    console.log(e);
  }

  client.onMessageArrived = function(message) {
    if (message.payloadString == "LEDON" || message.payloadString == "LEDOFF") {
        $("#led-on").attr("disabled", (message.payloadString == "LEDON" ? true : false));
        $("#led-off").attr("disabled", (message.payloadString == "LEDOFF" ? true : false));
    }

    out_msg = "Massage recesived : " + message.payloadString
    out = out_msg + " and message toppic recesived : " + message.destinationName 
    console.log(out)  

}

  $("#led-on").click(function (e) {
    mqttSend("@msg/led1", "on");
    document.getElementById("status-led").innerHTML = "LED is ON";
  });

  $("#led-off").click(function (e) {
    mqttSend("@msg/led1", "off");
    document.getElementById("status-led").innerHTML = "LED is OFF";
  });
});

var mqttSend = function (topic, msg) {
  var message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message);
};