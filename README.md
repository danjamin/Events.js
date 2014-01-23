Events.js
=========

Event dispatcher that uses Container.js

## Usage

The event dispatcher is intended to aid in code organization and testability by enabling you to organize your JavaScript code into small responsive blocks.  When paired with Container.js, the code is very clean and testable, as you can mock the dependencies being used in small blocks of code.

First install bower components:

    bower install

Then, as an example:

```html
<html>
    <head>
        <title>Clothes Example (Events.js + Container.js)</title>
        <script src="../bower_components/container.js/src/Container.js" type="text/javascript"></script>
        <script src="../bower_components/container.js/src/Containerfile.js" type="text/javascript"></script>
        <script src="../src/Events.js" type="text/javascript"></script>
        <script src="../src/Observer.js" type="text/javascript"></script>
    </head>

    <body>
        <select id='outfit'>
            <option value="a blue dress">a blue dress</option>
            <option value="pants">pants</option>
            <option value="a sweatshirt">a sweatshirt</option>
        </select>
        <button id='show-outfit'>Show outfit</button>
        <h3 id='talk'></h3>
        <ul id='log'></ul>

        <script type="text/javascript">
            window.Containerfile({
                'outfit_id': 'outfit',
                'talk_id': 'talk',
                'log_id': 'log',
                'outfit_select': function(c) {
                    return c.get('document').getElementById(c.get('outfit_id'));
                },
                'talk_h3': function(c) {
                    return c.get('document').getElementById(c.get('talk_id'));
                },
                'log_ul': function(c) {
                    return c.get('document').getElementById(c.get('log_id'));
                }
            });

            // Event listener on show button
            var showOutfitBtn = document.getElementById('show-outfit');
            showOutfitBtn.addEventListener('click', function(e) {
                e.container.get('events').dispatch('outfit.show', {
                    'outfit': e.container.get('outfit_select').value
                });
            }, false);

            // Person.js
            Person
                .Service('person', ['talk_h3'])
                .Observe('outfit.show', 'talkAboutOutfit');
            function Person(talk) {
                this.talk = talk;
            }
            Person.prototype.talkAboutOutfit = function(e) {
                this.talk.innerText = 'I am wearing ' + e.outfit + '.';
            };

            // Log.js
            Log
                .Service('log', ['document', 'log_ul'])
                .Observe('outfit.show', 'logShowAction');
            function Log(document, log) {
                this.document = document;
                this.log = log;
            }
            Log.prototype.logShowAction = function(e) {
                var li = this.document.createElement('li');
                li.innerText = 'You talked about "' + e.outfit + '".';
                this.log.insertBefore(li, this.log.firstChild);
            };
        </script>
    </body>
</html>
```


## Implications

- Adds the chainable **Observe** method to the Function prototype
