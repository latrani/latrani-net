$(function(){
  var cypher = "3ECC@NECwEhn.h5C",
      key = "RKBt1oiZTOQaI2Xwklc0fmDgsuCFHnPzYjEAeb6WNUy7348qMpVShdr9GJL5xv",
      plain = "", email = "";
  
  $.each(cypher, function(index, value){
    if (key.indexOf(value) === -1) {
      plain += value;
    } else {
      plain += key.charAt((key.indexOf(value) - (cypher.length + 7) + key.length) % key.length);
    }
  });
  
  email = '<a class="email" href="mailto:' + plain + '">' + plain + '</a>';
  $("#email").append(email);
});
