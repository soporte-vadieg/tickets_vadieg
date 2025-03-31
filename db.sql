-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--https://www.realvnc.com/es/connect/download/?lai_vid=zagqVqjWvC2b&lai_sr=0-4&lai_sl=l
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2025 a las 13:29:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vadieg2025`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `emails` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id`, `name`, `emails`) VALUES
(1, 'Sistemas', 'soporte01@example.com'),
(2, 'Recursos Humanos', 'rrhh@example.com'),
(3, 'Oficina Tecnica', 'example@example.es'),
(4, 'Calidad', 'example@example.es'),
(5, 'Logistica', 'logistica@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `name`, `description`) VALUES
(1, 'CREACION DE PRODUCTOS (TCOP)', 'Datos para crear en el sistema'),
(2, 'CREACION DE PRODUCTOS (PROTHEUS)', NULL),
(3, 'COMPRA DE INSUMOS', NULL),
(4, 'ACTUALIZACION DE EQUIPO', 'Aumento de ram,cambio de disco ,etc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_ticket`
--

CREATE TABLE `historial_ticket` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `status_anterior` varchar(50) NOT NULL,
  `status_nuevo` varchar(50) NOT NULL,
  `fecha_cambio` timestamp NOT NULL DEFAULT current_timestamp(),
  `observacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('abierto','en_progreso','cerrado') DEFAULT 'abierto',
  `urgency` enum('baja','media','alta') DEFAULT 'baja',
  `assigned_to` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `file_path` varchar(255) DEFAULT NULL,
  `id_area` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `status`, `urgency`, `assigned_to`, `created_by`, `created_at`, `updated_at`, `file_path`, `id_area`, `id_categoria`) VALUES
(106, 'Tickets prueba para sistemas ', 'Tickets prueba para sistemas ', 'abierto', 'alta', NULL, 39, '2025-02-06 19:31:33', '2025-02-06 19:31:33', NULL, 1, 4),
(107, 'Tickets prueba para sistemas', 'Tickets prueba para sistemas', 'abierto', 'alta', NULL, 40, '2025-02-06 19:32:09', '2025-02-06 19:32:09', NULL, 1, 4),
(108, 'prueba de tickets para sistemas', 'prueba de tickets para sistemas', 'abierto', 'alta', NULL, 41, '2025-02-06 19:32:50', '2025-02-06 19:32:50', NULL, 1, 4),
(109, 'prueba para creacion de tickets', 'prueba para creacion de tickets', 'en_progreso', 'alta', NULL, 42, '2025-02-06 19:34:47', '2025-02-06 19:37:36', NULL, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_area` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`, `id_area`, `full_name`) VALUES
(19, 'Administrador', '$2a$10$UYuzv4KlbuhMrfbaTgjFuOC42KCkXa/eZX1J5TJ/0RD1Sd3CtApWW', 'ivanbravo1993@gmail.com', 'admin', '2025-01-17 19:41:38', 1, 'admin'),
(36, 'ibravo', '$2a$10$uBKMBHBN2S8NHmxy1D8Yau6Rl2mOwxrr60cXz9rE93EnOAi8nf8km', 'soporte01@vadiegsa.com', 'admin', '2025-01-31 12:28:32', 1, 'Ivan Bravo'),
(38, 'jpeirano', '$2a$10$WJzaBuSVWD28OZ/JBjl9Hu5wm6TbmUV.SjYD1EI.5rUSZ0n1nKXsO', 'oficinatecnica02@example.com', 'user', '2025-02-04 17:17:52', 3, 'Juan Cruz Peirano'),
(39, 'rrhh', '$2a$10$T9WorIjHjNGgNAPBprbX6elks6iuzvQoyCf5TL/AeW2fTtbzqVHmi', 'rrhh@example.es', 'user', '2025-02-06 18:47:38', 2, 'Recursos Humanos Vadieg'),
(40, 'calidad', '$2a$10$s1QDJOhO/PPQJR9m8MLudOursWGSN.tojFB3LwxQWtFKOaDWcK.iO', 'calidad@example.es', 'user', '2025-02-06 18:48:10', 4, 'Calidad Vadieg'),
(41, 'logistica', '$2a$10$7C8hd.Nm3p63Hxu1JrJJWu5bikV8bCb04vzLg8f4CTgdkmxdZUIeO', 'logistica@example.es', 'user', '2025-02-06 18:48:32', 5, 'Logistica Vadieg'),
(42, 'otecnica', '$2a$10$rqrehDezXQy1oTFg8I7DD.b2YKwAFOstwrOa4ed8Q7CEbvFcMqfSW', 'otecnica@example.com', 'user', '2025-02-06 19:34:15', 3, 'Oficina Tecnica');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_ticket`
--
ALTER TABLE `historial_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `area_id_fk` (`id_area`),
  ADD KEY `fk_categoria` (`id_categoria`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `area_id_fk1` (`id_area`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historial_ticket`
--
ALTER TABLE `historial_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_ticket`
--
ALTER TABLE `historial_ticket`
  ADD CONSTRAINT `historial_ticket_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `area_id_fk` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`),
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `area_id_fk1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
