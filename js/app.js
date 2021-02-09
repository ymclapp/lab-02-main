'use strict';

console.log('Calling document.ready');

$(function() {
  console.log('Document is ready!');
});



function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.prototype.render = function(container) {
  let $container = $(container);
  let $template = $container.find('.horn-template');
  let $horn = $template.clone();
  $horn.removeClass('horn-template');
  $horn.find('.horn-title').text(this.title);
  $horn.find('img.horn-image').attr('src',this.image_url);
  $horn.find('.horn-description').text('Description:  ' + this.description);
  $horn.find('.horn-keyword').attr('value', this.keyword);
  $container.append($horn);
}

// var select = document.getElementsByClassName('horn-keyword');
// var list = this.keyword;
// $('.horn-keyword').empty();
// $.each(list, function (i, p) {
//   $('.horn-keyword').append($('<option></option>').val(p).html(p))
// });


// $('main section').hide();
const ajaxSettings = {
  method:  'get',
  dataType:  'json'
};




console.log('about to AJAX', ajaxSettings);
$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);
    const horn = data;
    horn.forEach(horn => {
      console.log(horn.title);
      let actualHorn = new Horn(horn);
      console.log(actualHorn);
      actualHorn.render('main section');
    })
  });
$('#bt').click(function () {
  var arr = 'data/page-1.json';

  $.getJSON(arr,function (data) {
    $.each(data, function (index, value) {
      $('#sel').append('<option value = " ' + value.ID + '">' + value.keyword + '</option>');
    });
  });
});


//Show selected value
$('#sel').change (function () {
  console.log('Selected Item:  ' + this.options[this.selectedIndex].text);
  let $this = $(this),
    filterValue = $this.val;
  console.log(filterValue);
});

// $('#bt').click(function () {
//   $('horn').toggleClass('on');
//   $('horn').show();
// });