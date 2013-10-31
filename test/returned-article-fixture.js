var _ = require('lodash')

module.exports = makeFixture

function makeFixture(overrides) {
  return _.extend(
    { _id: null
    , tags: []
    , displayDate: null
    , subTitle: 'subTitle'
    , shortTitle: 'ShortTitle'
    , section: 'Section'
    , slug: 'slug'
    , longTitle: 'LongTitle'
    , type: 'article'
    , showDisplayDate: true
    , commentCount: 0
    , viewCount: 0
    , standfirst: null
    }, overrides)
}