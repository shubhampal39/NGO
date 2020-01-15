var viewportWidth, viewportHeight, mapObject, countriesInfo, $patternDefs, highestNumber = 0, globalSettings= {};
var currentYear;
var mobile;
var selectedShareInfo = share_info[0];
var shareSlider;
var onMouseWheelTimer;
var maxMouseWheel = 1000;
var lastSliderWidth = 'none';

var mouseWheelInfo = {
    prevTime    :new Date().getTime(), 
    lastDelta   :0,
    twoLastDelta:0
};
globalSettings.initalized = false;
globalSettings.timelineInitialized = false;

$(document).ready(function(){
                              mobile =
                                isMobile.any() ||
                                $(window).width() <=
                                  1024;
                              globalSettings.mobile = mobile;

                              $(".scrolling").each(
                                function(i, item) {
                                  var div = $(
                                    '<div class="scrolling-container section_' +
                                      $(item).attr(
                                        "id"
                                      ) +
                                      '">' +
                                      $(
                                        item
                                      ).html() +
                                      "</div>"
                                  );
                                  $(item)
                                    .html("")
                                    .append(div);

                                  var slidesNumber = $(
                                    item
                                  ).data(
                                    "scrolling-slides"
                                  )
                                    ? $(item).data(
                                        "scrolling-slides"
                                      )
                                    : 1;
                                  $(item).height(
                                    viewportHeight *
                                      slidesNumber
                                  );
                                }
                              );

                              globalSettings.totalItems = $(
                                ".container-years ul li a"
                              ).length;

                              globalSettings.yearSelected = function(
                                year
                              ) {
                                currentYear = year;
                                seeYear(
                                  currentYear
                                );
                              };
                              globalSettings.indexSelected = function(
                                n,
                                forceScroll
                              ) {
                                if (
                                  $(
                                    '.part-a li a[data-index="' +
                                      n +
                                      '"]'
                                  ).length
                                ) {
                                  $currentItem = $(
                                    '.part-a li a[data-index="' +
                                      n +
                                      '"]'
                                  );
                                  if (
                                    $currentItem
                                  ) {
                                    if (
                                      $currentItem.data(
                                        "events"
                                      )
                                    ) {
                                      $link = $currentItem.attr(
                                        "href"
                                      );
                                      $eventsGroup = $(
                                        '.event-group[data-year="' +
                                          $link.substring(
                                            1,
                                            $link.length
                                          ) +
                                          '"]'
                                      );
                                      $animationTime = 0;

                                      if (
                                        $(
                                          ".last-event"
                                        ).length
                                      ) {
                                        $lastEvent = $(
                                          ".last-event"
                                        );
                                        if (
                                          $lastEvent.data(
                                            "year"
                                          ) !=
                                          $eventsGroup.data(
                                            "year"
                                          )
                                        ) {
                                          $lastEvent.css(
                                            {
                                              opacity: 0
                                            }
                                          );
                                          $eventsGroup.css(
                                            {
                                              display:
                                                "none"
                                            }
                                          );
                                          $lastEvent.removeClass(
                                            "last-event"
                                          );
                                          setTimeout(
                                            function() {
                                              $lastEvent.removeAttr(
                                                "style"
                                              );
                                            },
                                            250
                                          );
                                          $animationTime = 250;
                                        }
                                      }

                                      setTimeout(
                                        function() {
                                          $(
                                            ".last-event"
                                          ).removeAttr(
                                            "style"
                                          );
                                          $eventsGroup.addClass(
                                            "last-event"
                                          );
                                          $eventsGroup.css(
                                            {
                                              display:
                                                "table-cell"
                                            }
                                          );
                                          setTimeout(
                                            function() {
                                              $eventsGroup.css(
                                                {
                                                  opacity: 1
                                                }
                                              );
                                            },
                                            60
                                          );
                                        },
                                        $animationTime
                                      );
                                      $(
                                        ".events-title"
                                      ).removeClass(
                                        "hidden-title"
                                      );
                                    } else {
                                      $lastEvent = $(
                                        ".last-event"
                                      );
                                      $lastEvent.css(
                                        {
                                          opacity: 0
                                        }
                                      );
                                      $eventsGroup.css(
                                        {
                                          display:
                                            "none"
                                        }
                                      );
                                      $lastEvent.removeClass(
                                        "last-event"
                                      );
                                      setTimeout(
                                        function() {
                                          $lastEvent.removeAttr(
                                            "style"
                                          );
                                        },
                                        250
                                      );
                                      $(
                                        ".events-title"
                                      ).addClass(
                                        "hidden-title"
                                      );
                                    }
                                  }

                                  $lives = $currentItem.data(
                                    "lives"
                                  );
                                  $nets = $currentItem.data(
                                    "nets"
                                  );
                                  $averted = $currentItem.data(
                                    "averted"
                                  );

                                  if (
                                    !globalSettings.mobile
                                  ) {
                                    if (
                                      globalSettings.initalized
                                    ) {
                                      var sT = $(
                                        document
                                      ).scrollTop();
                                      viewportHeight;
                                      if (
                                        (sT >
                                          $(
                                            "#timeline"
                                          ).position()
                                            .top &&
                                          sT <
                                            $(
                                              "#timeline"
                                            ).position()
                                              .top +
                                              $(
                                                "#timeline"
                                              ).height() -
                                              viewportHeight) ||
                                        forceScroll
                                      ) {
                                        $(
                                          "body"
                                        ).scrollTop(
                                          $(
                                            "#timeline"
                                          ).position()
                                            .top +
                                            200 *
                                              (n +
                                                0.5)
                                        );
                                      }
                                    }

                                    $netsWidth = $nets;
                                    $livesWidth = $lives;
                                    $avertedWidth = $averted;

                                    if (
                                      isNaN(
                                        $netsWidth
                                      )
                                    ) {
                                      if (
                                        $nets ==
                                        "Low Coverage"
                                      ) {
                                        $netsWidth = 0;
                                      }
                                    }
                                    if (
                                      isNaN($lives)
                                    ) {
                                      if (
                                        $lives ==
                                        "Under 20,000"
                                      ) {
                                        $livesWidth = 20000;
                                      } else if (
                                        $lives ==
                                        "Over 4 million"
                                      ) {
                                        $livesWidth = 4000000;
                                      }
                                    }
                                    if (
                                      isNaN(
                                        $avertedWidth
                                      )
                                    ) {
                                      if (
                                        $averted ==
                                        "Under 1,000,000"
                                      ) {
                                        $avertedWidth = 1000000;
                                      } else if (
                                        $averted ==
                                        "Over 500 million"
                                      ) {
                                        $avertedWidth = 500000000;
                                      }
                                    }

                                    var minWidth = 190;

                                    $(
                                      ".blue h2"
                                    ).css({
                                      width:
                                        minWidth +
                                        ((500 -
                                          minWidth) *
                                          $netsWidth) /
                                          1000000000
                                    });
                                    $(
                                      ".yellow h2"
                                    ).css({
                                      width:
                                        minWidth +
                                        ((350 -
                                          minWidth) *
                                          $livesWidth) /
                                          4000000
                                    });
                                    $(
                                      ".green h2"
                                    ).css({
                                      width:
                                        minWidth +
                                        ((350 -
                                          minWidth) *
                                          $avertedWidth) /
                                          500000000
                                    });
                                  }

                                  $(
                                    "#nets"
                                  ).animateNumber(
                                    $nets
                                  );
                                  $(
                                    "#lives"
                                  ).animateNumber(
                                    $lives
                                  );
                                  $(
                                    "#averted"
                                  ).animateNumber(
                                    $averted
                                  );
                                }
                              };

                              $(
                                ".container-years ul"
                              ).yearsNav({
                                indexSelected:
                                  globalSettings.indexSelected,
                                yearSelected:
                                  globalSettings.yearSelected
                              });
                              onResizeFunction();

                              /*$(document).on("scrollstop",function(){
        if(lastTimeout){
            clearInterval(lastTimeout);
        }
        lastTimeout = setTimeout(onScrollStopFunction, 150);
    });*/

                              //$("html, body").scroll(parallaxEffect);

                              $(
                                ".fancybox-media"
                              ).fancybox({
                                width: 1280,
                                height: 720,
                                aspectRatio: true
                              });

                            //   var s = Snap("#map");
                            //   Snap.load(
                            //     "assets/africa-map.svg",
                            //     function(f) {
                            //       mapObject = f;
                            //       s.append(
                            //         mapObject
                            //       );
                            //       seeYear(
                            //         currentYear
                            //       );
                            //     }
                            //   );

                              $(
                                ".container-btn-skip a"
                              ).click(function(e) {
                                $("body").animate(
                                  {
                                    scrollTop: $(
                                      "#result"
                                    ).position().top
                                  },
                                  400,
                                  "easeInOutCubic"
                                );
                                e.preventDefault();
                              });
                //               $.getJSON(
                //                 "assets/countries_info.json",
                //                 function(data) {
                //                   countriesInfo = data;
                //                   var accumulativeData = {};
                //                   for (var num in countriesInfo.info) {
                //                     for (var country in countriesInfo
                //                       .info[num]
                //                       .countries) {
                //                       if (
                //                         accumulativeData[
                //                           country
                //                         ]
                //                       ) {
                //                         accumulativeData[
                //                           country
                //                         ] +=
                //                           countriesInfo.info[
                //                             num
                //                           ].countries[
                //                             country
                //                           ];
                //                       } else {
                //                         accumulativeData[
                //                           country
                //                         ] =
                //                           countriesInfo.info[
                //                             num
                //                           ].countries[
                //                             country
                //                           ];
                //                       }
                //                       countriesInfo.info[
                //                         num
                //                       ].countries[
                //                         country
                //                       ] =
                //                         accumulativeData[
                //                           country
                //                         ];
                //                       /*if(data.info[num].countries[country] > highestNumber){
                //     highestNumber = data.info[num].countries[country];
                // }*/
                //                     }
                //                   }

                //                   seeYear(
                //                     currentYear
                //                   );
                //                 }
                //               ).fail(function(
                //                 jqxhr,
                //                 textStatus,
                //                 error
                //               ) {
                //                 var err =
                //                   textStatus +
                //                   ", " +
                //                   error;
                //               });

                              // iMAGES TEXTURES
                              /*$patternDefs = "<defs>";
    for(var i=1;i<11;i++){
        w = 8+((i-1)*2);
        h = 8+((i-3)*2);
        
        $patternDefs += '<pattern id="pat_'+i+'" patternUnits="userSpaceOnUse" width="'+w+'" height="'+h+'">';
        //$patternDefs += '<image xlink:href="images/pattern_'+i+'.png" x="0" y="0" width="'+w+'" height="'+h+'" />'
        
        $patternDefs += '<rect x="0" y="0" width="'+w+'" height="'+h+'" style="stroke:none; fill: #F6CC40"/>';
        $patternDefs += '<circle cx="2" cy="2" r="2" style="stroke: none; fill: #e8a61e" />';
        $patternDefs += '<circle cx="'+(4+(i-1)+2)+'" cy="'+(4+(i-3)+2)+'" r="2" style="stroke: none; fill: #e8a61e" />';
        $patternDefs += '<circle cx="'+(4+(i-1)+2)+'" cy="'+(-h+(4+(i-3)+2))+'" r="2" style="stroke: none; fill: #e8a61e" />';
        
        $patternDefs += '</pattern>';
    }
    $patternDefs += '</defs>';
    
    $('#map').find('defs').remove();
    $('#map').html($('#map').html()+$patternDefs);*/

                              /* **********************************************
                               * GALLERY: Content Selector
                               * **********************************************
                               */

                              $(
                                ".gallery ul li a"
                              ).click(function(e) {
                                $(
                                  ".gallery ul li.selected"
                                ).removeClass(
                                  "selected"
                                );
                                $(this)
                                  .closest("li")
                                  .addClass(
                                    "selected"
                                  );

                                var slide = $(
                                  this
                                ).data("slide");
                                shareSlider.goToSlide(
                                  slide
                                );
                                e.preventDefault();
                              });

                              createContentSelectorSlider();

                              /* **********************************************
                               * TWITTER SHARE: based on content selected.
                               * **********************************************
                               */

                              $(
                                ".twitter-share"
                              ).click(function(e) {
                                e.preventDefault();
                                $(
                                  ".form-loader"
                                ).hide();
                                $(
                                  ".twitt-confirm"
                                ).hide();
                                $(
                                  "#twitt-compose-form"
                                ).show();

                                $(
                                  "#twitt-body"
                                ).val(
                                  selectedShareInfo.tweet +
                                    " " +
                                    global_info.malaria_defeat_url
                                );
                                $(
                                  ".attached-image"
                                ).html(
                                  '<img src="' +
                                    selectedShareInfo.image +
                                    '"/>'
                                );

                                $(
                                  "#twittpic-popup-outer"
                                ).bPopup({
                                  position: [
                                    "auto",
                                    "auto"
                                  ],
                                  closeClass:
                                    "close1"
                                });
                              });
                              $(
                                ".twitt-compose button"
                              ).click(function(e) {
                                e.preventDefault();
                                $(
                                  "#twitt-compose-form"
                                ).hide();
                                $(
                                  ".twitt-compose .form-loader"
                                ).css({
                                  display:
                                    "inline-block"
                                });

                                tweetWindow = window.open(
                                  global_info.root_url +
                                    "lib/vendors/tweet.php?image=" +
                                    encodeURIComponent(
                                      selectedShareInfo.image
                                    ) +
                                    "&text=" +
                                    encodeURIComponent(
                                      $(
                                        '[name="twitt-body"]'
                                      ).val()
                                    ),
                                  "_blank",
                                  "location=yes,height=570,width=520,scrollbars=yes,status=yes"
                                );
                              });

                              $(
                                ".twitter-slider"
                              ).cycle();

                              /* **********************************************
    * REAL TWEETS FROM HASHTAG 
    * **********************************************
    
    
    $.getJSON("lib/vendors/twitter/getTweets.php", function(data){
        
        for(var i=0;i<data.length;i++){
            $tweet = data[i];
                       
            var tweet_text = $tweet.text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$1" target="_blank">$1</a>');
            tweet_text = tweet_text.replace(/([^&])#([a-zA-Z0-9]+)/g, '<a href="https://twitter.com/search?q=%23$2" target="_blank"> #$2 </a>');
            tweet_text = tweet_text.replace(/([^&])@([a-zA-Z0-9]+)/g, '<a href="https://twitter.com/$2" target="_blank">@$2</a>');
                  
            $tweet_str = $('.main-tweeting.template').applyTemplate({
                tweet_user_image: $tweet.user_image.split('_normal').join(''),
                tweet_user_url: 'https://twitter.com/'+$tweet.user_displayname,
                tweet_user_name: $tweet.user_displayname,
                tweet_content: tweet_text
            }, true);
            
            $('.twitter-slider').cycle('add', $tweet_str);
        }     
        
        $('.main-tweeting.template').remove();
    });
    */
                              /* **********************************************
                               * EVENTS MODAL BOXES (used only on mobile)
                               * **********************************************
                               */

                              $(
                                ".event-group"
                              ).each(function(
                                i,
                                item
                              ) {
                                var year = $(
                                  item
                                ).data("year");
                                $(item)
                                  .find(".event")
                                  .each(function(
                                    j,
                                    s_item
                                  ) {
                                    var id =
                                      "modal_" +
                                      year +
                                      "_" +
                                      j;
                                    var modal = $(
                                      '<div class="modalbox ' +
                                        id +
                                        '" id="' +
                                        id +
                                        '"></div>'
                                    );
                                    var $html =
                                      '<a class="close-modal" href="#"><i class="fa fa-times"></i></a>' +
                                      jQuery("<p>")
                                        .append(
                                          $(s_item)
                                            .eq(0)
                                            .clone()
                                        )
                                        .html();
                                    modal.html(
                                      $html
                                    );

                                    $(
                                      ".events-modalboxes"
                                    ).append(modal);

                                    $(s_item)
                                      .data(
                                        "modal-id",
                                        id
                                      )
                                      .click(
                                        showEventModal
                                      );
                                  });
                              });

                              $("#open-nav").click(
                                function(e) {
                                  $(
                                    ".fixed-nav"
                                  ).addClass(
                                    "expanded"
                                  );
                                  $("section").bind(
                                    "click",
                                    closeFixedNav
                                  );

                                  e.preventDefault();
                                }
                              );
                              $("#close-nav").click(
                                function(e) {
                                  closeFixedNav();

                                  e.preventDefault();
                                }
                              );
                              $(
                                ".nav-items ul li a, .footer-menu ul li a, #home-link"
                              ).click(function(e) {
                                var sectionId = $(
                                  this
                                ).attr("href");
                                if (
                                  sectionId ==
                                    "#home" ||
                                  sectionId ==
                                    "#recipient"
                                ) {
                                  globalSettings.selectedIndex = 0;
                                  $(
                                    ".container-years .years-nav"
                                  ).yearsNav(
                                    "setIndex",
                                    globalSettings.selectedIndex
                                  );
                                  $(
                                    ".container-years .years-nav"
                                  ).yearsNav(
                                    "updateView"
                                  );
                                } else if (
                                  sectionId ==
                                  "#timeline"
                                ) {
                                  //do nothing
                                } else {
                                  globalSettings.selectedIndex =
                                    $(".part-a li")
                                      .length - 1;
                                  $(
                                    ".container-years .years-nav"
                                  ).yearsNav(
                                    "setIndex",
                                    globalSettings.selectedIndex
                                  );
                                  $(
                                    ".container-years .years-nav"
                                  ).yearsNav(
                                    "updateView"
                                  );
                                }
                                if (
                                  sectionId !=
                                  "#timeline"
                                ) {
                                  anchorsHandler();
                                  $(
                                    ".container-timeline"
                                  ).css({
                                    position:
                                      "relative",
                                    top: "inherit",
                                    bottom:
                                      "inherit"
                                  });
                                  $(
                                    ".social-share"
                                  ).css("top", "");
                                  disableMouseSteps();
                                }
                                var parent = $(
                                  sectionId
                                ).closest(
                                  "section"
                                );
                                var parentExtra =
                                  parent.attr(
                                    "id"
                                  ) !=
                                  $(sectionId).attr(
                                    "id"
                                  )
                                    ? parent.position()
                                        .top
                                    : 0;

                                if (
                                  sectionId ==
                                  "#take-action"
                                ) {
                                  parentExtra =
                                    parent.position()
                                      .top +
                                    $(
                                      ".hero-story-slides-container"
                                    ).height() -
                                    $(
                                      sectionId
                                    ).position()
                                      .top;
                                  setTimeout(
                                    function() {
                                      $(
                                        ".container-timeline"
                                      ).css({
                                        position:
                                          "relative",
                                        top:
                                          "inherit",
                                        bottom:
                                          "inherit"
                                      });
                                      $(
                                        ".container-cases-averted"
                                      ).css({
                                        position:
                                          "relative",
                                        top:
                                          "inherit",
                                        bottom:
                                          "inherit"
                                      });
                                    },
                                    250
                                  );
                                }

                                $(
                                  "body,html"
                                ).animate({
                                  scrollTop:
                                    $(
                                      sectionId
                                    ).position()
                                      .top +
                                    parentExtra
                                });

                                closeFixedNav();

                                e.preventDefault();
                              });

                              /* **********************************************
                               * TIMLINE: Handling the User friendly navigation for mobile.
                               * **********************************************
                               */

                              if (mobile) {
                                $("#timeline").bind(
                                  "touchstart MSPointerDown pointerdown",
                                  onTouchStart
                                );
                              }
                            });
