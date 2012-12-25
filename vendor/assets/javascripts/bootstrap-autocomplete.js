/* ================================================================
 * bootstrap-autocomplete.js v2.2.1
 * http://twitter.github.com/bootstrap/javascript.html#autocomplete
 * ================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ================================================================ */


!function($){

  "use strict"; // jshint ;_;


  var Typeahead = $.fn.typeahead.Constructor;


 /* AUTOCOMPLETE PUBLIC CLASS DEFINITION
  * ==================================== */

  var Autocomplete = function(element, options) {
    Typeahead.apply(this, [element, options])
    this.$hidden_input = $('<input type="hidden" name=""/>')
    this.last_processed_source = {}
    this.initializeHiddenInput()
  }


 /* NOTE: AUTOCOMPLETE EXTENDS BOOTSTRAP-TYPEAHEAD.js
  * ================================================= */

  Autocomplete.prototype = $.extend({}, Typeahead.prototype, {

    constructor: Autocomplete

  , initializeHiddenInput: function () {
      this.$element.after(this.$hidden_input)
      this.transferName()
      this.initializeValues()
    }

  , transferName: function () {
      this.$hidden_input.attr('name', this.$element.attr('name'))
      this.$element.removeAttr('name', '')
    }

  , initializeValues: function () {
      var value = this.$element.val()
      this.$hidden_input.val(value)
      this.$element.val(this.source[value])
    }

  , process: function (items) {
      this.last_processed_source = items
      var labels = $.map(items, function(v) { return v })
      return Typeahead.prototype.process.apply(this, [labels])
    }

  , updater: function (label) {
      var found_values = $.map(this.last_processed_source, function (v, k) { if (v == label) return k })
      var value = found_values[0]
      if (typeof value == 'undefined') {
        label = '';
      }
      this.$hidden_input.val(value)
      return Typeahead.prototype.updater.apply(this, [label])
    }

  , blur: function (e) {
      var label = this.$element.val()
      this.$element.val(this.updater(label))
      return Typeahead.prototype.blur.apply(this, [e])
    }

  })


 /* AUTOCOMPLETE PLUGIN DEFINITION
  * ============================== */

  $.fn.autocomplete = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('autocomplete')
        , options = typeof option == 'object' && option
      if (!data) $this.data('autocomplete', (data = new Autocomplete(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.autocomplete.defaults = $.extend({}, $.fn.typeahead.defaults, {
    source: []
  })

  $.fn.autocomplete.Constructor = Autocomplete


 /* AUTOCOMPLETE DATA-API
  * ===================== */

  $('[data-provide="autocomplete"]').each(function () {
    var $this = $(this)
    $this.autocomplete($this.data())
  })

}(window.jQuery);
