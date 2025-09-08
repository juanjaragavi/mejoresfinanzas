import React, { useState } from "react";
import { motion } from "framer-motion";
import ProgressIndicator from "../ui/ProgressIndicator";

export default function Step3({ formData, updateFormData, onSubmit }) {
  const [email, setEmail] = useState(formData.email);
  const [name, setName] = useState(formData.name);
  const [receiveMessages, setReceiveMessages] = useState(
    formData.receiveMessages,
  );
  const [errors, setErrors] = useState({
    email: null,
    name: null,
    general: null,
  });

  const validateEmail = (email) => {
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: "La dirección de correo electrónico es requerida",
      }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email:
          "Por favor, introduce una dirección de correo electrónico válida",
      }));
      return false;
    }

    const domainPart = email.split("@")[1]?.toLowerCase();
    if (domainPart) {
      if (domainPart.split(".").length < 2 || domainPart.endsWith(".")) {
        setErrors((prev) => ({
          ...prev,
          email: "El dominio del correo electrónico parece incompleto",
        }));
        return false;
      }
    }

    setErrors((prev) => ({ ...prev, email: null }));
    return true;
  };

  const validateName = (name) => {
    if (!name.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: "El nombre es requerido",
      }));
      return false;
    }

    if (name.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "El nombre debe tener al menos 2 caracteres",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, name: null }));
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    updateFormData({ email: value });
    if (value.length > 5) {
      validateEmail(value);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    updateFormData({ name: value });
    if (value.length > 0) {
      validateName(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setReceiveMessages(checked);
    updateFormData({ receiveMessages: checked });
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(name);

    if (!receiveMessages) {
      setErrors((prev) => ({
        ...prev,
        general: "Debes aceptar los términos para continuar",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, general: null }));
    }

    return isEmailValid && isNameValid && receiveMessages;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <ProgressIndicator step={3} />
      <div className="text-left mb-4">
        <h2 className="text-xl font-bold text-left text-gray-950">
          ¡Excelente!
        </h2>
        <p className="text-xl leading-tight font-bold text-left text-primary">
          Ingresa tus datos y accede al instante a la tarjeta de crédito que es{" "}
          <span className="text-[#4A90E2]">perfecta para ti</span>
        </p>
      </div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            required
            className={`w-full h-9 px-3 text-sm rounded-md border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary focus:ring-primary"
            } focus:outline-none focus:ring-2`}
            placeholder="tu@email.com"
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={() => validateName(name)}
            required
            className={`w-full h-9 px-3 text-sm rounded-md border ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary focus:ring-primary"
            } focus:outline-none focus:ring-2`}
            placeholder="Tu nombre"
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <input
            id="receiveMessages"
            type="checkbox"
            checked={receiveMessages}
            onChange={handleCheckboxChange}
            className="mt-0.5 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="receiveMessages" className="text-xs">
            Acepto recibir recomendaciones personalizadas de tarjetas de crédito
            y acepto los{" "}
            <a href="/terms-conditions" className="underline text-primary">
              Términos de Servicio
            </a>{" "}
            y la{" "}
            <a href="/privacy-policy" className="underline text-primary">
              Política de Privacidad
            </a>
          </label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        {errors.general && (
          <p className="text-xs text-red-500 mt-2 text-left">
            {errors.general}
          </p>
        )}

        <button
          type="button"
          onClick={handleFormSubmit}
          disabled={!receiveMessages}
          className={`w-full py-3 text-sm font-medium rounded-full transition-colors shadow-md ${
            receiveMessages
              ? "bg-[#7ED321] hover:bg-[#6BA828] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          OBTENER MIS RECOMENDACIONES
        </button>
      </motion.div>

      <div className="mt-8">
        <p className="text-left text-sm">
          <span className="font-bold text-primary">Importante:</span> Asegúrate
          de que tu correo electrónico sea correcto para que podamos enviarte
          recomendaciones personalizadas
        </p>
        <p className="text-left text-xs mt-2 text-gray-500">
          © 2025. Tu compañero financiero de confianza.
        </p>
      </div>
    </div>
  );
}