var timelineObj = { touch: {start:{x:0, y:0}}};
function onTouchStart(e){
    
    var orig = e.originalEvent;
    var touchPoints = (typeof orig.changedTouches != 'undefined') ? orig.changedTouches : [orig];
    
    timelineObj.touch.start.x = touchPoints[0].pageX;
    timelineObj.touch.start.y = touchPoints[0].pageY;
                                
    $('#timeline').bind('touchmove MSPointerMove pointermove', onTouchMove);
    $('#timeline').bind('touchend MSPointerUp pointerup', onTouchEnd);
    $('#timeline').bind('MSPointerCancel pointercancel', onPointerCancel);
}
function onTouchMove(e){
    var orig = e.originalEvent;
    var touchPoints = (typeof orig.changedTouches != 'undefined') ? orig.changedTouches : [orig];
    var xMovement = touchPoints[0].pageX - timelineObj.touch.start.x;
    var yMovement = Math.abs(touchPoints[0].pageY - timelineObj.touch.start.y);
    
    
    $('.container-years .years-nav').yearsNav('continuosMovement', xMovement);
}
function onTouchEnd(e){
    $('.container-years .years-nav').yearsNav('deducePosition');
}
function onPointerCancel(e){
    $('#timeline').unbind('MSPointerCancel pointercancel', onPointerCancel);
    $('#timeline').unbind('touchmove MSPointerMove pointermove', onTouchMove);
    $('#timeline').unbind('touchend MSPointerUp pointerup', onTouchEnd);
}

