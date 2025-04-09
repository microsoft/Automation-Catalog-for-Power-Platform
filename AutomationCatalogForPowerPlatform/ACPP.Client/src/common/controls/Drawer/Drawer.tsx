import React, { useRef, useEffect, useMemo, useState } from 'react';
import { getDirectionStyle, useStyles } from './Drawer.styles';

export type Direction = 'left' | 'right' | 'bottom' | 'top';

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  enableOverlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  zIndex?: number;
  duration?: number;
  direction?: Direction;
  size?: number;
  className?: string;
  customIdSuffix?: string;
  lockBackgroundScroll?: boolean;
  overlayClassName?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose = () => {},
  children,
  style,
  enableOverlay = true,
  overlayColor = '#000',
  overlayOpacity = 0.4,
  zIndex = 100,
  duration = 500,
  direction,
  size = 250,
  className,
  customIdSuffix,
  lockBackgroundScroll = false,
  overlayClassName = '',
}: DrawerProps) => {
  const classes = useStyles();

  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const updatePageScroll = () => {
      bodyRef.current = window.document.querySelector('body');

      if (bodyRef.current && lockBackgroundScroll) {
        bodyRef.current.style.overflow = open ? 'hidden' : '';
      }
    };

    updatePageScroll();
  }, [open, lockBackgroundScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsClickOutside(true);
      } else {
        setIsClickOutside(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (isClickOutside) {
      onClose();
      setIsClickOutside(false);
    }
  }, [isClickOutside, onClose]);

  const idSuffix = useMemo(() => {
    return customIdSuffix || (Math.random() + 1).toString(36).substring(7);
  }, [customIdSuffix]);

  const overlayStyles: React.CSSProperties = {
    backgroundColor: overlayColor,
    opacity: open ? overlayOpacity : 1,
    zIndex,
    display: open ? 'block' : 'none',
  };

  const drawerStyles: React.CSSProperties = {
    zIndex: zIndex + 1,
    transitionDuration: `${duration}ms`,
    ...getDirectionStyle(direction || 'left', size),
    ...style,
    visibility: open ? 'visible' : 'hidden',
  };

  return (
    <div id={`Drawer${idSuffix}`} className={classes.drawer}>
      <nav
        role="navigation"
        id={`Drawer__container${idSuffix}`}
        style={drawerStyles}
        className={`${classes.container} ${className} ${open ? classes.activeContainer : ''}`}
        ref={containerRef}
      >
        <div className={classes.scrollContainer}>{children}</div>
      </nav>
      {enableOverlay && (
        <div
          id={`Drawer__overlay${idSuffix}`}
          className={`${classes.overlay} ${overlayClassName}`}
          style={overlayStyles}
        />
      )}
    </div>
  );
};

export default Drawer;
