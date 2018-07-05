/**
 * Проверка сессии
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
auth.check = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/check', {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            localforage.clear();
            bootstrap.sessionID = '';
        } else {
            app.loginScreen.close('#js-login-screen');
            app.router.navigate(bootstrap.settings.pageAfterAuth);
        }
    });
};