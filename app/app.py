from flask import Flask, render_template, request
from flask_babel import Babel
from flask_babel import gettext as _

app = Flask(__name__)

app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'
app.config['LANGUAGES'] = ['en', 'zh']


def get_locale():
    return request.args.get('lang', 'en')


babel = Babel(app, locale_selector=get_locale)


@app.route('/', methods=['GET', 'POST'])
def index():
    ## return render_template('test.html', current_locale=get_locale())
    if request.method == 'POST':
        user_input = request.form['user_input']
        return render_template('index.html', user_input=user_input)
    return render_template('index.html', user_input=None)


if __name__ == '__main__':
    app.run(debug=True)
