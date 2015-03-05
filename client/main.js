'use strict';

$(document).ready(init);

var totalPosition = 0;
var totalAssets = 0;
var $update = $('#update');
var $sell = $('#sell');
var sum = 0;
// var clickVal = $('#cashin').val();
// var inp = parseFloat(clickVal);

function init() {
  $('#buy').click(getData);
  $('#addcash').click(function() {

    var clickVal = $('#cashin').val();
    var inp = parseFloat(clickVal);
    sum = inp + sum;
    if (!clickVal) {
      alert('Please add cash to your balance');
    } else {
    $('#sum').html('Balance is: $'+ sum);
    totalAssets = totalPosition + sum;
    $('#assets').html('Total Assets is: $' +totalAssets);
    }
  });
 }

function getData() {
  var input = $('#symbol').val();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+ input +'&callback=?';
  $.getJSON(url, function(data) {
    var $div = $('<div>');
    $div.addClass('answer');
    var share = $('#shares').val();
    var position = parseInt(data.LastPrice) * share;

    if (!input || !isNaN(input)) {
      alert('Please enter the right symbol');
    }  else if  (totalAssets < position) {
      alert('You need more money');
    }
    else {
      console.log('data', data);
      $('#sum').html('Balance is: $'+(sum -= position));

      var $show = $div.html('Symbol: ' + data.Symbol +'<br/>'+ 'Quote: ' + data.LastPrice +'<br/>' + share + ' shares'+'<br/>' + 'Position: $'+ position +'<br/>');
      $('#messages').append($show);

      $update = $("<input type='button' id='update' value='Update'/>");
      $sell = $("<input type='button' id='sell' value='Sell'/>");
      $show.append($update, $sell);

      totalPosition += position;
      $('#position').html('Total Position is: $' +totalPosition);

      totalAssets = totalPosition + sum;
      $('#assets').html('Total Assets is: $' +totalAssets);

      $update.click(function() {
          $.getJSON(url, function(data) {
          var $div = $('<div>');
          $div.addClass('answer');
          var share = $('#shares').val();
          var position = parseInt(data.LastPrice) * share;
          var $show = $div.html('Symbol: ' + data.Symbol +'<br/>'+ 'Quote: ' + data.LastPrice +'<br/>' + share + ' shares'+'<br/>' + 'Position: $'+ position +'<br/>');
          $('#messages').append($show);
          $update = $("<input type='button' id='update' value='Update'/>");
          $sell = $("<input type='button' id='sell' value='Sell'/>");
          $show.append($update, $sell);
          $show.remove();
          console.log(data.LastPrice);
        });
      });

      $sell.click(function() {
        console.log('sell pressed');
        $('#sum').html('Balance is: $'+ (sum += position));
        $('#position').html('Total Position is: $' + (totalPosition -= position));
        $show.remove();

      });
    }
  });
}
