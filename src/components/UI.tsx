import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Trophy,
  Zap,
  Flag,
  Brain,
  Users,
  Target,
  Check,
  Lock,
  Star,
} from 'lucide-react';
import { motion, useReducedMotion, animate, useMotionValue, useTransform } from 'motion/react';
export function ButtonLink({
  to,
  children,
  secondary = false,
  className = '',
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link className={`button ${secondary ? 'secondary' : ''} ${className}`} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? 'light' : ''}`}>
      <span />
      {children}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {action}
    </div>
  );
}
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="progress-wrap">
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{value}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label ?? 'Completion'}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
const icons = {
  trophy: Trophy,
  zap: Zap,
  flag: Flag,
  brain: Brain,
  users: Users,
  target: Target,
  star: Star,
};
export function Badge({
  icon = 'trophy',
  locked = false,
  small = false,
}: {
  icon?: string;
  locked?: boolean;
  small?: boolean;
}) {
  const Icon = icons[icon as keyof typeof icons] ?? Trophy;
  return (
    <div className={`badge ${locked ? 'locked' : ''} ${small ? 'small' : ''}`}>
      <div>
        <Icon size={small ? 25 : 37} strokeWidth={1.6} />
      </div>
      {locked && <Lock className="badge-lock" size={14} />}
    </div>
  );
}
export function CheckRow({ done, children }: { done: boolean; children: ReactNode }) {
  return (
    <div className={`check-row ${done ? 'done' : ''}`}>
      <span>{done ? <Check size={14} /> : <span />}</span>
      {children}
    </div>
  );
}
export function Celebration() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${i * 4.2}%`,
            animationDelay: `${(i % 5) * 0.1}s`,
            background: ['#c4ef7b', '#e9c76a', '#8ac5b3'][i % 3],
            transform: `rotate(${i * 23}deg)`,
          }}
        />
      ))}
    </div>
  );
}
export { ArrowRight };

export function CountUp({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const count = useMotionValue(value);
  const display = useTransform(count, (n) => Math.round(n));
  useEffect(() => {
    const controls = animate(count, value, { duration: reduced ? 0 : 0.55, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, value, reduced]);
  return <motion.span>{display}</motion.span>;
}
