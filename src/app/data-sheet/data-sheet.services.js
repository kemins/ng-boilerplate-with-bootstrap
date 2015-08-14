angular.module('ftw.data-sheet.services', [])

    .factory('dataSheetService', [DataSheetService]);


function DataSheetService() {
    return {
        containerClassName: 'handsontable-container',

        createTable: function (element, settings) {
            var container = document.createElement('DIV');

            container.className = this.containerClassName;
            element.appendChild(container);

            return new Handsontable(container, settings);
        },

        destroyTable: function (element, instance) {
            if (instance) {
                instance.destroy();
                $(element).find('.handsontable-container').remove();
                return true;
            }
            return false;
        },

        updateSettings: function (instance, settings) {
            if (instance) {
                instance.updateSettings(settings);
            }
        },

        render: function (instance) {
            if (instance) {
                instance.render();
            }
        },

        calculateSize: function (element) {
            var offset;

            offset = Handsontable.Dom.offset(element);
            var availableWidth = Handsontable.Dom.innerWidth(element) - offset.left + (window.scrollX || 0);
            var availableHeight = Handsontable.Dom.innerHeight(element) - offset.top + (window.scrollY || 0);

            return {width: availableWidth, height: availableHeight};
        }
    };
}