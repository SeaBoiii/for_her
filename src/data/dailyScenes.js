export const dailyScenes = [
  {
    title: 'Episode: Soft Morning',
    mood: 'gentle',
    message: 'You are allowed to move slowly today. The world can wait a little.',
  },
  {
    title: 'Episode: Main Character Energy',
    mood: 'cute',
    message: 'Today’s reminder: you are cute, capable, and slightly dangerous when focused.',
  },
  {
    title: 'Episode: Quiet Confidence',
    mood: 'calm',
    message: 'You do not have to prove anything today. Just being you is already the plot.',
  },
  {
    title: 'Episode: Slow Coffee',
    mood: 'cozy',
    message: 'Hold something warm, breathe once, and let the morning catch up to you.',
  },
  {
    title: 'Episode: Tiny Wins',
    mood: 'encouraging',
    message: 'Small steps still count. Even getting out of bed deserves a soft round of applause.',
  },
  {
    title: 'Episode: The Soft Reset',
    mood: 'comforting',
    message: 'Bad start? The episode is not over. You are allowed to begin again whenever you want.',
  },
  {
    title: 'Episode: Snack Break',
    mood: 'playful',
    message: 'Whatever you are doing, eat something nice first. Genius runs on snacks, obviously.',
  },
  {
    title: 'Episode: You, But Glowing',
    mood: 'cute',
    message: 'Some days you sparkle without trying. Today’s probably one of them.',
  },
  {
    title: 'Episode: Gentle Reminder',
    mood: 'gentle',
    message: 'Drink water, fix your posture, and remember someone thinks you’re the whole drama.',
  },
  {
    title: 'Episode: Rainy Heart',
    mood: 'tender',
    message: 'If today feels grey, that’s okay. Rainy scenes always have the best background music.',
  },
  {
    title: 'Episode: Brave Little Lead',
    mood: 'encouraging',
    message: 'You handle more than people know. Quiet courage still counts as courage.',
  },
  {
    title: 'Episode: Cozy Chaos',
    mood: 'playful',
    message: 'Messy day? Embrace it. Even the chaos looks cute with you in the frame.',
  },
  {
    title: 'Episode: Slow Down',
    mood: 'calm',
    message: 'Nothing urgent will fall apart if you rest for ten minutes. Promise.',
  },
  {
    title: 'Episode: Worth It',
    mood: 'warm',
    message: 'You are worth the patience, the effort, and the long good-morning texts. All of it.',
  },
  {
    title: 'Episode: Permission to Smile',
    mood: 'cute',
    message: 'Here is your official permission slip to smile for no reason today.',
  },
  {
    title: 'Episode: Golden Hour',
    mood: 'romantic',
    message: 'You light up plain moments. Even an ordinary Tuesday feels softer with you in it.',
  },
  {
    title: 'Episode: Recharge',
    mood: 'comforting',
    message: 'Tired is allowed. Rest is not lazy, it is part of the storyline.',
  },
  {
    title: 'Episode: Tiny Confidence',
    mood: 'encouraging',
    message: 'Stand a little taller. The plot rewards people who keep showing up cutely.',
  },
  {
    title: 'Episode: Comfort Mode',
    mood: 'cozy',
    message: 'Soft clothes, warm drink, zero pressure. Today’s vibe is officially comfort mode.',
  },
  {
    title: 'Episode: Secretly Adored',
    mood: 'romantic',
    message: 'Somewhere, someone is thinking about you mid-task and smiling. Suspicious. Cute.',
  },
  {
    title: 'Episode: Keep Going',
    mood: 'encouraging',
    message: 'You’re closer than you feel. Save your progress, the next scene is yours.',
  },
  {
    title: 'Episode: Soft Power',
    mood: 'calm',
    message: 'Being gentle is not being weak. Your kindness is the strong type.',
  },
  {
    title: 'Episode: Look At You',
    mood: 'cute',
    message: 'Just checking in to remind you: you’re doing great and you’re ridiculously cute.',
  },
  {
    title: 'Episode: Cloud Nine',
    mood: 'dreamy',
    message: 'Daydream a little today. Your imagination is too pretty to keep switched off.',
  },
  {
    title: 'Episode: Unbothered',
    mood: 'playful',
    message: 'Drama you didn’t ask for? Step over it cutely. Not your storyline, not your problem.',
  },
  {
    title: 'Episode: Held',
    mood: 'tender',
    message: 'Consider yourself hugged from a distance. A long one. The kind you don’t rush.',
  },
  {
    title: 'Episode: Bright Side',
    mood: 'warm',
    message: 'Find one tiny good thing today. Bonus points if you smile while doing it.',
  },
  {
    title: 'Episode: Pep Talk',
    mood: 'encouraging',
    message: 'You. Can. Do. This. And after, snacks. That is the deal, that is the prize.',
  },
  {
    title: 'Episode: Gentle Night',
    mood: 'gentle',
    message: 'Whatever happened today, set it down. Tomorrow gets a fresh, soft opening scene.',
  },
  {
    title: 'Episode: Just Because',
    mood: 'romantic',
    message: 'No reason needed. You’re lovely, today and on the boring days too.',
  },
  {
    title: 'Episode: Slightly Iconic',
    mood: 'cute',
    message: 'Walk like the soundtrack is following you. Because honestly, it probably should be.',
  },
  {
    title: 'Episode: Soft Landing',
    mood: 'comforting',
    message: 'If today was a lot, land gently. You don’t have to hold it all at once.',
  },
]

/** Returns a stable scene for the current local day. */
export function getDailyScene(scenes = dailyScenes) {
  const d = new Date()
  const start = new Date(d.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((d - start) / 86400000)
  return scenes[dayOfYear % scenes.length]
}
