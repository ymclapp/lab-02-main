// assist from Jean coding
//assist from mrsantons and mcbarnhart coding
'use strict';

const keywords = [];
let allHorns = [];
let templateId = '#photo-template';
// let newHorns = [];
const hornsFile1 = 'data/page-1.json';
const hornsFile2 = 'data/page-2.json';
let hornsFileUsed = '';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  // allHorns.push(this);
}

// Horn.prototype.render = function(container) {
//   let $container = $(container);
//   let $template = $container.find('#photo-template');
//   let $horn = $template.clone();
//   $horn.removeAttr('ID');
//   $horn.addClass('myHorns');
//   $horn.find('.horn-title').text(this.title);
//   $horn.find('.horn-image').attr('src',this.image_url);
//   $horn.find('.horn-description').text('Description:  ' + this.description);
//   // $horn.find('.horn-keyword').attr('value', this.keyword);
//   $container.append($horn);
//   dropDownRender(this);
// };

Horn.prototype.toHtml = function () {
  let template = $(templateId).html();
  let html = Mustache.render(template, this);
  dropDownRender(this);
  return html;
}

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


function toggleHorns (hornsFile) {
  console.log('calling horns');
  hornsFileUsed = hornsFile;
  allHorns = [];
  $.ajax(hornsFile, ajaxSettings)
    .then(function (data) {
      console.log(data);

      // const horn = data;
      data.forEach(horn => {
      // console.log(horn.title);
        let actualHorn = new Horn(horn);
        // console.log(actualHorn);
        // actualHorn.render('main');
        allHorns.push(actualHorn);
      });
      console.log(allHorns);

      allHorns.forEach(newHorns => {
        $('main').append(newHorns.toHtml());
      });
    });

}

toggleHorns(hornsFile1);

//toggle between pages

$(function() {
  $('.toggle').click(function(event) {
    event.preventDefault();
    $('main').empty();
    console.log(hornsFileUsed);
    if (hornsFileUsed === hornsFile1) {
      toggleHorns(hornsFile2);
      console.log(hornsFileUsed);

    } else if (hornsFileUsed === hornsFile2) {
      toggleHorns(hornsFile1);
    }
  });
});