function closeFixedNav(){
    $('.fixed-nav').removeClass('expanded'); 
    $('section').unbind('click');
}
function createContentSelectorSlider(){
    
    var windowWidht = $(window).width();
    var params = {
        onSlideBefore: onSlideSelected,
    };
    
    
        if( windowWidht <= 991){
            slideWidth = windowWidht>768 ? 728 : (windowWidht>480 ? 460 : 280);
        } else {
            slideWidth = '100%';
        }
        
        if( lastSliderWidth != slideWidth ){
            
            if(shareSlider){
                shareSlider.destroySlider();
            }
            if(slideWidth!='100%'){
                params.slideWidth   = slideWidth;
                params.maxSlides    = 3;
                params.slideMargin  = 5;
                lastSliderWidth = slideWidth;
            }
            
            shareSlider = $('.bxslider').bxSlider(params);
            lastSliderWidth = slideWidth;
        }
   
}
/* **********************************************
* SHOW EVENT MODAL ON CLICK
* **********************************************
*/
function showEventModal(){
    if(globalSettings.mobile){
        var modalId = $(this).data('modal-id');
        $('#'+modalId).bPopup({
            closeClass : 'close-modal',
        });
    }
}
function successTweet(){
    
    $('.form-loader').hide();
    $('.twitt-confirm').show();
}
function failedTweet($msg){
    
    $('.form-loader').hide();
    $('#twitt-compose-form').show();
}
var tweetWindow;
$( window ).load(function() {
    
    // VIDEO TAG
    $('.video-tag').each(function(){
        $innerHTML = '';
        if(!mobile){
            $innerHTML = '<video width="100%" height="100%" autoplay="true" loop="loop" poster="'+$(this).data('poster')+'">';
            $innerHTML += '<source src="'+$(this).data('mp4')+'" type="video/mp4">';
            $innerHTML += '<source src="'+$(this).data('ogg')+'" type="video/ogg">';
            $innerHTML += '<source src="'+$(this).data('webm')+'" type="video/webm">';
            $innerHTML += '</video>';
        } else {
            /*$innerHTML = '<div class="video-poster" style="background-image:url('+$(this).data('poster')+')"></div>';
            imgSrc = $(this).data('poster');*/
        }
        $(this).append($innerHTML);
    });

    $(window).resize();
    
    $('.home-loading').removeClass('home-loading');
    
    globalSettings.initalized = true;
});
var lastTimeout;


    $(window).resize(onResizeFunction);
    $(document).scroll(onScrollFunction);


