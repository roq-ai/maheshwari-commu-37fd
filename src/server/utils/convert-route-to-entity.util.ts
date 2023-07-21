const mapping: Record<string, string> = {
  communities: 'community',
  follows: 'follow',
  'identity-cards': 'identity_card',
  posts: 'post',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
