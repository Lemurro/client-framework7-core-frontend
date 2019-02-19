/**
 * Проверка сессии
 *
 * @version 19.02.2019
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
            app.views.main.router.navigate(lemurro.settings.pageAfterAuth);
        }
    });
};