function onResizeFunction(){
    viewportWidth = $(window).width();
    viewportHeight = $(window).height();
    
    mobile = isMobile.any() || $(window).width()<=1024;
    globalSettings.mobile = mobile;
    
    if(!mobile){
    
        $('.scrolling-container').each(function(i,item){
            $(item).css({width:viewportWidth, height:viewportHeight});
        });

        /* **********************************************
         * HOME
         * **********************************************
         */ 

        var heroBgSize = imageInside({containerWidth: viewportWidth, containerHeight:viewportHeight, imageWidth:1200, imageHeight:588});
        $('.home-hero-bg').css({backgroundSize:heroBgSize.width+'px '+(heroBgSize.height*(650/588))+'px'});
        $('.hero-path-mask').remove();

        
        maskObject( $('.home-hero-bg'), {x:0, y:0, type:'shape', shape:[
                {x:0, y:0},
                {x:viewportWidth, y:0},
                {x:viewportWidth, y:viewportHeight},
                {x:viewportWidth/2, y:viewportHeight+50},
                {x:0, y:viewportHeight},
        ]});


        if($('.hero-first-title').data('init-top')){} else {
            $('.hero-first-title').attr('data-init-top', $('.hero-first-title').position().top);
            $('.hero-second-title').attr('data-init-top', $('.hero-second-title').position().top);
            $('.container-hero p').attr('data-init-top', $('.container-hero p').position().top);
        }

        /* **********************************************
         * RECIPIENT
         * **********************************************
         */ 

        var recipientBgSize = imageInside({containerWidth: viewportWidth, containerHeight:viewportHeight, imageWidth:1200, imageHeight:464});
        var videoBgSize = imageInside({containerWidth: viewportWidth, containerHeight:viewportHeight, imageWidth:1280, imageHeight:720});
        $('.video-background').css({width:videoBgSize.width, height:videoBgSize.height, left:videoBgSize.left, top:videoBgSize.top})
        //$('.section_recipient').css({backgroundSize:recipientBgSize.width+'px '+recipientBgSize.height+'px'});

        /* **********************************************
         * TIMELINE
         * **********************************************
         */

        $('.container-timeline').css({width:viewportWidth, height:viewportHeight});
        
        var timelineBgSize = imageInside({containerWidth: $('.container-timeline').width(), containerHeight:$('.container-timeline').height(), imageWidth:1200, imageHeight:1348});
        $('.container-timeline').css('background-size', timelineBgSize.width+'px '+timelineBgSize.height+'px');
        
        $('.scrolling-container.section_timeline').css({height:viewportHeight+($('.part-a li').length)*200});
        $('.event-group').each(function(){
            var index = $(this).data('year')-2000;
            
           
           
           var yearHeight = jQuery('.part-a li a').height();
           var partAHeight = index*yearHeight;
                    
           var selectedYearHeight = jQuery('.part-b li a').height();
           var selectedYearWidth = jQuery('.part-b').width()+21;
           var paddingRight = 35;
           
           var yearsTop = (viewportHeight-(($('.part-a a').length-1)*yearHeight + selectedYearHeight ))/2;
           var centerPoint = {
               x: selectedYearWidth,
               y: yearsTop+partAHeight+ (selectedYearHeight/2)
           };
           var rootEventPoint = {
               x: selectedYearWidth+paddingRight,
               y: yearsTop+index*yearHeight+yearHeight/2,
           };
           
           
           var totalEvents = $(this).find('.event').length;
           var eventHeight  = 348;
           if(viewportWidth<1400){
               eventHeight = 300;
           }
           var eventsTop = (viewportHeight-eventHeight*totalEvents)/2;
           var origAng = 90+(((totalEvents-1)*60)/2);
           var hyp = paddingRight;
           
           
           $(this).find('.event').each(function(i, item){
               
               var interestArea = 268;
               var eventPadding = 40;
               var interestAreaWidth = 396;
               var lineCenterOffset = 174;
               
               if(viewportWidth<1400){
                   interestArea = 204;
                   interestAreaWidth = 300;
                   lineCenterOffset = 142;
               }
               
               var eventTop = eventsTop+(eventHeight*i)+eventPadding+interestArea/2;
               
                    var ang = origAng-60*i;
                    var t = hyp*Math.cos(ang*(Math.PI/180));
                    var r = hyp*Math.sin(ang*(Math.PI/180));
                    
               var eventPoint = {
                   x: 220+11+ (interestAreaWidth/2),
                   y: eventTop
               }
               
               var xdist = eventPoint.x-(centerPoint.x+r);
               var ydist = eventPoint.y-(centerPoint.y+t);
               var line_hyp = Math.sqrt(Math.pow(xdist,2)+Math.pow(ydist,2));
               var line_rotation = 90-Math.atan2(xdist, ydist)*(180/Math.PI);
               
               var lineLeft = (line_hyp/2)*Math.cos((line_rotation)*(Math.PI/180))-(line_hyp/2);
               var lineTop = (line_hyp/2)*Math.sin((line_rotation)*(Math.PI/180));
               
               
               if(ydist>=0){
                    $(item).find('.year-box').css({width:xdist, height:ydist});
                    $(item).find('.event-line').css({width:line_hyp, left:lineLeft, top:lineTop});
                } else {
                    $(item).find('.year-box').css({width:xdist, height:Math.abs(ydist), marginBottom:ydist-lineCenterOffset});
                    $(item).find('.event-line').css({width:line_hyp, left:lineLeft, top:-lineTop});
                }
                
                $(item).find('.event-line').css('transform', 'rotate('+(line_rotation)+'deg)');
           });
        });
        if(!globalSettings.timelineInitialized){
            var sT = $(document).scrollTop();
            $currentIndex = 0;
            if( sT <= ($('#timeline').height()+$('#timeline').position().top)){
                if(sT>=$('#timeline').position().top){
                    var timelineProgress = (sT-$('#timeline').position().top)/($('#timeline').height()-viewportHeight);               
                    if(timelineProgress>0 && timelineProgress<=1){
                        $currentPos = timelineProgress*$('.part-a li').length;
                        $currentIndex = Math.floor($currentPos);
                        
                    }
                } 
            } else {
                $currentIndex = $('.part-a li').length-1;
            }
            if(sT>=$('#timeline').position().to && sT <= ($('#timeline').height()+$('#timeline').position().top-viewportHeight)){
                $currentIndex = $('.part-a li').length-1;
            }

            $('.container-years .years-nav').yearsNav('setIndex', $currentIndex, false);
            
            globalSettings.timelineInitialized = true;
        }
         /* **********************************************
         * DEFEAT
         * **********************************************
         */

        $('.container-cases-averted').css({width:viewportWidth, height:viewportHeight});
        $('.scrolling-container.section_result').css({height:viewportHeight+($('.sliders-container .slide').length)*viewportHeight});
        
        /* **********************************************
         * DEFEAT
         * **********************************************
         */
        //$('.story-hero').css({width:viewportWidth, height:viewportHeight});
        
        var storySlideHeight = 700;
        $('#defeat-malaria').css({width:viewportWidth, height:$('.container-gallery-share').height()+storySlideHeight*$('.hero-story-slide').length});
        $('.hero-story-slide').css({width:viewportWidth, height:storySlideHeight});
        $('.story-hero').css({width:viewportWidth, height:viewportHeight});
        
        var shareIconsSize = imageInside({containerWidth: $('.container-gallery-share').width(), containerHeight:$('.container-gallery-share').height(), imageWidth:1200, imageHeight:1008});
        $('.container-shares').css('background-size', shareIconsSize.width+"px "+shareIconsSize.height+"px, "+shareIconsSize.width+"px "+shareIconsSize.height+"px, 100% 100%");
        
        /* **********************************************
         * TWEETS
         * **********************************************
         */
        var tweetingBgSize = imageInside({containerWidth: viewportWidth, containerHeight:viewportHeight, imageWidth:1200, imageHeight:400});
        $('.container-tweeting').css({backgroundSize:tweetingBgSize.width+'px '+tweetingBgSize.height+'px'});
        
        
    } else {
        
        /* **********************************************
         * GENERAL
         * **********************************************
         */
        
        $('.scrolling-container').css('width','').css('height','');
        
        /* **********************************************
         * HERO
         * **********************************************
         */
        var sectionHeight = $('.home-hero-bg').height()+18;
        maskObject( $('.home-hero-bg'), {x:0, y:0, type:'shape', shape:[
                {x:0, y:0},
                {x:viewportWidth, y:0},
                {x:viewportWidth, y:sectionHeight-20},
                {x:viewportWidth/2, y:sectionHeight},
                {x:0, y:sectionHeight-20},
        ]});
        
        /* **********************************************
         * TIMELINE
         * **********************************************
         */
        $('.container-timeline').css('width','').css('height','').css('position','').css('top','').css('bottom','');
        var timelineBgSize = imageInside({containerWidth: $('.container-timeline').width(), containerHeight:$('.container-timeline').height(), imageWidth:1200, imageHeight:1348});
        $('.container-timeline').css('background-size', timelineBgSize.width+'px '+timelineBgSize.height+'px');
        $('.container-data h2').css('width','');
        
        disableMouseSteps();
        
        /* **********************************************
         * AVERTED
         * **********************************************
         */
        
        $('.container-cases-averted').css('width','').css('height','').css('position','').css('top','');
        
        
        /* **********************************************
         * DEFEAT
         * **********************************************
         */
        
        $('#defeat-malaria, .story-hero, .hero-story-slide').css('width','').css('height','');
        $('.hero-paragraph, .hero-popup').css('top','');
        
        /* **********************************************
         * SOCIAL SHARE
         * **********************************************
         */
        
        createContentSelectorSlider();
        
        
        
    }
    
    /* **********************************************
    * TIMELINE
    * **********************************************
    */
   
    if(globalSettings.selectedIndex>=$('.part-a li').length){
        globalSettings.selectedIndex = $('.part-a li').length-1;
    }
        
    $('.container-years .years-nav').yearsNav('updateView');
}
mouseWheelInfo.lastTenPoints = [];
/*$debug = $('<div class="debugger"></div>');
for(i=0;i<200;i++){
    $debug.append('<div class="bar_'+i+' debug_bar"><div class="fill"></div></div>');
}
$('html').append($debug);*/

