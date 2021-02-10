// assist from Jean coding
'use strict';

// console.log('Calling document.ready');

// $(function() {
//   console.log('Document is ready!');
// });

const keywords = [];
const allHorns = [];
// const newHorns = [];

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);
}

Horn.prototype.render = function(container) {
  let $container = $(container);
  let $template = $container.find('#photo-template');
  let $horn = $template.clone();
  $horn.removeAttr('ID');
  $horn.addClass('myHorns');
  $horn.find('.horn-title').text(this.title);
  $horn.find('.horn-image').attr('src',this.image_url);
  $horn.find('.horn-description').text('Description:  ' + this.description);
  // $horn.find('.horn-keyword').attr('value', this.keyword);
  $container.append($horn);
  dropDownRender(this);
};

function dropDownRender(object) {
  let $select = $('.dropDown');
  let $optionTemp = $('.optionTemplate');
  let $option = $optionTemp.clone();
  $option.removeClass();
  $option.text(object.keyword);

  if(keywords.every(function (element){
    return element !== object.keyword;
  })) {
    keywords.push(object.keyword);
    $select.append($option);
  }
}

$(document).ready(function() {
  $('.dropDown').change (function() {
    let selectedKeyword = $(this).children('option:selected').text();
    console.log(selectedKeyword);
    let $oldHorns = $('.myHorns');
    $oldHorns.remove();
    allHorns.forEach(element => {
      if(element.keyword === selectedKeyword) {
        element.render('main');
      }
    })

  })
})




const ajaxSettings = {
  method:  'get',
  dataType:  'json'
};

// console.log('about to AJAX', ajaxSettings);

$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);

    // const horn = data;
    data.forEach(horn => {
      // console.log(horn.title);
      let actualHorn = new Horn(horn);
      // console.log(actualHorn);
      actualHorn.render('main');
    });
  });
// $('#bt').click(function () {
//   var arr = 'data/page-1.json';

//   $.getJSON(arr,function (data) {
//     $.each(data, function (index, value) {
//       $('#sel').append('<option value = " ' + value.ID + '">' + value.keyword + '</option>');
//     });
//   });
// });


// function selectHorn(filter) {
//   const selectAnimal = $('select');
//   const option = $('<option></option>').text(filter);
//   let showHorn = false;
//   selectAnimal.children().each(function() {
//     if (this.text === filter) {
//       showHorn === true;
//     }
//   });
//   if(showHorn) {
//     return;
//   }
//   selectAnimal.append(option);
// }

// document.getElementById('sel').addEventListener('change', refreshImages);

// function refreshImages() {
//   const keywordSelected = $('#sel option:selected').text();
//   let animals = $('[id="horn-template"]');
//   for( const animal of animals) {
//     if( $(animal).hasClass(keywordSelected)) {
//       $(animal).show();
//     } else {
//       $(animal).hide();
//     }
//   }
// }
