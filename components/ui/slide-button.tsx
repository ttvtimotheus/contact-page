"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const DRAG_CONSTRAINTS = { left: 0, right: 155 };
const DRAG_THRESHOLD = 0.9;

const BUTTON_STATES = {
  initial: { width: "12rem" },
  completed: { width: "8rem" },
};

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
} as const;

type StatusIconProps = {
  status: string;
};

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin" size={20} />,
      success: <Check size={20} />,
      error: <X size={20} />,
    }),
    []
  );

  if (!iconMap[status]) return null;

  return (
    <motion.div
      key={crypto.randomUUID()}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
    </motion.div>
  );
};

interface SlideButtonProps extends Omit<ButtonProps, "onSubmit"> {
  onSubmit?: () => void | Promise<void>;
  status?: "idle" | "loading" | "success" | "error";
  onStatusChange?: (status: "idle" | "loading" | "success" | "error") => void;
}

export const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, onSubmit, status: externalStatus, onStatusChange, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [completed, setCompleted] = useState(false);
    const dragHandleRef = useRef<HTMLDivElement | null>(null);
    const [internalStatus, setInternalStatus] = useState<
      "idle" | "loading" | "success" | "error"
    >("idle");

    const status = externalStatus ?? internalStatus;

    const dragX = useMotionValue(0);
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring);
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    );

    const handleDragStart = useCallback(() => {
      if (completed) return;
      setIsDragging(true);
    }, [completed]);

    const handleDragEnd = async () => {
      if (completed) return;
      setIsDragging(false);

      const progress = dragProgress.get();
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true);
        
        if (onSubmit) {
          const newStatus = "loading";
          setInternalStatus(newStatus);
          onStatusChange?.(newStatus);
          
          try {
            await onSubmit();
            const successStatus = "success";
            setInternalStatus(successStatus);
            onStatusChange?.(successStatus);
          } catch {
            const errorStatus = "error";
            setInternalStatus(errorStatus);
            onStatusChange?.(errorStatus);
          }
        }
      } else {
        dragX.set(0);
      }
    };

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed) return;
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right));
      dragX.set(newX);
    };

    const adjustedWidth = useTransform(springX, (x) => x + 10);

    // Reset when status changes externally
    useEffect(() => {
      if (externalStatus === "idle") {
        setCompleted(false);
        dragX.set(0);
      }
    }, [externalStatus, dragX]);

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className="relative flex h-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 shadow-inner"
      >
        {!completed && (
          <motion.div
            style={{
              width: adjustedWidth,
            }}
            className="absolute inset-y-0 left-0 z-0 rounded-full bg-accent"
          />
        )}
        <AnimatePresence key={crypto.randomUUID()}>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute -left-4 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                {...props}
                type="button"
                size="icon"
                className={cn(
                  "rounded-full drop-shadow-xl shadow-lg",
                  isDragging && "scale-105 transition-transform",
                  className
                )}
              >
                <SendHorizontal className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence key={crypto.randomUUID()}>
          {completed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                {...props}
                type="button"
                className={cn(
                  "size-full rounded-full transition-all duration-300",
                  className
                )}
              >
                <AnimatePresence key={crypto.randomUUID()} mode="wait">
                  <StatusIcon status={status} />
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

SlideButton.displayName = "SlideButton";
