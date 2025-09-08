import React from "react";
import { motion, type Variants } from "framer-motion";

export type HeroAnimatedProps = {
  title: string;
  contentHtml?: string;
  cta?: { enable?: boolean; label?: string; link?: string };
  image?: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroAnimated({
  title,
  contentHtml,
  cta,
  image,
}: HeroAnimatedProps) {
  return (
    <section className="section pb-[50px]">
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={container}>
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left: Text + CTA */}
            <motion.div variants={fadeUp}>
              <h1 className="font-primary text-4xl font-bold">{title}</h1>
              {contentHtml && (
                <p
                  className="mt-4 leading-tight"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              )}
              {cta?.enable && cta?.link && cta?.label && (
                <a className="btn btn-primary mt-4 inline-flex" href={cta.link}>
                  {cta.label}
                </a>
              )}
            </motion.div>

            {/* Right: Image */}
            <motion.div variants={slideIn} className="flex justify-center">
              {image && (
                <img
                  className="mx-auto mt-6 md:mt-0"
                  src={image}
                  width={750}
                  height={390}
                  alt="imagen del héroe"
                  loading="eager"
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
