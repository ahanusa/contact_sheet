// Code goes here

angular
  .module('ContactSheet', [])
  .controller('CountCtrl', function CountCtrl() {
    this.contributions = [
      {
        _id: 1,
        imageUrl: 'foo'
      }, {
        _id: 2,
        imageUrl: 'bar'
      }, {
        _id: 3,
        imageUrl: 'baz'
      }, {
        _id: 4,
        imageUrl: 'chic'
      }, {
        _id: 5,
        imageUrl: 'le'
      }
    ];
    this.selectContribution = function (event) {
      console.log("SELECTED!!", event);
    };
    this.addContribution = function () {
      var key = uuid();
      var contribution = {
        _id: key,
        imageUrl: 'fff'
      };
      this
        .contributions
        .push(contribution);
    };
  })
  .component('contactSheetItem', {
    bindings: {
      contribution: '=',
      onContributionSelected: "&"
    },
    controller: function () {
      this.isSelected = false;
      this.selectItem = function (event) {
        this.isSelected = !this.isSelected;
        this.onContributionSelected(event);
      };
    },
    template: `<div class="contact-sheet-item"
         ng-class="{ selected: $ctrl.isSelected }"
         ng-click="$ctrl.selectItem({ $event: $ctrl.contribution })"
         >{{ $ctrl.contribution.imageUrl }}
      </div>`
  })
  .component('contactSheet', {
    bindings: {
      contributions: '<',
      onContributionSelected: "&"
    },
    controller: function () {
      function onChanges(a) {
        console.log("a", a);
        console.log("CHANGES!", this.contributions.length);;
        // console.log("Is First Change!", isFirstChange);
      }
      function onInit() {
        console.log("ON INIT", this.contributions.length);
      }
      this.$onChanges = onChanges;
      this.$onInit = onInit;
    },
    template: `<div class="contactSheet">
        <contact-sheet-item ng-repeat="cont in $ctrl.contributions"
          contribution="cont"
          on-contribution-selected="$ctrl.onContributionSelected($event)"
        </contact-sheet-item>
      </div>`
  });

document.addEventListener('DOMContentLoaded', function () {
  angular.bootstrap(document, ['ContactSheet']);
});