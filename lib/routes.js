module.exports = [
  {
    path: '/chatter/feeds/record/me/feed-elements',
    name: 'myNewsFeed',
    method: 'GET',
    args: [],
  },
  {
    path: '/chatter/feeds/record/{{&id}}/feed-elements',
    name: 'recordFeed',
    method: 'GET',
    args: ['id']
  },
  {
    path: '/chatter/feeds/record/{{&id}}/feed-elements',
    name: 'groupFeed',
    method: 'GET',
    args: ['id']
  },
  {
    path: '/chatter/users/{{&id}}',
    name: 'userStatistics',
    method: 'GET',
    args: ['id']
  },
  {
    path: '/chatter/feed-elements/{{&id}}/capabilities/comments/items',
    name: 'postComment',
    method: 'POST',
    args: ['id', 'text'],
    body: function(args) {
      return {
        body: {
          messageSegments: [
            { type: 'Text', text: args.text }
          ]
        }
      };
    }
  },
  {
    path: '/chatter/feed-elements',
    name: 'postFeedItem',
    method: 'POST',
    args: ['id', 'text'],
    body: function(args) {
      return {
        body: {
          messageSegments: [
            { type: 'Text', text: args.text }
          ],
          feedElementType: 'FeedItem',
          subjectId: args.id
        }
      };
    }
  },
  {
    path: '/chatter/feed-elements/{{&id}}/capabilities/chatter-likes/items',
    name: 'likeFeedItem',
    method: 'POST',
    args: ['id']
  }
];
