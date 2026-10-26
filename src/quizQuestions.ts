import type { Question } from './data';
type Entry = [string, string[], number, string];
const bank = (entries: Entry[]): Question[] =>
  entries.map(([prompt, options, answer, explanation]) => ({
    prompt,
    options,
    answer,
    explanation,
  }));
// Lesson checks, academy exams, and practice quizzes deliberately use separate prompts.
export const academyQuizzes: Record<number, Question[]> = {
  1: bank([
    [
      'A shot hits the post and stays outside the goal. Does it count?',
      ['Yes', 'No'],
      1,
      'Hitting the post is not a goal. The whole ball must cross the goal line between the posts and under the bar.',
    ],
    [
      'A full-size team has 10 outfield players. Who is the eleventh player?',
      ['Another referee', 'A goalkeeper', 'A coach'],
      1,
      'The 11 players are 10 outfield players and one goalkeeper. Youth teams often have fewer players.',
    ],
    [
      'An adult match reaches half-time after 45 minutes plus added time. What follows?',
      ['A second 45-minute half', 'The match must end', 'A third team joins'],
      0,
      'Standard adult matches have two 45-minute halves, with a half-time break. Youth games can be shorter.',
    ],
    [
      'Which action can an outfield player use during normal play?',
      [
        'Catch a pass with both hands',
        'Guide the ball with a foot',
        'Carry the ball while running',
      ],
      1,
      'Outfield players can use their feet and body, but cannot deliberately handle the ball during normal play.',
    ],
    [
      'A goal has just been scored. Where does play restart?',
      ['At the center spot', 'At the nearest corner', 'At the sideline'],
      0,
      'After a goal, the other team restarts with a kick-off from the center spot.',
    ],
  ]),
  2: bank([
    [
      'Maya is guarding the goal and stopping shots. Which role is she playing?',
      ['Midfielder', 'Goalkeeper', 'Forward'],
      1,
      'Guarding the goal and stopping shots are the goalkeeper’s main jobs.',
    ],
    [
      'Leo stays between an attacker and his own goal. Which role does this describe?',
      ['Defender', 'Forward', 'Referee'],
      0,
      'Defenders protect space near their own goal and help prevent scoring chances.',
    ],
    [
      'A player wins the ball in the middle and passes it forward. Which role often does this?',
      ['Spectator', 'Goalkeeper only', 'Midfielder'],
      2,
      'Midfielders connect defense and attack, often winning the ball and moving it toward teammates.',
    ],
    [
      'Nora moves into space near the opponent’s goal to receive a pass. Which role fits best?',
      ['Goalkeeper', 'Forward', 'Referee'],
      1,
      'Forwards find space near the opponent’s goal and help create scoring chances.',
    ],
    [
      'A forward loses the ball. Can they help win it back?',
      ['Yes, everyone can help defend', 'No, forwards may only shoot'],
      0,
      'Positions are roles rather than fixed spots. All players can help defend and support their team.',
    ],
  ]),
  3: bank([
    [
      'You need to turn around a cone while dribbling. Which touch helps?',
      ['A small touch close to your feet', 'A huge kick far ahead', 'A catch with your hands'],
      0,
      'Small, controlled touches make it easier to change direction without losing the ball.',
    ],
    [
      'Before a short pass, where should your support foot point?',
      ['Away from everyone', 'Toward your teammate or target', 'Straight up'],
      1,
      'Pointing your support foot toward the target helps guide an accurate inside-foot pass.',
    ],
    [
      'You are learning to shoot. What should come before power?',
      ['Accuracy and balance', 'The loudest shout', 'The fastest run possible'],
      0,
      'Start with a balanced body and a controlled shot aimed at a safe target. Build power later.',
    ],
    [
      'A pass is coming toward your foot. How can you stop it bouncing far away?',
      ['Keep your foot stiff', 'Relax and cushion it', 'Close your eyes'],
      1,
      'A relaxed receiving foot cushions the ball so your first touch keeps it close.',
    ],
    [
      'Why should you glance up between dribbling touches?',
      ['To find space and teammates', 'To ignore the ball completely', 'To distract the referee'],
      0,
      'Looking up between controlled touches helps you notice open space, teammates, and opponents.',
    ],
  ]),
  4: bank([
    [
      'Your teammate last touches the ball before it leaves the sideline. Who gets the throw-in?',
      ['Your team', 'The other team', 'Nobody'],
      1,
      'A throw-in goes to the opponents of the player who touched the ball last.',
    ],
    [
      'A defender blocks a shot over their own goal line beside the post. Which restart is right?',
      ['Corner kick for the attackers', 'Kick-off', 'Throw-in'],
      0,
      'When a defender touches it last over their own goal line without a goal, the attackers get a corner.',
    ],
    [
      'A player trips an opponent outside the penalty area. How might the referee restart play?',
      ['A free kick', 'A corner kick', 'A throw-in'],
      0,
      'Tripping can be a foul. A foul outside the penalty area may result in a free kick for the other team.',
    ],
    [
      'A player is level with the second-last opponent when a teammate passes. Are they in an offside position?',
      ['Yes', 'No'],
      1,
      'A player level with the second-last opponent is not nearer that goal line, so is not in an offside position.',
    ],
    [
      'Your teammate misses an easy shot. What is the best response?',
      ['Encourage them to try again', 'Blame them', 'Refuse to pass to them'],
      0,
      'Good teammates encourage effort and learning. Everyone makes mistakes during practice and games.',
    ],
  ]),
  5: bank([
    [
      'Only half the ball has crossed the goal line between the posts. What should happen?',
      ['Award a goal', 'Keep playing', 'Start a penalty shoot-out'],
      1,
      'The whole ball must cross the line between the posts and under the crossbar for a goal.',
    ],
    [
      'A coach says your youth team will play 7 against 7. Is that possible?',
      ['Yes, youth formats can be smaller', 'No, every match must have 11 per team'],
      0,
      'Younger players often use smaller teams and shorter games. Follow your local youth rules.',
    ],
    [
      'A full-size match begins. How many goalkeepers does each team normally field?',
      ['One', 'Three', 'None'],
      0,
      'Each full-size team normally has one goalkeeper among its 11 players.',
    ],
    [
      'Sam is closest to the team’s own goal and can handle the ball in that penalty area. Identify the role.',
      ['Forward', 'Goalkeeper', 'Midfielder'],
      1,
      'The goalkeeper protects the goal and has special handling permission in their own penalty area.',
    ],
    [
      'Which teammate is best placed to connect a defensive pass with an attack through the middle?',
      ['A midfielder', 'A spectator', 'A referee'],
      0,
      'Midfielders connect play between defense and attack by moving, receiving, and passing.',
    ],
    [
      'Your defender wins the ball. Which team action makes sense next?',
      ['Look for a safe pass to a teammate', 'Always kick it randomly', 'Pick it up and run'],
      0,
      'Defenders help start attacks too. A safe pass helps the team keep the ball.',
    ],
    [
      'A striker has no space to shoot. What could help the team?',
      ['Pass to an open teammate', 'Shoot through a teammate', 'Stop trying'],
      0,
      'A forward can create a chance by passing. Teamwork often makes a better opportunity.',
    ],
    [
      'In a crowded dribbling area, which plan gives more control?',
      ['Short touches with both feet', 'One very hard kick', 'Always sprinting'],
      0,
      'Short touches help keep the ball nearby, and both feet help you turn in different directions.',
    ],
    [
      'A short pass keeps missing sideways. Which idea should you practice?',
      ['Inside-foot contact and aiming at the target', 'Closing your eyes', 'Using your hands'],
      0,
      'The inside of the foot gives a broad surface for guiding a short pass toward a target.',
    ],
    [
      'Your first touch goes far away. What is a useful adjustment?',
      [
        'Cushion the arriving ball with a relaxed foot',
        'Kick every pass harder',
        'Turn away from the pass',
      ],
      0,
      'A softer receiving touch helps absorb the ball’s movement and keeps it in a nearby space.',
    ],
    [
      'For a controlled shot, what helps your non-kicking leg support you?',
      ['A foot planted beside the ball', 'A foot far above the ball', 'A foot on top of the ball'],
      0,
      'Plant the non-kicking foot beside the ball and stay balanced when you shoot.',
    ],
    [
      'An attacker shoots wide and nobody else touches it before it crosses the goal line. Which restart follows?',
      ['A goal kick', 'A corner for the attacker', 'A throw-in'],
      0,
      'An attacker touching it last over the opponent’s goal line without a goal gives the defenders a goal kick.',
    ],
    [
      'The referee shows a red card. What does it mean?',
      ['The player must leave the game', 'A warning only', 'A goal has been scored'],
      0,
      'A red card means the player must leave. Youth competitions can have additional local rules.',
    ],
    [
      'Can a player be offside directly from a throw-in?',
      ['Yes', 'No'],
      1,
      'There is no offside offense directly from a throw-in, corner kick, or goal kick.',
    ],
    [
      'The other team wins fairly. What would a champion do?',
      ['Congratulate them and keep learning', 'Argue about every mistake', 'Give up soccer'],
      0,
      'Sportsmanship means respecting others, being kind, and learning whether you win or lose.',
    ],
  ]),
};
export const practiceQuizzes: Record<number, Question[]> = {
  1: bank([
    [
      'Which goal are you trying to score in?',
      ['Your own goal', 'The other team’s goal', 'Either goal counts for you'],
      1,
      'Work with your teammates to score in the other team’s goal while protecting your own.',
    ],
    [
      'Which sentence describes soccer best?',
      [
        'A team game with a ball and two goals',
        'A game played only with hands',
        'A solo race without a ball',
      ],
      0,
      'Soccer is a team game. Players work together to move the ball and score goals.',
    ],
    [
      'Does the center circle belong only to goalkeepers?',
      ['Yes', 'No'],
      1,
      'The center circle provides space for kick-offs; it is not a special goalkeeper-only area.',
    ],
    [
      'Your youth game is shorter than an adult game. What should you do?',
      [
        'Follow your coach and league’s match rules',
        'Insist every child plays 90 minutes',
        'Stop the match',
      ],
      0,
      'Youth match lengths vary by age and competition. Your coach can explain the rules for your game.',
    ],
    [
      'The ball is rolling toward you in open play. Which is a normal outfield action?',
      ['Pass it using your foot', 'Pick it up and throw it', 'Carry it into the goal'],
      0,
      'Passing with your foot is part of normal soccer play. Outfield players cannot deliberately handle the ball.',
    ],
  ]),
  2: bank([
    [
      'Which player usually starts nearest their own goal in a simple formation?',
      ['Goalkeeper', 'Striker', 'Referee'],
      0,
      'The goalkeeper starts near their own goal to protect it and help stop shots.',
    ],
    [
      'Your team needs help protecting the space in front of its goal. Who usually focuses on that?',
      ['The defenders', 'Only the forwards', 'The spectators'],
      0,
      'Defenders work together to protect space near their goal and stop attackers creating chances.',
    ],
    [
      'Your team needs a link between the back line and the forwards. Which role helps most?',
      ['Midfielder', 'Ball collector', 'Referee'],
      0,
      'A midfielder supports both defense and attack and connects teammates through movement and passing.',
    ],
    [
      'Who often makes attacking runs to receive a scoring pass?',
      ['A forward', 'Only the goalkeeper', 'A referee'],
      0,
      'Forwards move into open attacking spaces, receive passes, and create chances to score.',
    ],
    [
      'Does a defender have to stand on the same spot for the whole match?',
      ['Yes', 'No'],
      1,
      'Players move with the game. A defender can move into space, support teammates, and help attack safely.',
    ],
  ]),
  3: bank([
    [
      'You are starting a dribbling exercise. What is a good first speed?',
      ['Slow enough to control each touch', 'As fast as possible', 'Never move'],
      0,
      'Starting slowly helps you learn close control. Add speed only when you feel comfortable.',
    ],
    [
      'For a short pass to a nearby partner, which swing fits best?',
      ['A gentle controlled swing', 'The hardest kick you can make', 'No contact at all'],
      0,
      'A nearby partner needs a controlled pass. Match the strength of your pass to the distance.',
    ],
    [
      'Where should your eyes be when you make contact for a shot?',
      ['On the ball', 'Always behind you', 'Closed'],
      0,
      'Watch the ball as you strike it, after choosing a safe target and setting your support foot.',
    ],
    [
      'What should a useful first touch prepare you to do?',
      ['Pass, dribble, or shoot next', 'Lose the ball immediately', 'Use your hands'],
      0,
      'A controlled first touch leaves the ball nearby so you can choose your next action.',
    ],
    [
      'Can practicing with both feet help with direction changes?',
      ['Yes', 'No'],
      0,
      'Using both feet gives you more ways to control the ball and turn into open space.',
    ],
  ]),
  4: bank([
    [
      'During a throw-in, how many hands should hold the ball?',
      ['Both hands', 'One hand only', 'No hands'],
      0,
      'A proper throw-in uses both hands and brings the ball from behind and over the head.',
    ],
    [
      'The ball goes out over the sideline. Is that the same as the goal line?',
      ['Yes', 'No'],
      1,
      'The sidelines are the sides of the field. The goal lines are the ends where the goals are.',
    ],
    [
      'What does a yellow card normally mean?',
      ['A warning', 'An automatic goal', 'The match is over'],
      0,
      'A yellow card is a warning for misconduct. Follow the referee and your league’s youth rules.',
    ],
    [
      'Is pushing another player a fair way to win the ball?',
      ['Yes', 'No'],
      1,
      'Pushing can be a foul. Win the ball fairly and respect the referee’s decisions.',
    ],
    [
      'Your friend is learning a new skill and keeps making mistakes. What helps?',
      ['Patient encouragement', 'Laughing at them', 'Taking away their turn'],
      0,
      'Encouragement and patience help teammates learn. Everyone improves through safe practice.',
    ],
  ]),
  5: bank([
    [
      'The ball has fully crossed the sideline. Which boundary restart is used?',
      ['A throw-in', 'A penalty every time', 'A kick-off every time'],
      0,
      'When the whole ball crosses a sideline, play restarts with a throw-in for the appropriate team.',
    ],
    [
      'Which action starts a half of a soccer match?',
      ['A kick-off', 'A throw-in from the corner', 'A free throw'],
      0,
      'Each half starts with a kick-off from the center spot. Goals also lead to kick-offs.',
    ],
    [
      'May the goalkeeper use their hands anywhere on the field?',
      ['Yes', 'No'],
      1,
      'The goalkeeper’s special handling permission applies inside their own penalty area, with restrictions.',
    ],
    [
      'Which role is mainly about finding attacking chances near the opponent’s goal?',
      ['Forward', 'Goalkeeper', 'Spectator'],
      0,
      'Forwards look for space near the opponent’s goal, create chances, and try to score.',
    ],
    [
      'Who can help their team by passing to an open player?',
      ['Every player', 'Only midfielders', 'Only forwards'],
      0,
      'Passing and helping teammates are useful for everyone, whatever their usual position.',
    ],
    [
      'If you want better control while turning, what should you practice first?',
      ['Small touches around markers', 'Hard kicks into a road', 'Closing your eyes'],
      0,
      'Small touches around safe markers help you practice turning with the ball close to your feet.',
    ],
    [
      'Which foot contact gives a broad surface for a short pass?',
      ['The inside surface', 'The very back of the heel only', 'The ankle'],
      0,
      'The inside of your foot is a broad, useful surface for directing an accurate short pass.',
    ],
    [
      'You receive a gentle pass. What should you try to keep nearby?',
      ['The ball', 'The referee', 'The other goal'],
      0,
      'Keeping the ball close after receiving a pass helps you stay in control of your next move.',
    ],
    [
      'A shooting target is near a window. Is that a safe place to practice?',
      ['Yes', 'No'],
      1,
      'Choose a clear space away from windows, roads, and people, with an adult supervising.',
    ],
    [
      'Why is taking a break during a skill circuit sensible?',
      [
        'It gives you time to rest and drink water',
        'It makes the practice useless',
        'Champions never rest',
      ],
      0,
      'Rest and water breaks help you practice safely. Stop and tell an adult if something hurts.',
    ],
    [
      'A corner kick is taken from which part of the field?',
      ['A corner near the opponent’s goal', 'The center spot', 'Inside your own goal'],
      0,
      'Corner kicks are taken from a corner area at the attacking end of the field.',
    ],
    [
      'Can a player be offside directly from a goal kick?',
      ['Yes', 'No'],
      1,
      'There is no offside offense directly from a goal kick, corner kick, or throw-in.',
    ],
    [
      'A teammate is knocked down and seems hurt. What should you do?',
      ['Tell a responsible adult or referee', 'Ignore them', 'Ask them to keep running'],
      0,
      'Tell the referee or a responsible adult so they can help. Player safety comes first.',
    ],
    [
      'Does being a good teammate mean you must never make a mistake?',
      ['Yes', 'No'],
      1,
      'Everyone makes mistakes. Helping others and learning from them are parts of being a good teammate.',
    ],
    [
      'Which plan helps you keep improving after finishing the academy?',
      ['Practice safely and keep learning', 'Never touch a ball again', 'Only care about trophies'],
      0,
      'The academy is a starting point. Safe practice, teamwork, and curiosity help you keep improving.',
    ],
  ]),
};