function bindMouseWheel(event,delta,nbr){
        //onMouseWheelFunction();
        /*var curTime = new Date().getTime();
        if(typeof mouseWheelInfo.prevTime !== 'undefined'){
            var timeDiff = curTime-mouseWheelInfo.prevTime;
            
            var inflexPoint = false;
            if( mouseWheelInfo.lastTenPoints.length>3){
                var pointA = mouseWheelInfo.lastTenPoints[mouseWheelInfo.lastTenPoints.length-1];
                var pointB = mouseWheelInfo.lastTenPoints[mouseWheelInfo.lastTenPoints.length-2];
                var pointC = mouseWheelInfo.lastTenPoints[mouseWheelInfo.lastTenPoints.length-3];
                
                inflexPoint = Math.abs(pointB)>50 && (timeDiff<60 && Math.abs(pointC)< Math.abs(pointB) &&  Math.abs(pointB)> Math.abs(pointA));
            }
            
            if(inflexPoint){
                if(delta<0){
                    $('.container-years .years-nav').yearsNav('setIndex', globalSettings.selectedIndex+1);
                } else if(delta>0){
                    $('.container-years .years-nav').yearsNav('setIndex', globalSettings.selectedIndex-1);
                }
            }
                
        }
        mouseWheelInfo.prevTime = curTime;
        if(mouseWheelInfo.lastTenPoints.length>0){
            if(mouseWheelInfo.lastTenPoints[mouseWheelInfo.lastTenPoints.length-1]!=delta){
                mouseWheelInfo.lastTenPoints.push(delta);
            }
        } else {
            mouseWheelInfo.lastTenPoints.push(delta);
        }
        if(mouseWheelInfo.lastTenPoints.length>200){
            mouseWheelInfo.lastTenPoints.splice(0,1);
        }
        for(i=0;i<mouseWheelInfo.lastTenPoints.length;i++){
            $('.bar_'+i+' .fill').css({height:Math.abs(mouseWheelInfo.lastTenPoints[i])});
        }
        
        */
        event.preventDefault(); 
}
function onScrollFunction(){
    
        parallaxEffect();
        
        anchorsHandler();
    
}
function parallaxEffect(){
    
    var sT = $(document).scrollTop();
    
    if(!mobile){
        
        

        /* **********************************************
         * HOME
         * **********************************************
         */ 
        if( sT < (viewportHeight+75)){

            /*$('.parallax-bg .home-hero-bg').css({backgroundPosition:'0px '+(sT*.9)+'px'});
            $('.container-hero').css({top:sT*.6});
            $('.hero-first-title').css({top:$('.hero-first-title').data('init-top')-sT*.15});
            $('.hero-second-title').css({top:$('.hero-second-title').data('init-top')-sT*.15});
            $('.container-hero p').css({top:$('.container-hero p').data('init-top')-sT*.1});*/

        }

        /* **********************************************
         * RECIPIENT
         * **********************************************
         */ 
        if( sT <= ($('#recipient').height()+$('#recipient').position().top)){
            $('.video-wrapper').css({top:-viewportHeight*.2+(viewportHeight*.2)*(sT/(viewportHeight))});
        }
        
        // HIDE VIDEO BACKGROUND
        
        if( sT > ($('#recipient').height()+$('#recipient').position().top)){
            $('.video-wrapper').hide();
        } else {
            $('.video-wrapper').css('display','');
        }
        /* **********************************************
         * TIMELINE
         * **********************************************
         */
        
        if( sT <= ($('#timeline').height()+$('#timeline').position().top)){
            
            if(sT>=$('#timeline').position().top){
                if(sT<($('#timeline').position().top+$('#timeline').height()-viewportHeight-200) && (sT>$('#timeline').position().top+100)){
                    enableMouseSteps();
                } else if(sT>($('#timeline').position().top+$('#timeline').height()-viewportHeight-100)){
                    globalSettings.selectedIndex = $('.part-a li').length;
                }

                $('.social-share').css({top:'8%'});

                $('.container-timeline').css({position:'fixed', top:0, bottom:'inherit'});

                var timelineProgress = (sT-$('#timeline').position().top)/($('#timeline').height()-viewportHeight);
                if(timelineProgress<=0){
                    $('.container-years .years-nav').yearsNav('setIndex', 0);
                }
                
                if(sT>=($('#timeline').position().top+$('#timeline').height()-viewportHeight)){
                     $('.container-timeline').css({position:'absolute', top:'inherit', bottom:0});
                     $('.social-share').css('top','');
                     
                }
                
                
            } else {
                $('.container-timeline').css({position:'relative', top:'inherit', bottom:'inherit'});
                $('.social-share').css('top','');
                if((sT>=$('#timeline').position().top+100)){
                    disableMouseSteps();
                }
                
            }
            
            if( sT >= ($('#timeline').height()+$('#timeline').position().top-viewportHeight)){
                disableMouseSteps();
            }
        } 

         /* **********************************************
         * AVERTED
         * **********************************************
         */
        var sectionLimitTop = $('#result').position().top;
        var sectionHeight   = $('#result').height();
                
        if( sT <= ( sectionHeight + sectionLimitTop ) ){
            var contWidth = $('.container-first').width();
            var contHeight = $('.container-first').height();
            
            if(sT>=(sectionLimitTop-viewportHeight-40) && sT<=sectionLimitTop+sectionHeight){
                $('.sliders-container .slide').not('.story-slide-1').css('display','none');
            }
            
            /****  background parallax ****/
            
            // Before to Section
            if(  
                    sT >= ( sectionLimitTop - viewportHeight ) && 
                    sT <= sectionLimitTop
              ){
                // BACKGROUND PARALLAX
                var scrollTopVSsectionTopHeightDiff = sT-(sectionLimitTop-viewportHeight);
                $('.container-first').css('background-position', 'left '+(scrollTopVSsectionTopHeightDiff*.6)+'px');
                
                // CONTENT PARALLAX
                var diffWithoutViewportHeight = viewportHeight-scrollTopVSsectionTopHeightDiff;
                $('.result-title').css('margin-top', -diffWithoutViewportHeight*.5);
            }    
            
            // After Section
            if(sT >= (sectionHeight+sectionLimitTop-viewportHeight)){
                // BACKGROUND PARALLAX
                var scrollTopVSsectionTopHeightDiff = sT-(sectionHeight+sectionLimitTop-viewportHeight*2);
                $('.container-first').css('background-position', 'left '+((scrollTopVSsectionTopHeightDiff)*.6)+'px')
                
                // CONTENT PARALLAX
                var diffWithoutViewportHeight = viewportHeight-scrollTopVSsectionTopHeightDiff;
                $('.result-title').css('margin-top', -diffWithoutViewportHeight*.5);
            }
            
            /****  background parallax ****/
            
                
            if(sT>=(sectionLimitTop-40) && sT<=sectionLimitTop){
                /*maskObject($('.second-slide'), {x:0, y:contHeight+30, type:'shape', shape:[
                            {x:0, y:0},
                            {x:contWidth/2, y:-40},
                            {x:contWidth, y:0},
                            {x:contWidth, y:contHeight},
                            {x:0, y:contHeight},
                    ]});
                $('.second-slide').css('display','table');*/
            }
            if(sT>=sectionLimitTop){
                $('.container-cases-averted').css({position:'fixed', top:0, bottom:'inherit'});

                var sectionProgress = (sT-sectionLimitTop)/(sectionHeight-viewportHeight);
                var currentSlide = Math.floor((sectionProgress)/(1/4));
                var xx, yy, hh, ww;
                
                var thresholdLimit = .5;

                if(sectionProgress>0){
                    var currP = ((sectionProgress-(currentSlide*1/4))/(1/4));
                    var modifiedCurrentProgress = currP>thresholdLimit ? ((currP-thresholdLimit)/(1-thresholdLimit)) : 0;
                    var wallHeight = modifiedCurrentProgress*(contHeight+40);

                    xx = 0;
                    yy = contHeight-wallHeight;
                    hh = wallHeight;
                    ww = contWidth;

                    $('.story-slide-'+(currentSlide+1)).css('-webkit-clip-path','').css('clip-path', '').css('display','table');
                    
                    maskObject($('.story-slide-'+(currentSlide+2)), {
                        x:xx, 
                        y:yy+30+40, 
                        type:'shape', 
                        shape:[
                            {x:0, y:0},
                            {x:contWidth/2, y:-40},
                            {x:contWidth, y:0},
                            {x:contWidth, y:contHeight},
                            {x:0, y:contHeight},
                    ]});
                    $('.story-slide-'+(currentSlide+2)).css('display','table');
                } else if(sectionProgress>=1){
                    $('.fifth-slide').css('-webkit-clip-path','').css('clip-path', '');
                } 
                


                if(sT>=(sectionLimitTop+sectionHeight-viewportHeight)){
                     $('.container-cases-averted').css({position:'absolute', top:'inherit', bottom:0});
                }
            } else {
                $('.container-cases-averted').css({position:'relative', top:'inherit', bottom:'inherit'});
            }
        }  else {
            $('.fifth-slide').css('-webkit-clip-path','').css('clip-path', '');
        }
        
        /* **********************************************
         * DEFEAT
         * **********************************************
         */
        var storySlideHeight = 700;
        if( sT <= ($('#defeat-malaria').height()+$('#defeat-malaria').position().top)){
            if(
                    sT>=($('#defeat-malaria').position().top-viewportHeight) && 
                    sT < ($('#defeat-malaria').position().top+$('#defeat-malaria').height()-viewportHeight-$('.container-gallery-share').height() )
               ){
                
                var halfViewportHeight = storySlideHeight/2;
                var doubleViewportHeight = viewportHeight*2;
                
                var localTop = sT-($('#defeat-malaria').position().top-viewportHeight);
                totalPercent = localTop/(storySlideHeight);
                
                var firstPage = Math.floor(totalPercent);
                firstPage = firstPage<=0 ? 1 : firstPage;
                
                var firstPercent = (localTop-(firstPage>1 ? ((firstPage-1)*storySlideHeight) : 0))/(2*storySlideHeight);
                
                var secondPage = Math.floor((localTop-storySlideHeight)/(storySlideHeight))+2;
                var secondPercent = ((localTop-(secondPage-1)*storySlideHeight)%doubleViewportHeight)/(2*storySlideHeight);

                
                if(firstPage>=1 && firstPage<=$('.hero-story-slide').length){
                    //console.log('1. '+firstPage+', '+(firstPercent*100)+'%');
                    $('.hero-slide-'+firstPage+' .hero-popup').css({top:halfViewportHeight-(firstPercent-.5)*400});
                    $('.hero-slide-'+firstPage+' .hero-paragraph').css({top:halfViewportHeight-(firstPercent-.5)*200});
                }
                
                if(secondPage>1 && secondPage<=$('.hero-story-slide').length){
                    //console.log('1. '+secondPage+', '+(secondPercent*100)+'%');
                    $('.hero-slide-'+secondPage+' .hero-popup').css({top:halfViewportHeight-(secondPercent-.5)*400});
                    $('.hero-slide-'+secondPage+' .hero-paragraph').css({top:halfViewportHeight-(secondPercent-.5)*200});
                }
                $('.story-hero').scrollTop(0);
                $('.container-shares').css('background-position', "center "+viewportHeight+"px, center "+viewportHeight+"px, center top");
            }
            if(sT>=$('#defeat-malaria').position().top){
                $('.container-shares').css({position:'fixed', top:0, bottom:'inherit'});
                
                var diff = (sT-$('#defeat-malaria').position().top);
                
                if(diff>0){
                    $('.story-hero').scrollTop(diff);
                }
                
                if(sT>=($('#defeat-malaria').position().top+$('#defeat-malaria').height()-(viewportHeight+$('.container-gallery-share').height()) )){
                    var perc = (sT-($('#defeat-malaria').position().top+$('#defeat-malaria').height()-(viewportHeight+$('.container-gallery-share').height())))/(viewportHeight+$('.container-gallery-share').height());
                    var newTop = viewportHeight;
                    
                    $('.container-shares').css('background-position', "center "+(newTop+(perc*300))+"px, center "+(newTop+(perc*400))+"px, center top");
                } 
                
                
                
                if(sT>=($('#defeat-malaria').position().top+$('#defeat-malaria').height()- viewportHeight- $('.container-gallery-share').height() )){
                     $('.container-shares').css({position:'absolute', top:'inherit', bottom:0});
                }
            } else {
                $('.container-shares').css({position:'relative', top:'inherit', bottom:'inherit'});
            }
        }
        /*if(sT>= ($('#defeat-malaria').position().top-viewportHeight)){
            
            if( sT <= ($('#defeat-malaria').position().top+$('.story-hero').height())){
                
                var yPos = (sT+viewportHeight)-$('#defeat-malaria').position().top;
                var sectionProgress = yPos/(viewportHeight*2);
                
                // ARROW POSITION
                
                if(yPos<=730 && yPos<=viewportHeight){
                    arrowTop = yPos-730;
                    $('.container-hero-message').css({backgroundPosition: 'center '+arrowTop+'px'});
                } else if(730>=viewportHeight){
                    $('.container-hero-message').css({backgroundPosition: 'center bottom'});
                } else {
                    $('.container-hero-message').css('background-position','');
                }
                
                // ELEMENTS POSITION
                
                // square background
                var pProgress = .5-sectionProgress;
                var halfViewport = viewportHeight/2;
                
                $('.hero-bg-content').css({top:halfViewport+pProgress*200})
                $('.hero-popup').css({top:halfViewport+pProgress*500});
                $('.hero-paragraph').css({top:halfViewport+pProgress*300});
            }
        }*/
    }
}
function anchorsHandler(){
    var sT = $(document).scrollTop();
    $('section,#take-action').each(function(i,item){
        var sectionTop = $(item).position().top;
        var sectionId = $(item).attr('id');
        if(sectionId=="take-action"){
            sectionTop = $(item).closest('section').position().top+$('.hero-story-slides-container').height();
        }

        if(sT>=sectionTop){
            $('.nav-items ul li a, .footer-menu ul li a').removeClass('active');
            $('[href="#'+$(item).attr('id')+'"]').addClass('active');
        }
    });
}
var mouseWheelTriggered = false;

