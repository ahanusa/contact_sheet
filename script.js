
angular
  .module('ContactSheet', ['ngRedux'])
  .config(($ngReduxProvider) => {
    var rootReducer = Redux.combineReducers({
      contributions: contributionsReducer,
      selectedContributions: selectedContributionsReducer
    });
    $ngReduxProvider.createStoreWith(rootReducer);
  })
  .run(($ngRedux) => {
    var contributions = [ { _id: 1, imageUrl: 'foo' }, { _id: 2, imageUrl: 'bar' }, { _id: 3, imageUrl: 'baz' }, { _id: 4, imageUrl: 'chic' }, { _id: 5, imageUrl: 'le' } ];
    contributions.forEach(c => $ngRedux.dispatch(contributionActions.add(c)));
  })
  .controller('ContactSheetCtrl', class ContactSheetCtrl {
    constructor($ngRedux) {
      this.$ngRedux = $ngRedux;
      this.unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
    }

    $onDestroy() {
      this.unsubscribe();
    }

    selectedCount() {
      return Object.keys(this.selectedContributions).length;
    }

    mapStateToThis(state) {
      return {
        contributions: state.contributions,
        selectedContributions: state.selectedContributions
      };
    }

    selectContribution(contribution) {
      this.$ngRedux.dispatch(contributionActions.select(contribution));
    }

    deselectContribution(contribution) {
      this.$ngRedux.dispatch(contributionActions.deselect(contribution));
    }

    addContribution() {
      var key = uuid();
      var contribution = { _id: key, imageUrl: 'fff' };
      this.$ngRedux.dispatch(contributionActions.add(contribution));
    };
  })
  .component('contactSheetItem', {
    bindings: {
      contribution: '=',
      onContributionSelected: "&",
      onContributionDeselected: "&",
    },
    controller: class contactSheetItemCtrl {
      constructor() {
        this.isSelected = false;
      }

      itemClicked(event) {
        this.isSelected = !this.isSelected;
        if (!this.isSelected) {
          this.onContributionDeselected(event);
        } else {
          this.onContributionSelected(event);
        }
      }
    },
    template: `<div class="contact-sheet-item"
         ng-class="{ selected: $ctrl.isSelected }"
         ng-click="$ctrl.itemClicked({ $event: $ctrl.contribution })"
         >{{ $ctrl.contribution.imageUrl }}
      </div>`
  })
  .component('contactSheet', {
    bindings: {
      contributions: '<',
      onContributionSelected: "&",
      onContributionDeselected: "&"
    },
    template: `<div class="contactSheet">
        <contact-sheet-item ng-repeat="cont in $ctrl.contributions"
          contribution="cont"
          on-contribution-selected="$ctrl.onContributionSelected($event)"
          on-contribution-deselected="$ctrl.onContributionDeselected($event)"
        </contact-sheet-item>
      </div>`
  });

document.addEventListener('DOMContentLoaded', function () {
  angular.bootstrap(document, ['ContactSheet']);
});
