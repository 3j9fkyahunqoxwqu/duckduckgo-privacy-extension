const Parent = window.DDG.base.Model;

function TrackerListTopBlocked (attrs) {

    this.numCompanies = attrs.numCompanies

    Parent.call(this, attrs);
};


TrackerListTopBlocked.prototype = $.extend({},
  Parent.prototype,
  {

      modelName: 'trackerListTopBlocked',

      getTopBlocked: function () {
          return new Promise((resolve, reject) => {
          this.fetch({getTopBlocked: this.numCompanies}).then((list) => {
              this.companyList = list

              // find company with largest number of trackers
              let maxCount = 0;
              if (this.companyList && this.companyList.length) {
                  maxCount = this.companyList[0].count;
              }
              
              this.companyListMap = this.companyList.map(
                  (company) => {
                      // calc max using pixels instead of % to make margins easier
                      // max width: 300 - (horizontal padding in css) = 260
                      return {
                        name: company.name,
                        count: company.count,
                        px: Math.floor(company.count * 260 / maxCount)
                      };
                  });
              resolve();
          })
          })
      }
  }
);


module.exports = TrackerListTopBlocked;

