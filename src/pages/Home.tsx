import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  ScanLine,
  Star,
  Zap,
  Check,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { Stadium, SkillArt, Ball } from '../components/Art';
import { Badge, ButtonLink, Eyebrow, ProgressBar, Reveal } from '../components/UI';
import {
  useProgress,
  levelUnlocked,
  levelComplete,
  levelPercent,
  xpTotal,
  earnedBadges,
} from '../progress';
import { levels } from '../data';
export default function Home() {
  const { progress } = useProgress();
  const current = levels.find((l) => !levelComplete(progress, l.id)) ?? levels[4];
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <Eyebrow light>BIG DREAMS. SMALL STEPS. YOUR GAME.</Eyebrow>
          <h1>
            WELCOME TO
            <br />
            SKILL &<br />
            <span>LEARN!</span>
          </h1>
          <p className="hero-welcome">
            Your game. Your journey. <strong>Your time.</strong>
          </p>
          <p className="hero-description">
            Your journey to becoming a soccer star starts here.
            <br />
            Learn the game. Build your skills. Love every minute.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/academy">
              Start learning <ArrowRight size={18} />
            </ButtonLink>
            <Link to="/coach" className="hero-demo">
              <span>
                <Play size={13} fill="currentColor" />
              </span>
              Meet your AI coach
            </Link>
          </div>
          <div className="hero-trust">
            <span className="mini-avatars">
              <i>J</i>
              <i>A</i>
              <i>M</i>
            </span>
            <span>
              Little players. <strong>Limitless potential.</strong>
              <small>
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" /> Built for the next generation
              </small>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbital orbital-one" />
          <span className="art-coordinates">51° 30′ N / THE BEAUTIFUL GAME</span>
          <Stadium />
          <div className="floating-label rookie-float">
            <Badge icon="star" small />
            <div>
              <small>YOUR FIRST CHAPTER</small>
              <strong>Rookie to legend.</strong>
            </div>
            <span className="float-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
          <div className="floating-label xp-float">
            <span>
              <Zap size={21} fill="currentColor" />
            </span>
            <div>
              <strong>Every touch counts.</strong>
              <small>LEARN. PRACTICE. LEVEL UP.</small>
            </div>
          </div>
          <div className="stadium-bottom">
            <span>
              <i /> YOUR FIELD OF POSSIBILITIES
            </span>
            <span>01 — 05</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>NOT JUST A GAME. A WAY TO GROW.</span>
          <a href="#your-academy">
            Explore the academy <span>↓</span>
          </a>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <span>LEARN THE GAME</span>
        <Star size={18} />
        <span>BUILD YOUR CONFIDENCE</span>
        <Star size={18} />
        <span>PLAY WITH HEART</span>
        <Star size={18} />
        <span>BECOME YOUR BEST</span>
        <Star size={18} />
      </div>
      <section id="your-academy" className="section shell">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>WELCOME TO YOUR ACADEMY</Eyebrow>
            <h2>
              Big skills.
              <br />
              <span className="serif">Even bigger possibilities.</span>
            </h2>
          </div>
          <p>
            A little learning. A little practice. A whole lot of fun.
            <br />
            Everything you need to fall in love with soccer.
          </p>
        </Reveal>
        <div className="entry-grid">
          <Reveal className="entry-feature">
            <Link to="/academy">
              <div className="entry-top">
                <span className="number-label">01 / LEARN</span>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="mini-pitch">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="entry-feature-text">
                <span className="pill">YOUR JOURNEY STARTS HERE</span>
                <h3>
                  Small steps.
                  <br />
                  Champion mindset.
                </h3>
                <p>Five levels. Real lessons. Your own path to greatness.</p>
                <span className="text-link">
                  Explore the academy <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal className="entry-quiz" delay={0.08}>
            <Link to="/quizzes">
              <div className="entry-top">
                <span className="number-label">02 / CHALLENGE</span>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="quiz-decoration">
                <span>?</span>
                <i>+10</i>
                <Star size={25} />
              </div>
              <h3>
                Think fast.
                <br />
                Play smart.
              </h3>
              <p>Put your soccer knowledge to the test.</p>
              <span className="text-link">
                Take a quiz <ArrowRight size={17} />
              </span>
            </Link>
          </Reveal>
          <Reveal className="entry-training" delay={0.16}>
            <Link to="/training">
              <div className="entry-top">
                <span className="number-label">03 / PRACTICE</span>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <SkillArt />
              <h3>
                Less scrolling.
                <br />
                More scoring.
              </h3>
              <p>Try Dribbling Master: five cones, three rounds, one big confidence boost.</p>
              <span className="text-link">
                Train your skills <ArrowRight size={17} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="journey-section">
        <div className="shell">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>THE ROAD TO CHAMPION</Eyebrow>
              <h2>
                Every legend
                <br />
                starts <span className="serif">somewhere.</span>
              </h2>
            </div>
            <ButtonLink to="/academy" secondary>
              Find your starting line
            </ButtonLink>
          </Reveal>
          <div className="home-path">
            {levels.map((l, i) => (
              <Link
                to={levelUnlocked(progress, l.id) ? `/academy/${l.id}` : '/academy'}
                key={l.id}
                className={`path-stop ${levelUnlocked(progress, l.id) ? 'open' : ''}`}
              >
                <div className="path-badge">
                  <Badge
                    icon={
                      i === 4
                        ? 'trophy'
                        : i === 0
                          ? 'star'
                          : i === 1
                            ? 'zap'
                            : i === 2
                              ? 'target'
                              : 'brain'
                    }
                    locked={!levelUnlocked(progress, l.id)}
                  />
                  <span>
                    {levelComplete(progress, l.id) ? (
                      <Check size={13} />
                    ) : (
                      String(l.id).padStart(2, '0')
                    )}
                  </span>
                </div>
                <small>LEVEL {l.id}</small>
                <h3>{l.name}</h3>
                <p>
                  {
                    [
                      'Learn the basics',
                      'Find your position',
                      'Build your skills',
                      'Read the game',
                      'Bring it all together',
                    ][i]
                  }
                </p>
              </Link>
            ))}
          </div>
          <p className="path-note">
            <ShieldCheck size={15} /> Your pace. Your progress. One great step at a time.
          </p>
        </div>
      </section>
      <section className="shell section feature-split">
        <Reveal className="coach-feature">
          <div className="coach-feature-copy">
            <span className="pill dark-pill">
              <ScanLine size={14} /> COACHING, REIMAGINED
            </span>
            <h2>
              A little guidance.
              <br />
              <span className="serif">A whole new game.</span>
            </h2>
            <p>
              Discover what smart soccer coaching could look like. Explore our interactive AI Coach
              demonstration.
            </p>
            <ButtonLink to="/coach">Meet your AI coach</ButtonLink>
            <small className="demo-disclaimer">
              DEMO MODE · Example feedback. No video uploads.
            </small>
          </div>
          <div className="coach-preview">
            <div className="preview-header">
              <span>
                <i /> SKILL VISION
              </span>
              <span>DEMO</span>
            </div>
            <SkillArt animated />
            <div className="preview-report">
              <span>
                <Check size={15} /> CONTROLLED TOUCH
              </span>
              <div>
                <span>Ball control</span>
                <strong>
                  8<span>/10</span>
                </strong>
              </div>
              <ProgressBar value={80} />
              <small>Illustrative rating · not a real measurement</small>
            </div>
            <div className="scan-corner tl" />
            <div className="scan-corner br" />
          </div>
        </Reveal>
      </section>
      <section className="shell personal-section">
        <Reveal className="personal-card">
          <div>
            <Eyebrow>YOUR SOCCER STORY</Eyebrow>
            <h2>
              Look how far
              <br />
              <span className="serif">you can go.</span>
            </h2>
            <p>
              {progress.lessons.length
                ? 'Keep that momentum going. Your next milestone is waiting.'
                : 'Your story is a blank page. Let’s make it a great one.'}
            </p>
            <ButtonLink to="/progress" secondary>
              My soccer journey
            </ButtonLink>
          </div>
          <div className="progress-preview">
            <div className="preview-level">
              <Badge icon="star" small />
              <div>
                <small>CURRENT LEVEL</small>
                <h3>{current.name}</h3>
              </div>
              <span>0{current.id}</span>
            </div>
            <ProgressBar value={levelPercent(progress, current.id)} label="Level progress" />
            <div className="preview-stats">
              <span>
                <strong>{xpTotal(progress)}</strong>Total XP
              </span>
              <span>
                <strong>
                  {progress.lessons.length}
                  <small>/20</small>
                </strong>
                Lessons learned
              </span>
              <span>
                <strong>{earnedBadges(progress).length}</strong>Badges earned
              </span>
            </div>
            <Link to={`/academy/${current.id}`}>
              Let’s take the next step <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
        <Reveal className="home-achievements">
          <div>
            <Eyebrow>EFFORT DESERVES A LITTLE GOLD</Eyebrow>
            <h3>
              Collect moments.
              <br />
              Earn your stripes.
            </h3>
            <Link className="text-link" to="/achievements">
              Explore achievements <ArrowUpRight size={17} />
            </Link>
          </div>
          <div>
            {['flag', 'brain', 'trophy'].map((icon, i) => (
              <div key={icon}>
                <Badge
                  icon={icon}
                  locked={!earnedBadges(progress).includes(['first', 'brain', 'champion'][i])}
                />
                <span>{['First Goal', 'Soccer Brain', 'Soccer Champion'][i]}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="closing-banner">
        <div className="shell">
          <Ball />
          <div>
            <Eyebrow light>THE BEST TIME TO START? RIGHT NOW.</Eyebrow>
            <h2>
              Every soccer legend
              <br />
              started as <span className="serif">a beginner.</span>
            </h2>
          </div>
          <ButtonLink to="/academy">Let’s play</ButtonLink>
        </div>
      </section>
    </>
  );
}
