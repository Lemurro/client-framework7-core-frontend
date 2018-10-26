/**
 * Проверка введенного кода
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.checkCode = function () {
    var deviceInfo = {
        uuid        : 'q1w2e3r4t5y6u7i8o9p0',
        platform    : 'TestOS',
        version     : '1.0',
        manufacturer: 'Samsung',
        model       : 'Galaxy S8'
    };

    if (modeCordova) {
        deviceInfo = {
            uuid        : device.uuid,
            platform    : device.platform,
            version     : device.version,
            manufacturer: device.manufacturer,
            model       : device.model
        };
    }

    app.preloader.show();
    app.request.post(pathServerAPI + 'auth/code', {
        'auth_id'    : $$('#js-auth-' + lemurro.settings.authType + '-get-form').find('input[name="auth_id"]').val(),
        'auth_code'  : $$('#js-auth-' + lemurro.settings.authType + '-check-form').find('input[name="auth_code"]').val(),
        'device_info': deviceInfo
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            localforage.setItem('sessionID', result.data.session, function () {
                Deferred.next(function () {
                    lemurro.sessionID = result.data.session;
                }).next(function () {
                    app.loginScreen.close('#js-login-screen');
                    app.router.navigate(lemurro.settings.pageAfterAuth);
                });
            });
        }
    });
};