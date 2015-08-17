angular.module('ftw.data-sheet.services', [])

    .factory('dataSheetService', [DataSheetService]);


function DataSheetService() {

    return {
        containerClassName: 'handsontable-container',
        createTable: createTable,
        destroyTable: destroyTable,
        updateSettings: updateSettings,
        render: render,
        calculateSize: calculateSize
    };

    function createTable(element, settings) {
        var container = document.createElement('DIV');

        container.className = this.containerClassName;
        element.appendChild(container);

        return new Handsontable(container, settings);
    }

    function destroyTable(element, instance) {
        if (instance) {
            instance.destroy();
            $(element).find('.handsontable-container').remove();
            return true;
        }
        return false;
    }

    function updateSettings(instance, settings) {
        if (instance) {
            instance.updateSettings(settings);
        }
    }

    function render(instance) {
        if (instance) {
            instance.render();
        }
    }

    function calculateSize(element) {
        return {width: Handsontable.Dom.innerWidth(element), height: Handsontable.Dom.innerHeight(element)};
    }
}