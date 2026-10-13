"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ImageRevealProps = Omit<ImageProps, "className"> & {
  className?: string;
  imageClassName?: string;
  delay?: number;
};

export function ImageReveal({
  className,
  imageClassName,
  delay = 0,
  ...imageProps
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 18, scale: 1.035 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.045 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Image {...imageProps} alt={imageProps.alt} className={imageClassName} />
      </motion.div>
    </motion.div>
  );
}
