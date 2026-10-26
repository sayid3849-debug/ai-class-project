import { academyQuizzes } from './quizQuestions';
export type Question = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  hint?: string;
  visual?: boolean;
};
export type Lesson = {
  id: string;
  title: string;
  kicker: string;
  text: string;
  tips: string[];
  question: Question;
  diagram: 'field' | 'positions' | 'dribble' | 'pass' | 'shoot' | 'control';
  matching?: boolean;
};
export type Level = {
  id: number;
  name: string;
  theme: string;
  color: string;
  description: string;
  lessons: Lesson[];
  quiz: Question[];
  challenge: number;
};
const q = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  visual = false,
): Question => ({ prompt, options, answer, explanation, visual });
export const basics = [
  q(
    'How do you score a goal?',
    [
      'Kick the ball near the goal',
      'Get the whole ball over the goal line, between the posts',
      'Touch the goalpost',
    ],
    1,
    'A goal counts when the whole ball crosses the line between the posts and under the crossbar.',
  ),
  q(
    'How many players are on each team in a full-size match?',
    ['5 players', '11 players', '15 players'],
    1,
    'Each full-size team has 11 players, including the goalkeeper. Children often play smaller-sided games.',
  ),
  q(
    'How long is a standard adult soccer match?',
    ['Two 45-minute halves', 'One 20-minute half', 'Three 30-minute periods'],
    0,
    'Adult matches have two 45-minute halves, plus added time. Youth matches are usually shorter.',
  ),
  q(
    'Can an outfield player deliberately use their hands to play the ball?',
    ['Yes', 'No'],
    1,
    'Outfield players use their feet, legs, body, and sometimes head, but cannot deliberately handle the ball. Follow your youth league’s heading rules.',
  ),
  q(
    'What happens at the center spot?',
    [
      'The match starts with a kick-off',
      'Only goalkeepers stand there',
      'Every throw-in starts there',
    ],
    0,
    'Kick-offs start each half and restart the game after a goal.',
    true,
  ),
];
export const positions = [
  q(
    'Who protects the goal?',
    ['Forward', 'Goalkeeper', 'Midfielder'],
    1,
    'The goalkeeper protects the goal and may handle the ball inside their own penalty area.',
  ),
  q(
    'Which player connects defense and attack?',
    ['Midfielder', 'Goalkeeper', 'Referee'],
    0,
    'Midfielders help win the ball, pass to teammates, and support attacks.',
  ),
  q(
    'What is a defender’s main job?',
    ['Help stop the other team scoring', 'Always stay in the other goal', 'Take every shot'],
    0,
    'Defenders protect space near their goal and work together to stop attacks.',
  ),
  q(
    'Who usually plays closest to the opponent’s goal?',
    ['Goalkeeper', 'Forward / striker', 'Defender'],
    1,
    'Forwards find space, create chances, and try to score. Everyone can help attack and defend.',
  ),
  q(
    'Can players help outside their usual position?',
    ['Yes, soccer is a team game', 'No, they must stand still'],
    0,
    'Positions are starting roles, not fixed spots. Players move and help one another.',
    true,
  ),
];
export const skills = [
  q(
    'How should you dribble in a crowded space?',
    ['Use small, close touches', 'Kick as hard as possible', 'Close your eyes'],
    0,
    'Small touches keep the ball close so you can change direction.',
  ),
  q(
    'Which part of the foot is useful for an accurate short pass?',
    ['Inside of the foot', 'Heel only', 'Outside ankle'],
    0,
    'The broad inside surface helps you guide the ball toward a teammate.',
  ),
  q(
    'Where does your non-kicking foot go for a controlled shot?',
    ['Beside the ball, pointing toward the target', 'Far behind you', 'On top of the ball'],
    0,
    'Plant your support foot beside the ball and focus on accuracy before power.',
  ),
  q(
    'What is a soft first touch?',
    [
      'Stopping the ball with your hand',
      'Cushioning the ball so it stays nearby',
      'Kicking it far away',
    ],
    1,
    'Relax your receiving foot and gently give way as the ball arrives.',
  ),
  q(
    'Should you sometimes look up while dribbling?',
    ['Yes, to spot space and teammates', 'No, always look down'],
    0,
    'Glance up between touches to see the game around you.',
  ),
];
export const rules = [
  q(
    'A defender last touches the ball before it crosses the sideline. What next?',
    ['A throw-in for the other team', 'A penalty', 'A kick-off'],
    0,
    'The team that did not touch it last gets a throw-in from where it left the field.',
  ),
  q(
    'A defender last touches the ball over their own goal line, outside the goal. What next?',
    ['Goal kick', 'Corner kick for the attackers', 'Kick-off'],
    1,
    'Attackers take a corner when a defender touches the ball last before it crosses that goal line without a goal.',
  ),
  q(
    'An attacker last touches the ball over the opponent’s goal line without scoring. What next?',
    ['A goal kick', 'A throw-in', 'A penalty'],
    0,
    'The defending team gets a goal kick.',
  ),
  q(
    'Is standing in an offside position always an offense?',
    ['Yes', 'No'],
    1,
    'It becomes an offense only when a player in an offside position at a teammate’s touch becomes involved in play. Some youth games do not use offside.',
  ),
  q(
    'What should you do if another player falls?',
    ['Laugh and run away', 'Check they are okay and tell an adult if needed', 'Argue with them'],
    1,
    'Kindness and fair play matter more than winning. Let the referee or an adult help.',
  ),
];
function lesson(
  id: string,
  title: string,
  kicker: string,
  text: string,
  tips: string[],
  question: Question,
  diagram: Lesson['diagram'],
  matching = false,
): Lesson {
  return { id, title, kicker, text, tips, question, diagram, matching };
}
export const levels: Level[] = [
  {
    id: 1,
    name: 'Rookie Player',
    theme: 'THE FIRST TOUCH',
    color: '#b9dc8c',
    description: 'Big dreams start with the basics. Get to know the beautiful game.',
    challenge: 0,
    lessons: [
      lesson(
        '1-1',
        'Meet the beautiful game',
        'WHAT IS SOCCER?',
        'Soccer is a team game played with a ball and two goals. Work together to move the ball and score in the other team’s goal. The team with more goals wins!',
        [
          'The whole ball must cross the goal line for a goal.',
          'Try to keep the ball away from your own goal.',
          'Have fun and help your teammates.',
        ],
        basics[0],
        'field',
      ),
      lesson(
        '1-2',
        'One team, one dream',
        'PLAYERS & MATCH TIME',
        'A full-size team has 11 players: 10 outfield players and 1 goalkeeper. A standard adult match has two 45-minute halves with a break between them.',
        [
          'Children often play 4v4, 5v5, 7v7, or 9v9.',
          'Youth games have shorter halves. Ask your coach about your rules.',
          'Everyone gets better with practice.',
        ],
        basics[1],
        'positions',
      ),
      lesson(
        '1-3',
        'Feet first!',
        'HOW TO PLAY THE BALL',
        'Outfield players move the ball with their feet, legs, and body. They cannot deliberately use their hands or arms. A goalkeeper can handle the ball inside their own penalty area, with special rules.',
        [
          'Use your feet to pass, dribble, and shoot.',
          'Youth heading restrictions vary. Do not practice heading here.',
          'Listen to your coach and the referee.',
        ],
        basics[3],
        'control',
      ),
      lesson(
        '1-4',
        'Explore your pitch',
        'KNOW YOUR PLAYGROUND',
        'The sidelines run along the sides. The goal lines are at the ends. The center spot is for kick-offs. The big box at each end is the penalty area.',
        [
          'Tap the field markers to learn about each area.',
          'The center circle gives space at kick-off.',
          'When the whole ball crosses a boundary, play restarts.',
        ],
        basics[4],
        'field',
      ),
    ],
    quiz: academyQuizzes[1],
  },
  {
    id: 2,
    name: 'Rising Star',
    theme: 'FIND YOUR PLACE',
    color: '#89bdc6',
    description: 'Eleven players. One team. Discover how every position makes a difference.',
    challenge: 1,
    lessons: [
      lesson(
        '2-1',
        'The last line of defense',
        'GOALKEEPER',
        'The goalkeeper guards the goal, stops shots, and helps start attacks. They are the only player allowed to handle the ball in their own penalty area, with special restrictions.',
        [
          'Get ready with bent knees and eyes on the ball.',
          'Use your voice to help teammates.',
          'Practice gentle saves with an adult.',
        ],
        positions[0],
        'positions',
      ),
      lesson(
        '2-2',
        'Protect your team',
        'DEFENDERS',
        'Defenders help stop the other team scoring. They stay between attackers and their own goal, watch the ball, and pass safely when they win it.',
        [
          'Stay balanced and do not rush into a tackle.',
          'Look for a teammate when you win the ball.',
          'Never push, trip, or kick another player.',
        ],
        positions[2],
        'positions',
      ),
      lesson(
        '2-3',
        'Connect the game',
        'MIDFIELDERS & FORWARDS',
        'Midfielders connect defense with attack. They find space and pass. Forwards play farther up the field to create chances and score. All players help the team!',
        [
          'Midfielders look around before receiving a pass.',
          'Forwards move into open space.',
          'Positions can change as the game moves.',
        ],
        positions[1],
        'positions',
      ),
      lesson(
        '2-4',
        'Build your lineup',
        'POSITION LAB',
        'Put the right role in the right zone. Drag a role onto the field, or select a role and tap a zone. This is a simple formation, with your team attacking toward the top.',
        [
          'Goalkeeper: nearest your own goal.',
          'Defender: in front of the goalkeeper.',
          'Midfielder: the middle. Forward: nearest the opponent’s goal.',
        ],
        positions[3],
        'positions',
        true,
      ),
    ],
    quiz: academyQuizzes[2],
  },
  {
    id: 3,
    name: 'Skilled Player',
    theme: 'MAKE YOUR MOVE',
    color: '#e6bd79',
    description: 'Turn little touches into big skills. Build control, accuracy, and confidence.',
    challenge: 2,
    lessons: [
      lesson(
        '3-1',
        'Make the ball your friend',
        'DRIBBLING',
        'Dribbling means moving with the ball. Take small touches with both feet. Keep the ball near you and look up between touches to find space.',
        [
          'Start slowly. Close control comes before speed.',
          'Use the inside and outside of your feet.',
          'Bend your knees when changing direction.',
        ],
        skills[0],
        'dribble',
      ),
      lesson(
        '3-2',
        'Share the magic',
        'PASSING',
        'A pass sends the ball to a teammate. Put your support foot next to the ball. Turn your kicking foot outward and use its inside to guide the ball.',
        [
          'Look at your teammate before passing.',
          'Use a gentle swing for a short pass.',
          'Follow through toward your target.',
        ],
        skills[1],
        'pass',
      ),
      lesson(
        '3-3',
        'Find your target',
        'SHOOTING',
        'A good shot starts with balance. Place your non-kicking foot beside the ball, point it at your target, and make controlled contact. Accuracy comes before power.',
        [
          'Keep your eyes on the ball when you strike.',
          'Follow through toward the goal.',
          'Only shoot at a safe target with adult supervision.',
        ],
        skills[2],
        'shoot',
      ),
      lesson(
        '3-4',
        'The perfect first touch',
        'BALL CONTROL',
        'When a pass comes to you, soften your foot to cushion the ball. A good first touch keeps it nearby and sets up your next move.',
        [
          'Move toward the path of the ball.',
          'Relax your receiving foot.',
          'Guide the ball into a safe space.',
        ],
        skills[3],
        'control',
      ),
    ],
    quiz: academyQuizzes[3],
  },
  {
    id: 4,
    name: 'Soccer Expert',
    theme: 'THINK LIKE A PLAYER',
    color: '#bea8d8',
    description: 'Read the game, learn the rules, and be the teammate everyone wants.',
    challenge: 3,
    lessons: [
      lesson(
        '4-1',
        'Back in the game',
        'THROW-INS & RESTARTS',
        'If the whole ball crosses a sideline, the other team to the last player who touched it gets a throw-in. Use both hands, bring the ball from behind and over your head, and keep part of each foot on the line or ground outside it.',
        [
          'A defender last touches it over their own goal line: corner kick.',
          'An attacker last touches it over the goal line without scoring: goal kick.',
          'A goal restarts play with a kick-off for the other team.',
        ],
        rules[0],
        'field',
      ),
      lesson(
        '4-2',
        'Play fair',
        'FOULS, FREE KICKS & CARDS',
        'Pushing, tripping, and unfair tackles can be fouls. The referee may award a free kick. A direct-free-kick foul by a defender inside their own penalty area leads to a penalty kick.',
        [
          'A yellow card is a warning.',
          'A red card means the player must leave the game.',
          'Never try dangerous tackles. Youth rules and card systems can vary.',
        ],
        q(
          'A direct-free-kick foul happens inside the defending team’s penalty area. What is awarded?',
          ['A penalty kick', 'A corner', 'A throw-in'],
          0,
          'A penalty kick is awarded for a direct-free-kick foul by a defending player inside their own penalty area.',
        ),
        'field',
      ),
      lesson(
        '4-3',
        'Time your run',
        'OFFSIDE, MADE SIMPLE',
        'In the opponent’s half, you may be in an offside position if you are nearer the goal line than both the ball and the second-last opponent when a teammate plays the ball. It is only an offense if you then get involved in play.',
        [
          'Being in that position alone is not a foul.',
          'You cannot be offside directly from a throw-in, corner, or goal kick.',
          'Some younger age groups do not use offside. Ask your coach.',
        ],
        rules[3],
        'positions',
      ),
      lesson(
        '4-4',
        'Better together',
        'TEAMWORK & SPORTSMANSHIP',
        'Great players help the people around them. Pass to teammates, celebrate effort, and respect the referee. Mistakes are a normal part of learning.',
        [
          'Encourage a teammate after a missed shot.',
          'Check on a player who falls.',
          'Win with kindness. Lose with respect.',
        ],
        rules[4],
        'pass',
      ),
    ],
    quiz: academyQuizzes[4],
  },
  {
    id: 5,
    name: 'Soccer Champion',
    theme: 'YOUR CHAMPION MOMENT',
    color: '#e5cb77',
    description: 'Bring everything together. Your biggest soccer adventure is here.',
    challenge: 4,
    lessons: [
      lesson(
        '5-1',
        'Read the field',
        'POSITION RECOGNITION',
        'Look at the formation. Your goalkeeper guards your goal, defenders protect space, midfielders connect play, and forwards look for chances. Tap the players to review their jobs.',
        [
          'Watch where your teammates are.',
          'Move into space to help them.',
          'Everyone has an important role.',
        ],
        positions[4],
        'positions',
        true,
      ),
      lesson(
        '5-2',
        'Make the right call',
        'MATCH SCENARIOS',
        'Imagine a defender blocks a shot and the ball crosses their goal line beside the goal. The attackers get a corner. Think about which line the ball crossed and who touched it last.',
        [
          'Sideline: throw-in.',
          'Goal line, defender last: corner.',
          'Goal line, attacker last, no goal: goal kick.',
        ],
        rules[1],
        'field',
      ),
      lesson(
        '5-3',
        'Put it all together',
        'YOUR SKILL CIRCUIT',
        'Dribble through cones, pass to a partner or safe wall, receive with a soft touch, and finish with a controlled shot. Go slowly and focus on each movement.',
        [
          'Look up while dribbling.',
          'Use the inside of the foot to pass.',
          'Plant your support foot beside the ball to shoot.',
        ],
        skills[2],
        'dribble',
      ),
      lesson(
        '5-4',
        'A champion’s mindset',
        'READY FOR THE FINAL',
        'A champion keeps learning. Take your time in the final 15-question quiz. You need 80% to pass. Then finish your Complete Player Challenge to earn your champion badge and certificate.',
        [
          'Review any lesson whenever you like.',
          'Ask an adult to help with safe practice.',
          'Be proud of the work you put in.',
        ],
        rules[4],
        'pass',
      ),
    ],
    quiz: academyQuizzes[5],
  },
];
export const challenges = [
  {
    title: 'Dribbling Master',
    skill: 'Dribbling & ball control',
    time: '8 min',
    difficulty: 'Beginner',
    diagram: 'dribble',
    steps: [
      'Place five cones in a straight line, about two big steps apart.',
      'Dribble between the cones.',
      'Use small touches and keep the ball close.',
      'Repeat the course three times.',
    ],
    tip: 'No cones? Use five soft markers. Try both feet.',
    goal: 3,
    unit: 'rounds',
  },
  {
    title: 'Passing Accuracy',
    skill: 'Passing technique',
    time: '10 min',
    difficulty: 'Beginner',
    diagram: 'pass',
    steps: [
      'Find a safe wall or a practice partner.',
      'Stand a short distance away.',
      'Use the inside of your foot to pass toward a target.',
      'Try to complete 10 accurate passes.',
    ],
    tip: 'Start close to your target. Take one step back when it feels easy.',
    goal: 10,
    unit: 'accurate passes',
  },
  {
    title: 'Shooting Challenge',
    skill: 'Shooting accuracy',
    time: '8 min',
    difficulty: 'Growing',
    diagram: 'shoot',
    steps: [
      'Set up a safe target away from people and windows.',
      'Take five controlled shots.',
      'Plant your non-kicking foot beside the ball.',
      'Record how many shots reach the target.',
    ],
    tip: 'Accuracy beats power. A small, balanced swing is a great start.',
    goal: 5,
    unit: 'shots taken',
  },
  {
    title: 'Ball Control Challenge',
    skill: 'First touch',
    time: '8 min',
    difficulty: 'Growing',
    diagram: 'control',
    steps: [
      'Ask a partner to roll the ball gently toward you.',
      'Cushion the ball with your foot.',
      'Keep it nearby and pass it back.',
      'Repeat 10 times.',
    ],
    tip: 'Relax your foot as the ball arrives, like catching an egg gently.',
    goal: 10,
    unit: 'first touches',
  },
  {
    title: 'Complete Player Challenge',
    skill: 'Your complete skill circuit',
    time: '15 min',
    difficulty: 'Champion',
    diagram: 'dribble',
    steps: [
      'Dribble around five cones.',
      'Make 10 accurate passes to a partner or safe wall.',
      'Receive and control the ball 10 times.',
      'Take five controlled shots at a safe target.',
    ],
    tip: 'Take breaks between skills. This is about learning, not speed.',
    goal: 4,
    unit: 'stations',
  },
] as const;
export const badges = [
  { id: 'first', name: 'First Goal', description: 'Complete your first lesson.', icon: 'flag' },
  {
    id: 'brain',
    name: 'Soccer Brain',
    description: 'Score 100% on any academy quiz.',
    icon: 'brain',
  },
  {
    id: 'dribble',
    name: 'Dribbling Star',
    description: 'Complete the Dribbling Master challenge.',
    icon: 'zap',
  },
  { id: 'team', name: 'Team Player', description: 'Complete the teamwork lesson.', icon: 'users' },
  {
    id: 'practice',
    name: 'Practice Pro',
    description: 'Complete all five training missions.',
    icon: 'target',
  },
  {
    id: 'champion',
    name: 'Soccer Champion',
    description: 'Complete all five academy levels.',
    icon: 'trophy',
  },
];
export const coachReports = {
  Dribbling: {
    scores: [
      ['Ball control', 8],
      ['Movement', 7],
      ['Direction changes', 6],
    ],
    good: 'Small touches keep the illustrated ball close to the player.',
    improve: 'Try using both feet when changing direction.',
    next: 'Practice dribbling between five cones using both feet.',
    diagram: 'dribble',
    challenge: 0,
  },
  Passing: {
    scores: [
      ['Foot position', 8],
      ['Balance', 7],
      ['Follow-through', 6],
    ],
    good: 'The example uses the inside of the foot for a controlled pass.',
    improve: 'Point your support foot toward your teammate.',
    next: 'Aim for 10 gentle, accurate passes to a safe target.',
    diagram: 'pass',
    challenge: 1,
  },
  Shooting: {
    scores: [
      ['Support foot', 8],
      ['Body posture', 7],
      ['Controlled contact', 6],
    ],
    good: 'The example shows a balanced approach toward the ball.',
    improve: 'Place your support foot beside the ball before striking.',
    next: 'Take five controlled shots. Count the ones on target.',
    diagram: 'shoot',
    challenge: 2,
  },
  'Ball Control': {
    scores: [
      ['First touch', 8],
      ['Ball positioning', 7],
      ['Next movement', 6],
    ],
    good: 'The illustrated first touch guides the ball into a nearby space.',
    improve: 'Soften your receiving foot as the ball arrives.',
    next: 'Try 10 gentle first touches with a partner.',
    diagram: 'control',
    challenge: 3,
  },
} as const;
