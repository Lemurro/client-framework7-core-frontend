/**
 * Покажем popover
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap._bindShowPopover = function () {
    $$('body').on('click', '.js-show-popover', function () {
        app.dialog.alert($$(this).attr('data-popover'), '');
    });
};