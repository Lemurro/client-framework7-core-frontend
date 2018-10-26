/**
 * Покажем popover
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindShowPopover = function () {
    $$('body').on('click', '.js-show-popover', function () {
        app.dialog.alert($$(this).attr('data-popover'), '');
    });
};