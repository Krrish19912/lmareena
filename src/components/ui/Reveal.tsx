import type { ReactNode } from 'react';
import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/blur/rise into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'p' | 'span';
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Splits text into characters that stagger in. */
export function SplitText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text} role="text">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          initial={{ y: '110%', opacity: 0, rotateX: -80 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.03 }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}
