/**
 * Инициализация
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap.init = function () {
    if (window.overrideSettings === undefined) {
        window.overrideSettings = {};
    }

    if (window.overrideF7Settings === undefined) {
        window.overrideF7Settings = {};
    }

    bootstrap.settings = Object.assign({
        versionAPI   : 1,
        authType     : 'email',
        pageAfterAuth: '/home',
        marketiOS    : 'https://itunes.apple.com/us/app/lemurro/id0000000000?l=ru&ls=1&mt=8',
        marketAndroid: 'market://details?id=ru.bestion.lemurro',
        onLoad       : function (data) {
            var template = Template7.compile($$('#js-tpl-user__info').html());

            $$('#js-user_info').html(template(data));
        }
    }, window.overrideSettings);

    bootstrap.f7settings = Object.assign({
        id     : 'ru.bestion.lemurro',
        name   : 'Lemurro',
        version: '0.1.0',
        theme  : 'md',
        root   : '#app',
        panel  : {
            swipe: 'both'
        },
        touch  : {
            fastClicks: false
        },
        on     : {
            pageInit: function (event) {
                app.panel.close();
                bootstrap._initPage(event.name);
            }
        },
        routes : [
            {
                path: '/about',
                url : './pages/about.html'
            }, {
                path: '/home',
                url : './pages/home.html'
            }
        ]
    }, window.overrideF7Settings);

    bootstrap._bindJSerrors();

    app      = new Framework7(bootstrap.f7settings);
    $$       = Dom7;
    mainView = app.views.create('.view-main');

    $$('#js-api-version').text(bootstrap.settings.versionAPI);

    bootstrap._showLoginScreen();

    app.request.setup({
        cache      : false,
        crossDomain: true,
        timeout    : 20000,
        beforeSend : function (xhr) {
            if (xhr.requestUrl.substr(0, pathServerAPI.length) === pathServerAPI) {
                xhr.requestParameters.dataType = 'json';
                xhr.setRequestHeader('X-SESSION-ID', bootstrap.sessionID);
            }
        },
        error      : function (xhr, status) {
            app.preloader.hide();

            var message = 'Неизвестная ошибка';

            switch (status) {
                case 'timeout'    :
                    message = 'Время ожидания истекло';
                    break;

                case 'parsererror':
                    message = 'Ошибка парсера';
                    break;

                case 'abort'      :
                    message = 'Запрос был отменён';
                    break;

                case 'error'      :
                    message = 'Произошла ошибка сервера';
                    break;
            }

            app.dialog.alert(message, 'Ошибка запроса');
        }
    });

    bootstrap._run();
};