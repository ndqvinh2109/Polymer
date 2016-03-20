(function(document) {
    'use strict';

    var app = document.querySelector('#app');
    app.items = [];

    app.firebaseURL = 'https://blistering-torch-3471.firebaseio.com';
    app.firebaseProvider = 'google';

    app.addItem = function(event) {
        event.preventDefault();
        this.ref.push({
            done: false,
            text: app.newItemValue
        });
        app.newItemValue = '';
    };

    app.toggleItem = function(event) {
        this.ref.
        child(event.model.item.id).
        update({ done: event.model.item.done });
    };

    app.deleteItem = function(event) {
        this.ref.child(event.model.item.id).remove();
    };

    app.onFirebaseError = function(event) {
        this.$.errorToast.text = event.detail.message;
        this.$.errorToast.show();
    };

    app.onFirebaseLogin = function(event) {
        this.ref = new Firebase(this.firebaseURL + '/user/' +
            event.detail.user.uid);
        this.ref.on('value', function(snapshot) {
            app.updateItems(snapshot);
        });
    };

    app.updateItems = function(snapshot) {
        this.items = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key();
            app.push('items', item);
        });
    }



})(document);