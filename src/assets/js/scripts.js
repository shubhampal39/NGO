/* ****
 * This function return an object of parameters
 * where the image should be to fit inside the
 * container.
 * @param   Object params
 * @param       Number containerWidth
 * @param       Number containerHeight
 * @param       Number imageWidth
 * @param       Number imageHeight
 * @return Object
 */
function imageInside(params){
    var returnO = {};
    var cW = params.containerWidth;
    var cH = params.containerHeight;
    var iW = params.imageWidth;
    var iH = params.imageHeight;

    // new width, height, top and left
    var nW, nH, nT, nL;
    
    nH = cW * ( iH / iW );
    
    if( nH < cH){
        nH = cH;
        nW = cH * ( iW / iH );
        nL = (cW - nW)/2;
        nT = 0;
    } else {
        nW = cW;
        nT = (cH - nH)/2;
        nL = 0;
    }
    
    returnO = {
        width   : nW,
        height  : nH,
        top     : nT,
        left    : nL
    }

    return returnO;
}
$.fn.yearsNav = function(conf, index){
    var settings = {};
    if(conf instanceof Object){
        settings = $.extend({
            version         : '0.1.1',
            indexSelected   : null,
            yearSelected    : null,
            mobile          : false
        }, conf);
    }
    
    switch(conf){
        case 'setIndex':
            setIndex(index, $(this), true);
            break;
        case 'updateView':
            updateView($(this));
            break;
        case 'continuosMovement':
            moveContinusly(index, $(this));
            break;
        case 'deducePosition':
            deducePosition($(this));
            break;
        default:
            return this.each(function(){
        
                $(this).find('a').each(function(i,item){
                    $(item).attr('data-index', i);
                });

                $curr_html = $(this).clone().wrap('<div>').parent().html();
                
                $partA = $('<div>').append($($curr_html));
                $partB = $('<div><div class="years-cont">'+$curr_html+'</div><div class="events-cont"></div></div>');
                $partC = $('<div>').append($($curr_html));

                $partA.addClass('years-nav-part part-a');
                $partB. addClass('years-nav-part part-b current-year');
                $partC. addClass('years-nav-part part-c');
                
                $prevButton = $('<a class="years-nav-control prev" href="#"></a>');
                $nextButton = $('<a class="years-nav-control next" href="#"></a>');
                

                $container = $('<div class="years-nav"></div>');
                $(this).before($container);
                $(this).remove();

                $container.append($partA).append($partB).append($partC).append($prevButton).append($nextButton);
                
                $container.find('.years-nav-part ul li a').each(function(i, item){
                    if($(item).data('events')){
                        $(item).addClass('events_'+$(item).data('events'));
                    }
                    
                    $(item).click(function(e){
                        setIndex($(this).data('index'),$(this).closest('.years-nav'), true, true);
                        e.preventDefault();
                    });
                })
                $container.find('.prev').click(function(e){
                    e.preventDefault();
                    if(globalSettings.selectedIndex-1>=0){
                        globalSettings.selectedIndex-=1;
                        setIndex(globalSettings.selectedIndex, $(this).closest('.years-nav'), true);
                        //settings.indexSelected( globalSettings.selectedIndex );
                    }
                    
                });
                $container.find('.next').click(function(e){
                    if((globalSettings.selectedIndex+1)<globalSettings.totalItems){
                        globalSettings.selectedIndex+=1
                        setIndex(globalSettings.selectedIndex,$(this).closest('.years-nav'), true);
                        //settings.indexSelected( globalSettings.selectedIndex );
                    }
                    e.preventDefault();
                })

                $container.yearsNav('setIndex', 0, false);
            });
    }
    
    function setIndex($index, $element, $anim, fromButton){
        
        globalSettings.selectedIndex = $index;
        
        
        $time = 400;
        $ease = 'easeInOutCubic';
        
        if($index==0){
            $('.years-nav-control.prev').hide();
        } else {
            $('.years-nav-control.prev').show();
        }
        
        if($index==(globalSettings.totalItems-1)){
            $('.years-nav-control.next').hide();
        } else {
            $('.years-nav-control.next').show();
        }
        
        $sameindex = $element.data('selected')==$index;
        
                $element.find('.part-a').stop();
                $element.find('.part-b ul').stop();
                $element.find('.part-b').stop();
                $element.find('.part-c ul').stop();
                
                if(!globalSettings.mobile){
                    
                    /* \\// ** FROM MOBILE adjustment ** */
                    $element.find('.part-a ul').css('margin-left','');
                    $element.find('.part-b ul, .part-c ul').css('left','');
                    /* //\\ ** FROM MOBILE adjustment ** */
                    
                    $element.find('.part-b .event_link').animate({right:-10+hyp, top:-10+hyp, opacity:0, width:10, height:10}, 200, 'easeInOutCubic', function(){$('.to-delete').remove();}).addClass('to-delete');
                    
                    $yearsHeight = $element.find('.part-a li a').height();
                    $currentYearHeight = $element.find('.part-b li a').height();
                    
                    $element.find('.part-a').css({height:$yearsHeight*$index});
                    $element.find('.part-b ul').css({top:-$currentYearHeight*$index});
                    $element.find('.part-b').css({width:$element.find('.part-b ul li a[data-index="'+$index+'"]').width()+20+$yearsHeight});
                    
                    if(!$sameindex){
                        setTimeout(function(){
                            $('.event_link').each(function(){
                                $(this).animate({opacity:1, right:$(this).data('new-right'), top:$(this).data('new-top')}, 500, 'easeInOutCubic')
                            })
                        }, 350);
                    }
                    
                    $element.find('.part-c ul').css({marginTop:-$yearsHeight*($index+1)});
                } else {
                    
                    /* \\// ** FROM DESKTOP adjustment ** */
                    $element.find('.part-a').css('height', '');
                    $element.find('.part-b ul').css('top', '');
                    $element.find('.part-b').css('width','');
                    $element.find('.part-c ul').css('margin-top','');
                    /* //\\ ** FROM DESKTOP adjustment ** */
                    
                    var partAwidth = $element.find('.part-a').width();
                    
                    $element.find('.part-a ul').css({marginLeft:-50-70*$index});
                    $element.find('.part-b ul').css({left:-100*$index});
                    $element.find('.part-c ul').css({left:50-70*($index+1)});
                }
            
            var hyp = $element.find('.part-b').height()/2;
            
            if(!$sameindex){
                globalSettings.indexSelected( globalSettings.selectedIndex, fromButton);
            }
            
            $selectedEelement = $element.find('.part-a ul li a[data-index="'+$index+'"]');
            
            if($selectedEelement.data('events') && !globalSettings.mobile){


                
                var events = $selectedEelement.data('events');
                
                var parentW = $element.find('.part-b').width();
                var origAng = 90-(((events-1)*60)/2);
                
                
                for($i=0;$i<events;$i++){
                    $event = $('<a class="event_link event_l_'+$i+'" data-event-nth="'+$i+'"></a>');
                    $element.find('.part-b').append($event);
                    var ang = origAng+60*$i;
                    var rad = Math.floor($event.width()/2);
                    
                    var t = -rad+hyp-hyp*Math.cos(ang*(Math.PI/180));
                    var r = -rad+hyp-hyp*Math.sin(ang*(Math.PI/180));
                    if($sameindex){
                        $event.css({top:t, right:r, opacity:1});
                    } else if($anim ){
                        $event.css({opacity:0, right:-rad+hyp, top:-rad+hyp});
                        $event.data('new-top', t).data('new-right',r);
                    } else {
                        $event.css({top:t, right:r});
                    }
                }
            }
            
            if(!$sameindex){
                $url = $selectedEelement.attr('href');
                $year = $url.substr(1,$url.length);
                
                if(globalSettings.yearSelected){
                    globalSettings.yearSelected( $year );
                }
            }
        
        
        $element.data('selected', $index);
    }
    function moveContinusly(delta, $element){
        $index = globalSettings.selectedIndex;
        /* \\// ** FROM DESKTOP adjustment ** */
        $element.find('.part-a').css('height', '');
        $element.find('.part-b ul').css('top', '');
        $element.find('.part-b').css('width','');
        $element.find('.part-c ul').css('margin-top','');
        /* //\\ ** FROM DESKTOP adjustment ** */
                    
        var partAwidth = $element.find('.part-a').width();
        
        $element.find('.part-a, .part-b, .part-c').addClass('no-animation');
        
        if((-50-70*$index+delta)>-50){
            var diff = delta-(-70*$index);
            var bounce = diff*.1;
            delta = (70*$index)+bounce;
        }
        
        if((-50-70*$index+delta) < (-50-70*(globalSettings.totalItems-1))){
            var diff = (-70*(globalSettings.totalItems-1))-(-70*$index+delta);
            var bounce = diff*.1;
            delta = (70*$index)-(70*(globalSettings.totalItems-1))-bounce;
        }
                    
        $element.find('.part-a ul').css({marginLeft:-50-70*$index+delta});
        $element.find('.part-b ul').css({left:-100*$index+ (delta * (100/70))});
        $element.find('.part-c ul').css({left:50-70*($index+1)+delta});
    }
    function deducePosition($element){
        $element.find('.part-a, .part-b, .part-c').removeClass('no-animation');
        $currentPosition = $element.find('.part-b ul').css('left').replace('px','');
        $deducePos = Math.ceil(Number(-1*$currentPosition)/100);
        
        
        if($deducePos<0){
            $deducePos = 0;
        }
        if($deducePos>(globalSettings.totalItems-1)){
            $deducePos = globalSettings.totalItems-1;
        }
        
        setIndex($deducePos, $element);
    }
    
    function updateView($element){
        $element.data('updating-view', true);
        
        setIndex(globalSettings.selectedIndex, $element);
        
        $element.removeAttr('data-updating-view');
        
    }
}
$.fn.animateNumber = function(newNumber, onAnimationFinish){
    if(!isNaN(newNumber)){
        $prev = 0;
        if($(this).data('prev')){
            $prev = $(this).data('prev');
        }
        if(!isNaN(Number($(this).text().replace(',','')))){
            $prev = Number($(this).text().replace(',',''));
        }
        
        $({someValue: $prev, target:$(this), targetValue:newNumber}).animate({someValue: newNumber}, {
            duration: 500,
            easing:'swing', // can be anything
            step: function() { // called on every step
                this.target.text(commaSeparateNumber(Math.round(this.someValue)));
            },
            done: function(){
                this.target.text(commaSeparateNumber(Math.round(this.targetValue)));
            }
        });
        $(this).data('prev', newNumber);
    } else {
        $(this).text(newNumber);
        if(onAnimationFinish){
            onAnimationFinish();
        }
    }
    
    
}

 function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
}
/* ****
 * This function return a boolean if the device has
 * mobile user agent.
 * 
 * @param   void
 * @return Boolean
 */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};
