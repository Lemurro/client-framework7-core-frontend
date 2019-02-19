/**
 * Покажем форму входа
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._showLoginScreen = function () {
    $$('#js-login-screen .js-auth-form').hide();
    $$('#js-auth-' + lemurro.settings.authType + '-get-form').show();
    app.loginScreen.open('#js-login-screen');
};