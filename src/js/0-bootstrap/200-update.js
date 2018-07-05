/**
 * Запускаем обновление приложения
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap.update = function () {
    var market = 'market' + device.platform;

    if (modeCordova && bootstrap.settings.hasOwnProperty(market)) {
        window.open(bootstrap.settings[market], '_system');
        e.preventDefault();
    } else {
        app.dialog.alert('Здесь должна быть ссылка на магазин "' + device.platform + '"', 'Магазин');
    }

    return false;
};