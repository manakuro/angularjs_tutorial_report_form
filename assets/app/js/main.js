const angular = require('angular');
const $ = global.jQuery = require('jquery');
const _ = require('lodash');

// load modules
const app = angular.module('App', [require('angular-route'), require('angular-storage')]);

class MainController {
    constructor($scope, $routeParams, $filter, store) {
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.$filter = $filter;
        this.store = store;

        MainController.$inject = ['$scope', '$routeParams', '$filter', 'store'];

        // initialize
        this.todos = [];
        this.currentTitle = '';

        // filter
        this.filter = {
            done: { done: true },
            remaining: { done: false }
        };

        this.currentFilter;

        // count length
        this.where = this.$filter('filter');
        this.$scope.$watch('main.todos', (todos) => {
            this.allTodoLength = todos.length;
            this.doneLength = this.where(todos, this.filter.done);
            this.unDoneLength = this.allTodoLength - this.doneLength;
        }, true);

        // editing mode
        this.originTitle = '';
        this.editingTodo = '';

    }

    addTodo() {
        this.todos.push({
            title: this.currentTitle,
            done: false
        });

        this.currentTitle = '';
    }

    changeFilter(filter) {
        this.currentFilter = filter;
    }

    editTodo(todo) {
        this.originTitle = todo.title;
        this.editingTodo = todo;
    }

    doneEdit(todoForm) {
        if (todoForm.$invalid) {
            this.editingTodo.title = this.originTitle;
        }
        this.editingTodo = this.originTitle = null;
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
}


app.controller('MainController', MainController);
app.directive('mySelect', [function(){
    return function(scope, $el, attrs) {
        scope.$watch(attrs.mySelect, function(val){
            if (val) {
                $el[0].select();
            }
        });
    };
}]);







