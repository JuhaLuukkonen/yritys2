# React - Django - Organization register - Juha Luukkonen

Based on this source code: https://github.com/valentinogagliardi/django-rest-react-pycon

Deployed soon:

## Development

Install the dependencies:

```bash
pip install -r requirements/dev.txt
```

Run the project:

````bash
export DJANGO_SETTINGS_MODULE="django_rest_react.settings.dev"; export SECRET_KEY='CHANGEME!' 
python manage.py runserver
````

## Coverage

````bash
export DJANGO_SETTINGS_MODULE="django_rest_react.settings.dev"; export SECRET_KEY='CHANGEME!' 
coverage run --source='custom_webpack_conf_2' manage.py test
coverage report
coverage html
````

### Running the React project

First, `cd` the  create_react_app_1 directory and run:

```bash
npm install
```

Then, you just need to run the app via:

```bash
npm start
```

##  &#729;&#729;&#729;&#647;u&#477;&#633;&#477;&#607;&#607;&#7433;p &#654;l&#477;&#647;&#477;ld&#623;o&#596; &#387;u&#7433;&#613;&#647;&#477;&#623;os &#633;o&#607; &#653;ou pu&#8704;

https://www.youtube.com/watch?v=GxRnenQYG7I

## [Python 3.8.1 ](https://www.python.org/downloads/release/python-381/)
