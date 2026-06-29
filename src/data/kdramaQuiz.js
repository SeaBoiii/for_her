export const quizQuestions = [
  {
    q: 'What kind of day is it?',
    options: [
      { label: 'Soft and slow ☁️', tag: 'rainy' },
      { label: 'Cozy and warm ☕', tag: 'cafe' },
      { label: 'Messy but cute 🌀', tag: 'chaos' },
      { label: 'I deserve everything 👑', tag: 'princess' },
    ],
  },
  {
    q: 'What snack would you choose?',
    options: [
      { label: 'A warm drink', tag: 'cafe' },
      { label: 'Comfort noodles', tag: 'rainy' },
      { label: 'Dessert before dinner', tag: 'chaos' },
      { label: 'Whatever I point at', tag: 'princess' },
    ],
  },
  {
    q: 'What kind of date sounds best?',
    options: [
      { label: 'Rain, umbrella, slow walk', tag: 'rainy' },
      { label: 'Café and quiet talking', tag: 'cafe' },
      { label: 'No plan, total chaos', tag: 'chaos' },
      { label: 'Spoiled all day', tag: 'princess' },
    ],
  },
  {
    q: 'What K-drama scene are you secretly hoping for?',
    options: [
      { label: 'The window-watching one', tag: 'rainy' },
      { label: 'The cozy café meet-up', tag: 'cafe' },
      { label: 'The almost-confession', tag: 'confession' },
      { label: 'The healing montage', tag: 'healing' },
    ],
  },
  {
    q: 'How much attention do you require today?',
    options: [
      { label: 'A gentle little bit', tag: 'cafe' },
      { label: 'A comforting amount', tag: 'rainy' },
      { label: 'Maximum, no notes', tag: 'princess' },
      { label: 'Surprise me 👀', tag: 'confession' },
    ],
  },
]

export const quizResults = {
  rainy: {
    title: 'Rainy Window Main Character',
    description:
      'Today feels like a soft, grey scene with good background music. You need comfort, a warm drink, and zero pressure. Just exist gently for a while.',
    next: 'The Rainy Window',
    to: '/rainy-window',
    emoji: '🌧',
  },
  cafe: {
    title: 'Cozy Café Female Lead',
    description:
      'You’re in slow-coffee mode. Warm light, quiet talks, a tiny plan for later. Go order a soft little date idea, you’ve earned it.',
    next: 'The Café',
    to: '/cafe',
    emoji: '☕',
  },
  chaos: {
    title: 'Soft Chaos Side Quest',
    description:
      'Cute, messy, slightly unhinged energy today. Perfect. Embrace it. The plot was getting too calm anyway. Go play something silly.',
    next: 'The Arcade Corner',
    to: '/arcade',
    emoji: '🌀',
  },
  princess: {
    title: 'Princess Treatment Episode',
    description:
      'You require spoiling and you’re right to. Go claim something nice, sit pretty, and let the world bring snacks to you.',
    next: 'Coupon Corner',
    to: '/coupon-corner',
    emoji: '👑',
  },
  confession: {
    title: 'Almost Confession Scene',
    description:
      'There’s a soft tension in the air, the good kind. Today’s for tiny truths and shy smiles. Go read a note that says too much.',
    next: 'The Letter Box',
    to: '/letter-box',
    emoji: '🤍',
  },
  healing: {
    title: 'Healing Drama Lead',
    description:
      'Slow recovery arc, soft soundtrack, hopeful ending. Be kind to yourself today. A song that feels like a scene would suit you well.',
    next: 'The Playlist Bench',
    to: '/playlist-bench',
    emoji: '🌱',
  },
}

/** Picks the result tag that appears most often; ties resolve by first seen. */
export function tallyResult(tags) {
  const counts = {}
  let best = tags[0]
  let bestCount = 0
  for (const t of tags) {
    counts[t] = (counts[t] || 0) + 1
    if (counts[t] > bestCount) {
      best = t
      bestCount = counts[t]
    }
  }
  return quizResults[best] || quizResults.cafe
}