function onMouseWheelFunction(){
    var mouseWheelTriggered = true;
}


function onScrollStopFunction(){
    mouseWheelTriggered = false;
    
    var sT = $(document).scrollTop();
    viewportWidth = $(window).width();
    viewportHeight = $(window).height();
    
    var threshold = 100; // 100 px after and before;
    var currentPage = Math.floor((sT+(viewportHeight/2))/viewportHeight);
    var diff = (currentPage*viewportHeight)+(viewportHeight/2)-(sT+(viewportHeight/2));
    var next = diff<-threshold;
    var prev = diff>threshold;
    
    if(next){
        currentPage+=1;
    } else if(prev){
        currentPage-=1;
    }
    
    currentPage = currentPage<0?0:currentPage;
    $("html, body").bind("mousewheel", disableMouseWheel);
    $("html, body").animate({ scrollTop: currentPage*viewportHeight }, 600, 'swing', unBindMouseWheel);
    
}
var mouseStepsEnable = false;
var lastDetection = 0;
function enableMouseSteps(){
    
    if(!mouseStepsEnable){
        mouseStepsEnable = true;

        bindDisableMouseWheel();

        $("html, body").bind('mousewheel', handleMouseWheel);
        $("html, body").bind('keydown', handleKeyDown);
    }
}
function handleMouseWheel(event){
        var delta = event.deltaY;
        timelineStep(delta, 1000);
        event.preventDefault(); 
}
function disableMouseSteps(){
    
    if(mouseStepsEnable){
        mouseStepsEnable = false;
        
        $("html, body").unbind('mousewheel', handleMouseWheel);
        $("html, body").unbind('keydown', handleKeyDown);
        
        unBindMouseWheel();

        
    }
}
function handleKeyDown(e){
    
    switch(e.which){
        case 87:
        case 38:
            timelineStep(1, 200);
            e.preventDefault();
            break;
        case 40:
        case 83:
            timelineStep(-1, 200);
            e.preventDefault();
            break;
    }
    
    
}
function timelineStep(delta, time){
    var currentDetection = new Date().valueOf();
        if((currentDetection-lastDetection)>time){
            if(delta<0){
                if((globalSettings.selectedIndex+1)<$('.part-a li').length){
                    globalSettings.selectedIndex++;
                    $('.container-years .years-nav').yearsNav('setIndex', globalSettings.selectedIndex);
                    $("body").scrollTop($('#timeline').position().top+(200*(globalSettings.selectedIndex+.5)));
                } else {
                   disableMouseSteps();
                }
            } else if(delta>0){
               if((globalSettings.selectedIndex-1)>=0){
                   globalSettings.selectedIndex--;
                   
                   $('.container-years .years-nav').yearsNav('setIndex', globalSettings.selectedIndex);
               } else {
                    disableMouseSteps();
                }
            }
            lastDetection = currentDetection;
        } 
        
        
        
}

