$(document).ready(function() {
    // console.log( 'haas jquery!!' );

    let catName = '';
    let mouseCount = 0;
    let catStory = '';
    let catData = [];
    let cardSizerUrl = './public/images/x-size.png';

    const rooms = [
      {
      'id': 0,
      'name': 'welcome!',
      'image': './public/images/0-title.png',
      'options': [{
        'str': '- click to start',
        'clickable': '<area class="id1" shape="rect" coords="0,0,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 1
      }],
      'status': ' ' //change script to something considering edge case 0
      },
      {
      'id': 1,
      'name': 'basement',
      'image': './public/images/1-basement.png',
      'options': [{
        'str':'- door -->',
        'clickable': '<area class="id2" shape="rect" coords="0,0,464,838" href="logsign.html" alt="alt" />',
        'linkto': 2,
      },{
        'str': '- ladder -->',
        'clickable': '<area class="id3" shape="rect" coords="696,0,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 3
      }],
      'status': '...thinking...'
      },
      {
      'id': 2,
      'name': 'utility',
      'image': './public/images/2-boiler.png',
      'options': [{
        'str': '- back <--',
        'clickable': '<area class="id1" shape="rect" coords="0,0,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 1
      }],
      'status': '...hunting...'
      },
      {
      'id': 3,
      'name': 'storage',
      'image': './public/images/3-storage.png',
      'options': [{
        'str': '- door -->',
        'clickable': '<area class="id4" shape="rect" coords="385,0,773,520" href="logsign.html" alt="alt" />',
        'linkto': 4
      },{
        'str': '- back <--',
        'clickable': '<area class="id1" shape="rect" coords="800,420,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 1
      }],
      'status': '...hunting...'
      },
      {
      'id': 4,
      'name': 'hallway',
      'image': './public/images/4-hallway.png',
      'options': [{
        'str': '- window -->',
        'clickable': '<area class="id6" shape="rect" coords="638,375,812,461" href="logsign.html" alt="alt" />',
        'linkto': 6
      },{
        'str': '- door1 -->',
        'clickable': '<area class="id7" shape="rect" coords="850,0,930,670" href="logsign.html" alt="alt" />',
        'linkto': 7
      },{
        'str': '- door2 -->',
        'clickable': '<area class="id5" shape="rect" coords="1044,0,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 5
      },{
        'str': '- back <--',
        'clickable': '<area class="id3" shape="rect" coords="0,755,1160,838" href="logsign.html" alt="alt" />',
        'linkto': 3
      }],
      'status': '...thinking...'
      },
      {
      'id': 5,
      'name': 'kitchen',
      'image': './public/images/5-kitchen.png',
      'options': [{
        'str': '- door back to hallway <--',
        'clickable': '<area class="id4" shape="rect" coords="0,0,290,838" href="logsign.html" alt="alt" />',
        'linkto': 4
      },{
        'str': '- door -->',
        'clickable': '<area class="id7" shape="rect" coords="630,0,870,838" href="logsign.html" alt="alt" />',
        'linkto': 7
      }],
      'status': '...eating...'
      },
      {
      'id': 6,
      'name': 'outdoors',
      'image': './public/images/6-outside.png',
      'options': [],
      'status': 'You lose!'
      },
      {
      'id': 7,
      'name': 'bedroom',
      'image': './public/images/7-bedroom.png',
      'options': [],
      'status': 'You win!'
      }
    ];

    //data
    //data
    //data
    //data

    let currentRoom = 0;
    //caching dom
    let DisplayUnit = $('#display-unit');
    let M = $('.message');
    let IMGdiv = $('.room-image');
    let STAT = $('.status');
    let OPTS = $('.options');
    let CATDAT = $('#cat-data');
    let areaMAP = $('#map');

    let userChoice = function(e) {
      changeState(e.data.room, e.data.option);
    };



    let updateDOM = function () {

      console.log('updateDOM called currentRoom '+currentRoom);

      if (currentRoom == 0) {
        let message = `${rooms[currentRoom]['name']}`;
        M.text(message);
      } else {
        let message = `You are in the ${rooms[currentRoom]['name']}.`;
        M.text(message);
      }

      let BGimageSource = `${rooms[currentRoom]['image']}`;
      IMGdiv.css('background-image', 'url('+BGimageSource+')');

      catData.push(currentRoom);
      let cdStr = catData.toString();
      console.log('interactions ' + cdStr);

      let status = `${rooms[currentRoom]['status']}`;

      STAT.text(status);

      OPTS.empty();
      areaMAP.empty();
      let optionsArr = rooms[currentRoom]['options'];
      optionsArr.forEach(function(option){

        let BUTT = $(`<div class='opt'>${option.str}</div>`);
        BUTT.click({room: currentRoom, option: option.linkto}, userChoice);
        OPTS.append(BUTT);

        let AREA = option.clickable;
        AREA += areaMAP.html();
        areaMAP.html(AREA);

        // area classes and their click functions... how to DRY this?
        $('.id1').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,1);
        });
        $('.id2').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,2);
        });
        $('.id3').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,3);
        });
        $('.id4').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,4);
        });
        $('.id5').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,5);
        });
        $('.id6').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,6);
        });
        $('.id7').on('click', function(e){
          e.preventDefault();
          changeState(currentRoom,7);
        });

      });

      CATDAT.val(cdStr);

    };
    updateDOM();

    let changeState = function(room,choice) {
      console.log('changeState called');
      currentRoom = choice;
      console.log('change of state ' + room + ' ' + choice);
      updateDOM();
      //updating the display-unit, currentRoom, and mouseCount
    };

});  //doc ready func
