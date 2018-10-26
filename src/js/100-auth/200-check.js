/**
 * Проверка сессии
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.check = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/check', {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            localforage.clear();
            lemurro.sessionID = '';
        } else {
            app.loginScreen.close('#js-login-screen');
            app.router.navigate(lemurro.settings.pageAfterAuth);
        }
    });
};