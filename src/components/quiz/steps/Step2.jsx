import React, { useState } from "react";
import { motion } from "framer-motion";
import OptionButton from "../ui/OptionButton";
import ProgressIndicator from "../ui/ProgressIndicator";

export default function Step2({ formData, updateFormData }) {
  const [selected, setSelected] = useState(formData.income);

  const options = [
    { id: "A", label: "Menos de $25,000" },
    { id: "B", label: "$25,000 - $50,000" },
    { id: "C", label: "$50,000 - $75,000" },
    { id: "D", label: "$75,000 - $100,000" },
    { id: "E", label: "$100,000 - $150,000" },
    { id: "F", label: "Más de $150,000" },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    updateFormData({ income: id });
  };

  return (
    <div className="space-y-4">
      <ProgressIndicator step={2} />
      <div className="text-left">
        <h2 className="text-md font-bold text-left text-gray-950">
          ¡Casi listo!
        </h2>
      </div>

      <motion.h1
        className="text-xl leading-tight font-bold text-left text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ¿Cuál es el ingreso anual de tu hogar?
      </motion.h1>

      <motion.div
        className="space-y-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        {options.map((option, index) => (
          <OptionButton
            key={option.id}
            id={option.id}
            label={option.label}
            selected={selected === option.id}
            onClick={() => handleSelect(option.id)}
            delay={0.1 * index}
            className="quiz-step-2"
          />
        ))}
      </motion.div>

      <div className="mt-10">
        <p className="text-left text-xs text-gray-500">
          © 2025. Tu compañero financiero de confianza.
        </p>
      </div>
    </div>
  );
}
