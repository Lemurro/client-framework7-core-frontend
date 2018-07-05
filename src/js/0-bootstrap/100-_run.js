/**
 * Запуск приложения
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap._run = function () {
    app.preloader.show();
    app.request.get(pathServerAPI, {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            bootstrap.showErrors(result.errors);
        } else {
            if (modeCordova && parseInt(result.data.version[device.platform.toLowerCase()], 10) > bootstrap.settings.versionAPI) {
                var popup = $$('#js-popup');

                popup.find('.popup__title').html('&nbsp;');
                popup.find('.popup__content').html(
                    '<div class="text-align-center">' +
                    '<h1><i class="fas fa-thumbs-up font-100"></i></h1>' +
                    '<h1>Ура, вышла новая версия приложения!</h1>' +
                    '<h3>Чтобы продолжить, обновите приложение из магазина.</h3>' +
                    '<p><a href="javascript:bootstrap.update();" class="button button-raised button-fill">Обновить</a></p>' +
                    '</div>'
                );
                popup.find('.close-popup').hide();

                app.popup.open(popup);
            } else {
                bootstrap._bindShowPopover();
                bootstrap._bindPhoneMask();
                bootstrap._bindCodeMask();
                bootstrap._bindExternalLink();

                localforage.getItem('sessionID', function (err, value) {
                    bootstrap.sessionID = value;

                    if (bootstrap.sessionID !== null) {
                        auth.check();
                    }
                });
            }
        }
    });
};