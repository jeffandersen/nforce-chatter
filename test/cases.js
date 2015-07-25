module.exports = {
  'myNewsFeed': [
    {
      args: {},
      expectedPath: '/services/data/v32.0/chatter/feeds/record/me/feed-elements',
      expectedMethod: 'GET',
    }
  ],
  'groupFeed': [
    {
      args: {id: 'FAKE_GROUP'},
      expectedPath: '/services/data/v32.0/chatter/feeds/record/FAKE_GROUP/feed-elements',
      expectedMethod: 'GET',
    },
  ],
  'recordFeed': [
    {
      args: {id: 'FAKE_RECORD'},
      expectedPath: '/services/data/v32.0/chatter/feeds/record/FAKE_RECORD/feed-elements',
      expectedMethod: 'GET',
    },
  ],
  'userStatistics': [
    {
      args: {id: 'FAKE_USER'},
      expectedPath: '/services/data/v32.0/chatter/users/FAKE_USER',
      expectedMethod: 'GET',
    },
  ],
  'postComment': [
    {
      args: {id: 'FAKE_RECORD', text: 'Hello world'},
      expectedPath: '/services/data/v32.0/chatter/feed-elements/FAKE_RECORD/capabilities/comments/items',
      expectedMethod: 'POST',
      expectedBody: {
        body: {
          messageSegments: [
            { type: 'Text', text: 'Hello world' }
          ]
        }
      }
    },
    {
      args: {id: 'FAKE_RECORD' },
      expectedThrow: 'Arguments required: text'
    },
    {
      args: {},
      expectedThrow: 'Arguments required: id, text'
    },
  ],
  'postFeedItem': [
    {
      args: {id: 'FAKE_ITEM', text: 'Hello world'},
      expectedPath: '/services/data/v32.0/chatter/feed-elements',
      expectedMethod: 'POST',
      expectedBody: {
        body: {
          messageSegments: [
            { type: 'Text', text: 'Hello world' }
          ],
          feedElementType: 'FeedItem',
          subjectId: 'FAKE_ITEM'
        }
      }
    },
    {
      args: {id: 'FAKE_ITEM'},
      expectedThrow: 'Arguments required: text'
    },
    {
      args: {},
      expectedThrow: 'Arguments required: id, text'
    },
  ],
  'likeFeedItem': [
    {
      args: {id: 'FAKE_RECORD'},
      expectedPath: '/services/data/v32.0/chatter/feed-elements/FAKE_RECORD/capabilities/chatter-likes/items',
      expectedMethod: 'POST'
    },
    {
      args: {},
      expectedThrow: 'Arguments required: id'
    }
  ]
};
