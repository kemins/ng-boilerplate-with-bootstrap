angular.module('ftw.data-sheet.services', [])

    .factory('dataSheetService', [DataSheetService]);


function DataSheetService() {
    return {
        containerClassName: 'handsontable-container',

        createTable: function (element, settings) {
            var container = document.createElement('DIV');

            container.className = this.containerClassName;
            element[0].appendChild(container);

            return new Handsontable(container, settings);
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
        }
    };
}