var mouseWheelEnabled = true;
function bindDisableMouseWheel(){
    if(mouseWheelEnabled){
        mouseWheelEnabled = false;
        $("html, body").bind("mousewheel", disableMouseWheel);
    }
    
}
function unBindMouseWheel(){
    if(!mouseWheelEnabled){
        mouseWheelEnabled = true;
        $("html, body").unbind("mousewheel", disableMouseWheel);
    }
}
function disableMouseWheel(){
    return false;
}

function seeYear($year){
    
    var yearObject;
    var theHighest = 0;
    var theLowest = 100000000;
    var originColor = '#F6CC40';
    if($year<=2003){
        $('#Africa path').attr('fill', originColor);
    }
    if(countriesInfo){
        for(i=0;i<countriesInfo.info.length;i++){
            if(countriesInfo.info[i].year==$year){
                yearObject = countriesInfo.info[i];
            }
            for(var countryName in countriesInfo.info[i].countries){
                var val = countriesInfo.info[i].countries[countryName];
                if(val>theHighest){
                    theHighest = val;
                }
                if(val<theLowest && val!=0){
                    theLowest = val;
                }
                /*
                if(allCountries[countryName]){
                    countryObject = allCountries[countryName];
                } else {
                    countryObject = {name: countryName, years:{}};
                    allCountries[countryName] = countryObject;
                }
                countryObject.years[countriesInfo.info[i].year] = val;*/
            }
        }
        
        var maxLogScale = Math.log10(theHighest);
        var minLogScale = Math.log10(theLowest);
        var interval = maxLogScale-minLogScale;
                
        var colorA = {r:246, g:204, b:64}; 
        var colorB = {r:223, g:148, b:2};
        
        if(yearObject){
            var countries = yearObject.countries;
            var highNumber = 0;
            for(var countryName in countries){
                var val = countries[countryName];
                if(val>highNumber){
                    highNumber = val;
                }
            }
            for(var countryName in countries){
                
                var val = countries[countryName];
                
                var perc = val!=0?((Math.log10(val)-minLogScale)/interval):0;
                
                pattern = Math.floor((1-perc)*9)+1;
                
                fillStr = originColor;
                
                    if(pattern>0){
                        fillStr = 'url(#pat_'+pattern+')';
                    }
                
                $('path#'+countryName).attr('fill', fillStr);
            }
        }
    }
}


