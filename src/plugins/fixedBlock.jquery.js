/* eslint-disable */
import jQuery from 'jquery';

$.fn.fixedBlock = function(options) {
  var settings = $.extend(
    {
      difTopPos: 75,
      winWidth: 0,
      prevBlock: true,
      fixd: $.noop,
      noFixd: $.noop,
    },
    options,
  );

  this.each(function() {
    var $block = $(this),
      $parent = $block.parent(),
      parent = {
        height: $parent.outerHeight(),
        bottom: $parent.offset().top + $parent.outerHeight(),
      },
      block = {
        width: $block.outerWidth(true),
        height: $block.outerHeight(true),
        top: $block.offset().top,
        left: $block.offset().left,
      },
      $prevBlock = settings.prevBlock ? settings.prevBlock : $block.prev(),
      mbPrevBlock = 0,
      windowWidth = $(window).width(),
      timer;

    if ($prevBlock.length) mbPrevBlock = $prevBlock.css('margin-top', block.height);

    checkFix();

    $(window).on('resize', function() {
      clearTimeout(timer);
      timer = setTimeout(update, 50);
    });
    $('.out').on('resizePage', update_parent);
    $(window).scroll(checkFix);

    function update() {
      unFixed();
      block.top = $block.offset().top;
      block.width = $block.outerWidth(true);
      block.height = $block.outerHeight();
      block.left = $block.offset().left;
      update_parent();
      if ($prevBlock.length) mbPrevBlock = $prevBlock.css('margin-top', block.height);
      windowWidth = $(window).width();
      checkFix();
    }

    function update_parent() {
      parent.height = $parent.outerHeight();
      parent.bottom = $parent.offset().top + parent.height;
      checkFix();
    }

    function fixed() {
      $block.addClass('fixed').removeClass('absolute');
      if ($prevBlock.length) $prevBlock.css('margin-top', block.height);
      else
        $block.css({
          top: settings.difTopPos,
          right: '',
          bottom: '',
          left: block.left,
          width: block.width,
        });
      settings.fixd();
    }

    function unFixed() {
      $block.removeClass('fixed');
      if ($prevBlock.length) $prevBlock.css('margin-top', block.height);
      else
        $block.css({
          top: '',
          left: '',
          right: '',
          bottom: '',
          width: '',
        });
      settings.noFixd();
    }

    function unFixed_bottom() {
      $block.removeClass('fixed').addClass('absolute');
      if ($prevBlock.length) $prevBlock.css('margin-top', block.height);
      else
        $block.css({
          top: '',
          left: '',
          right: '',
          bottom: '1rem',
          width: block.width,
        });
      settings.noFixd();
    }

    function checkFix() {
      var scrollTop = $(window).scrollTop();

      if (windowWidth > settings.winWidth) {
        if (
          scrollTop >= block.top - settings.difTopPos &&
          scrollTop + settings.difTopPos < parent.bottom - block.height
        ) {
          fixed();
        } else {
          if (scrollTop + settings.difTopPos > parent.bottom - block.height) unFixed_bottom();
          else unFixed();
        }
      }
    }
  });
};
