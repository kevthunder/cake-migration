(function() {
  var $, addChangedSection, doDiff, formatChangedTag, protectTags;

  $ = jQuery;

  doDiff = function() {
    $('.diff .diffProcessed').removeClass('diffProcessed');
    $('.diff .fieldRow .changes').remove();
    return $('.diff .different .local .val').each(function() {
      var $remoteVal, diff, localChanges, remoteChanges;
      $remoteVal = $(this).closest('.fieldRow').find('.remote.active .val');
      diff = JsDiff.diffWords(protectTags($(this).html()), protectTags($remoteVal.html()));
      localChanges = '';
      remoteChanges = '';
      diff.forEach(function(part) {
        if (part.added) {
          return remoteChanges = addChangedSection(remoteChanges, part.value);
        } else if (part.removed) {
          return localChanges = addChangedSection(localChanges, part.value);
        } else {
          localChanges += part.value;
          return remoteChanges += part.value;
        }
      });
      $(this).after("<div class=\"changes\">" + (formatChangedTag(localChanges)) + "</div>");
      $remoteVal.after("<div class=\"changes\">" + (formatChangedTag(remoteChanges)) + "</div>");
      return $(this).closest('.fieldRow').addClass('diffProcessed');
    });
  };

  protectTags = function(txt) {
    return txt.replace(/</g, ' <').replace(/>/g, '> ');
  };

  addChangedSection = function(txt, changed) {
    if (txt.match(/<([^>]*)$/)) {
      return txt.replace(/<([^[>][^>]*)$/, '<[changedTag]$1') + changed;
    } else {
      return txt + ("<span class=\"change\">" + changed + "</span>");
    }
  };

  formatChangedTag = function(txt) {
    console.log(txt);
    txt = txt.replace(/<\[changedTag\](\w*)/g, '<$1 data-changed-tag="1"');
    return $("<div>" + txt + "</div>").each(function() {
      return $('[data-changed-tag]', this).addClass('changedTag').removeAttr('data-changed-tag');
    }).html();
  };

  $(function() {
    $('#remote').change(function() {});
    return doDiff();
  });

}).call(this);

//# sourceMappingURL=diff.js.map