function onSlideSelected($slideElement, oldIndex, newIndex){
    selectedShareInfo = share_info[newIndex];
    $('#share-description').text(unescape(selectedShareInfo.description));
}
$( window ).load(function() {
    setTimeout(function(){
        jQuery("#home-link").click();
    }, 250);
    $('#enviromental_impact_a').click(function(e){
        e.preventDefault();
        $('#enviromental_impact').bPopup({
            closeClass : 'close2',
            positionStyle: 'fixed'
        });
    });
    $('#play_video').click(function(e){
        e.preventDefault();
        showVideoPopup();
        $('#video_popup').bPopup({
            closeClass : 'close3',
            positionStyle: 'fixed',
            onOpen: function() {  },
            onClose: function() { stopVideoPopup(); }
        }, function(){
            $(window).trigger('resize');
            playVideoPopup();
        });

    });
});
function showVideoPopup(){
    $('.video-tag-popup').each(function(){
        $innerHTML = '';
            $innerHTML = '<video id="videoPopup" width="100%" height="50%" autoplay="true" loop="loop" poster="'+$(this).data('poster')+'" controls>';
            $innerHTML += '<source src="'+$(this).data('mp4')+'" type="video/mp4">';
            $innerHTML += '<source src="'+$(this).data('ogg')+'" type="video/ogg">';
            $innerHTML += '<source src="'+$(this).data('webm')+'" type="video/webm">';
            $innerHTML += '</video>';
        $(this).html($innerHTML);
    });
}
function playVideoPopup(){
    var vid = document.getElementById("videoPopup");
        vid.play();
}
function stopVideoPopup(){
    $('.video-tag-popup').each(function(){
        $innerHTML = '';
        $(this).html($innerHTML);
    });
}