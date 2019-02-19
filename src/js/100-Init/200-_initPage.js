/**
 * Определим загруженную страницу и запустим ее init() если он есть
 *
 * @param {string} pageName Имя страницы
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._initPage = function (pageName) {
    app.preloader.show();
    app.request.get(pathServerAPI + 'user', {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            lemurro.settings.onLoad(result.data);

            var pageScript = window[pageName];

            if (pageScript !== undefined) {
                if (pageScript.hasOwnProperty('init')) {
                    pageScript.init();
                }
            }
        }
    });
};