var userAgent = {
    safari: function(){
        return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf('Chrome') == -1;
    },
    chrome: function(){
        return navigator.userAgent.indexOf('Chrome') > -1;
    },
    ie: function(){
        return navigator.userAgent.indexOf('MSIE') > -1;
    },
    firefox: function(){
        return navigator.userAgent.indexOf('Firefox') > -1;
    },
    opera: function(){
        return navigator.userAgent.toLowerCase().indexOf("op") > -1;
    }
}

/*
 * MASK OBJECT
 * @returns void
 */
function maskObject($object, $params){
    var svgPoints = '';
    if($params.type=='shape'){
        var polygonPoints = [];
        var svgPolygonPoints = [];
        for(i=0;i<$params.shape.length;i++){
            polygonPoints.push($params.x+$params.shape[i].x+'px '+($params.y+$params.shape[i].y)+'px');
            svgPolygonPoints.push($params.x+$params.shape[i].x+' '+($params.y+$params.shape[i].y));
        }
        polygon = polygonPoints.join(', ');
        svgPoints = svgPolygonPoints.join(', ');
    } else {
        polygon = $params.x+'px '+($params.y+$params.height)+'px,'+($params.x+$params.width)+'px '+($params.y+$params.height)+'px, '+($params.x+$params.width)+'px '+($params.y)+'px,'+$params.x+'px '+$params.y+'px'
        svgPoints = $params.x+' '+($params.y+$params.height)+','+($params.x+$params.width)+' '+($params.y+$params.height)+', '+($params.x+$params.width)+' '+($params.y)+','+$params.x+' '+$params.y+''
    }
        if($object.data('prev-polygon')){
            $('#container_'+$object.data('prev-polygon')).remove();
        }
        
        var polygonId = 'polygon_'+Math.floor(1000*Math.random());
        var pathCont = $('<div class="polygon_mask" id="container_'+polygonId+'"></div>');
        var pathContStr  =  '<svg width="0" height="0"><clipPath id="'+polygonId+'">'
        pathContStr     +=  '<polygon points="'+svgPoints+'">';
        pathContStr     +=  '</polygon></clipPath></svg>';
        pathCont.html(pathContStr);
        $object.after(pathCont);
        
        $object.css('clip-path','url("#'+polygonId+'")');
        $object.css('-webkit-clip-path', 'polygon('+polygon+')');
        $object.data('prev-polygon', polygonId);
}

/*
 * SOCIAL SHARES
 */
function shareFBspecificIndex(){
    var selectedIndex = selectedShareInfo.index;
    return shareFB("", global_info.malaria_defeat_url+'?_ref='+(selectedIndex+1));
}
function shareTWspecificIndex(){
    var selectedIndex = selectedShareInfo.index;
    return shareTW(selectedShareInfo.description, global_info.root_url);
}
function shareFB(caption, link){
    FB.ui({
        method: 'feed',
        link: link,
        caption: caption,
      }, function(response){});
      return false;
}
function shareTW(text, url){
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = "http://twitter.com/share?text="+text+"&url="+url,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, 'twitter', opts);
    
    return false;
}

$.fn.applyTemplate = function(params, getOnlyString){
    $clone = $(this).eq(0).clone();
    $clone.removeClass('template');
    
    var templateStr = jQuery("<p>").append($clone).html();
    for(var key in params){
        templateStr = templateStr.replace("%"+key+"%", params[key]);
    }
    if(getOnlyString){
        return templateStr;
    }
    return $(templateStr);
}