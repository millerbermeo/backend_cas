-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2024 a las 04:28:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sqlproyecto2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int(11) NOT NULL,
  `tipo_actividad` enum('recoleccion','otras') DEFAULT 'recoleccion',
  `nombre_act` varchar(30) DEFAULT NULL,
  `estado_actividad` enum('asignada','terminada') DEFAULT 'asignada',
  `lugar_actividad` int(11) DEFAULT NULL,
  `fecha_actividad` date DEFAULT current_timestamp(),
  `hora_inicial` time NOT NULL,
  `hora_final` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `tipo_actividad`, `nombre_act`, `estado_actividad`, `lugar_actividad`, `fecha_actividad`, `hora_inicial`, `hora_final`) VALUES
(3, 'recoleccion', 'actividad 1', 'terminada', 2, '2024-03-02', '00:00:00', '00:00:00'),
(4, 'recoleccion', 'actividad 3', 'terminada', 3, '2024-03-16', '00:00:00', '00:00:00'),
(5, 'recoleccion', 'nombre', 'asignada', 2, '2024-03-18', '00:00:00', '00:00:00'),
(6, 'recoleccion', 'hola 1234', 'asignada', 2, '2024-03-18', '00:00:00', '00:00:00'),
(7, 'recoleccion', '123', 'asignada', 1, '2024-05-09', '00:00:00', '00:00:00'),
(8, 'recoleccion', 'actividad_20f80cef-f791-46c6-8', 'asignada', 1, '2024-05-10', '00:00:00', '00:00:00'),
(9, 'recoleccion', 'act_c9826142_834c2', 'terminada', 1, '2024-05-11', '00:00:00', '00:00:00'),
(10, 'recoleccion', 'actividad_6590b025_cd1a7', 'asignada', 1, '2024-05-12', '00:00:00', '00:00:00'),
(11, 'recoleccion', 'actividad_18c900c8_ccd2d', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(12, 'recoleccion', 'actividad_aac71c51_777d8', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(13, 'recoleccion', 'actividad_4e0bd2b2_74462', 'asignada', 1, '2024-03-26', '00:00:00', '00:00:00'),
(14, 'recoleccion', 'actividad_4a84396b_a717a', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(15, 'recoleccion', 'actividad_4ab3bfb1_4a8d6', 'asignada', 1, '2024-03-19', '00:00:00', '00:00:00'),
(17, 'recoleccion', 'actividad_0b73d09a_63772', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(18, 'recoleccion', 'actividad_a13c07d7_abcc1', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(19, 'recoleccion', 'actividad_7157cc02_67df3', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(20, 'recoleccion', 'actividad_b6add75a_b0b7f', 'asignada', 1, '2024-03-31', '00:00:00', '00:00:00'),
(33, 'recoleccion', 'actividad_f0572c3d_455e1', 'asignada', 1, '2024-03-10', '00:00:00', '00:00:00'),
(34, 'recoleccion', 'actividad_70127ab0_dd8d0', 'asignada', 1, '0000-00-00', '00:00:00', '00:00:00'),
(35, 'recoleccion', 'actividad_e1be8c05_49e92', 'asignada', 1, '2024-03-20', '00:00:00', '00:00:00'),
(41, 'recoleccion', 'actividad_2024-05-14_9af15', 'asignada', 1, '2024-05-14', '00:00:00', '00:00:00'),
(42, 'recoleccion', 'actividad_2024-05-13_7a54d', 'asignada', 1, '2024-05-13', '00:00:00', '00:00:00'),
(43, 'recoleccion', 'actividad_2024-05-14_dc43f', 'asignada', 4, '2024-05-14', '00:00:00', '00:00:00'),
(59, 'recoleccion', 'actividad_2024-05-16_f21fd', 'asignada', 2, '2024-05-16', '00:00:00', '00:00:00'),
(60, 'recoleccion', 'actividad_2024-05-14_6f73a', 'asignada', 3, '2024-05-14', '13:56:00', '16:00:00'),
(61, 'recoleccion', 'actividad_2024-05-15_dde69', 'asignada', 2, '2024-05-15', '13:16:00', '16:00:00'),
(62, 'recoleccion', 'actividad_2024-05-14_aecc1', 'asignada', 2, '2024-05-14', '00:00:00', '00:00:00'),
(63, 'recoleccion', 'actividad_2024-05-21_7eace', 'asignada', 2, '2024-05-21', '04:00:00', '16:40:00'),
(64, 'recoleccion', 'actividad_2024-05-14_1c76d', 'asignada', 3, '2024-05-14', '10:20:00', '14:00:00'),
(65, 'recoleccion', 'actividad_2024-05-15_d8143', 'asignada', 3, '2024-05-15', '10:00:00', '12:00:00'),
(66, 'recoleccion', 'actividad_2024-05-17_1772a', 'asignada', 3, '2024-05-17', '00:00:00', '00:00:00'),
(67, 'recoleccion', 'actividad_2024-05-18_219e7', 'asignada', 2, '2024-05-18', '08:00:00', '11:00:00'),
(68, 'recoleccion', 'actividad_2024-05-06_e4f59', 'asignada', 2, '2024-05-06', '10:00:00', '11:00:00'),
(69, 'recoleccion', 'actividad_2024-05-18_2142e', 'asignada', 1, '2024-05-18', '08:00:00', '09:00:00'),
(70, 'recoleccion', 'actividad_2024-05-08_7d294', 'asignada', 4, '2024-05-08', '08:00:00', '11:00:00'),
(71, 'recoleccion', 'actividad_2024-05-15_72295', 'asignada', 2, '2024-05-15', '14:00:00', '14:00:00'),
(72, 'recoleccion', 'actividad_2024-05-12_af153', 'terminada', 2, '2024-05-12', '08:00:00', '09:00:00'),
(73, 'recoleccion', 'actividad_2024-05-09_70f59', 'asignada', 2, '2024-05-09', '17:00:00', '19:00:00'),
(74, 'recoleccion', 'actividad_2024-05-20_7d4a1', 'asignada', 4, '2024-05-20', '11:00:00', '15:00:00'),
(75, 'recoleccion', 'actividad_2024-05-20_e9d0b', 'asignada', 2, '2024-05-20', '10:44:00', '16:10:00'),
(76, 'recoleccion', 'actividad_2024-05-11_e4549', 'asignada', 3, '2024-05-11', '10:00:00', '00:00:00'),
(77, 'recoleccion', 'actividad_2024-05-16_17d9b', 'asignada', 2, '2024-05-16', '10:00:00', '00:00:00'),
(78, 'recoleccion', 'actividad_2024-05-18_b03d5', 'asignada', 3, '2024-05-18', '04:00:00', '08:00:00'),
(79, 'recoleccion', 'actividad_2024-05-07', 'asignada', 3, '2024-05-07', '11:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenamiento`
--

CREATE TABLE `almacenamiento` (
  `id_almacenamiento` int(11) NOT NULL,
  `nombre_alm` varchar(255) DEFAULT NULL,
  `cantidad_alm` int(11) DEFAULT 0,
  `stock_alm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenamiento`
--

INSERT INTO `almacenamiento` (`id_almacenamiento`, `nombre_alm`, `cantidad_alm`, `stock_alm`) VALUES
(1, 'bodega plastico', 0, 0),
(2, 'bodega metal', 0, 0),
(3, 'bodega carton', 48, 0),
(4, 'bodega vidrio', 0, 0),
(5, 'bodega no aprovechables\r\n', 0, 0),
(6, 'bodega peligrosos\r\n', 0, 0),
(7, 'bodega quimicos\r\n', 0, 0),
(8, 'biofabrica', 0, 0),
(9, 'alm prueba', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_lugar` int(11) NOT NULL,
  `nombre_area` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_lugar`, `nombre_area`) VALUES
(1, 'area 1'),
(2, 'area 2'),
(3, 'area 3'),
(4, 'area 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elemento` int(11) NOT NULL,
  `nombre_elm` varchar(255) DEFAULT NULL,
  `tipo_elm` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elemento`, `nombre_elm`, `tipo_elm`, `cantidad`) VALUES
(2, 'Escoba', 'herramienta', 6),
(6, 'hola2', 'herramienta', 2),
(7, 'eee', 'eee', 700),
(9, 'bolsa1', 'consumible', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_actividades`
--

CREATE TABLE `elementos_actividades` (
  `id_elm_act` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL,
  `fk_elemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos_actividades`
--

INSERT INTO `elementos_actividades` (`id_elm_act`, `fk_actividad`, `fk_elemento`) VALUES
(1, 8, 2),
(2, 8, 6),
(3, 9, 2),
(4, 9, 6),
(5, 10, 6),
(6, 11, 7),
(7, 18, 7),
(8, 20, 7),
(9, 33, 7),
(10, 35, 7),
(11, 41, 7),
(12, 42, 7),
(13, 43, 2),
(14, 59, 7),
(15, 60, 6),
(16, 61, 6),
(17, 62, 2),
(18, 63, 6),
(19, 64, 2),
(20, 64, 9),
(21, 65, 2),
(22, 66, 2),
(23, 66, 6),
(24, 66, 7),
(25, 66, 9),
(26, 67, 2),
(27, 68, 2),
(28, 69, 2),
(29, 70, 2),
(30, 70, 7),
(31, 71, 2),
(32, 71, 7),
(33, 72, 7),
(34, 73, 7),
(35, 74, 2),
(36, 76, 6),
(37, 77, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas_recoleccion`
--

CREATE TABLE `empresas_recoleccion` (
  `id_empresa` int(11) NOT NULL,
  `nombre_empresa` varchar(50) DEFAULT NULL,
  `descripcion_empresa` text DEFAULT NULL,
  `contacto_empresa` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas_recoleccion`
--

INSERT INTO `empresas_recoleccion` (`id_empresa`, `nombre_empresa`, `descripcion_empresa`, `contacto_empresa`) VALUES
(1, 'empresa 1', 'es una empresa encarga de solidos', '3143594582'),
(2, 'empresa 2', 'es una empresa encarga de solidos 2', '3143594582'),
(3, 'prueba empresa', 'SE ENCARGA', 'prueba empresa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares`
--

CREATE TABLE `lugares` (
  `id_lugar` int(11) NOT NULL,
  `nombre_lugar` varchar(50) NOT NULL,
  `ubicacion_lugar` varchar(50) NOT NULL,
  `fk_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id_movimiento` int(11) NOT NULL,
  `tipo_movimiento` enum('entrada','salida') DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_adm` int(11) DEFAULT NULL,
  `fk_residuo` int(11) DEFAULT NULL,
  `fk_actividad` int(11) DEFAULT NULL,
  `destino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id_movimiento`, `tipo_movimiento`, `cantidad`, `fecha`, `usuario_adm`, `fk_residuo`, `fk_actividad`, `destino`) VALUES
(4, 'salida', 350, '2024-03-02', 1, 1, NULL, 1),
(44, 'entrada', 21, '2024-03-16', 2, 5, 4, NULL),
(48, 'salida', 2698, '2024-03-17', 2, 1, NULL, 3),
(49, 'salida', 119, '2024-03-17', 41, 3, NULL, 2),
(73, 'salida', 0, '2024-03-17', 41, 3, NULL, 2),
(95, 'salida', 85, '2024-03-17', 2, 1, NULL, 1),
(96, 'salida', 85, '2024-03-17', 41, 1, NULL, 2),
(97, 'entrada', 1233, '2024-03-24', 1, 3, 4, NULL),
(98, 'salida', 1233, '2024-03-24', 1, 3, NULL, 1),
(99, 'salida', 222, '2024-03-24', 41, 31, NULL, 2),
(100, 'salida', 222, '2024-03-26', 41, 32, NULL, 1),
(101, 'salida', 222, '2024-03-26', 2, 33, NULL, 2),
(102, 'salida', 222, '2024-03-26', 41, 34, NULL, 1),
(103, 'entrada', 20000, '2024-03-26', 1, 3, 5, NULL),
(104, 'salida', 20000, '2024-03-26', 41, 3, NULL, 2),
(105, 'entrada', 21, '2024-03-27', 1, 3, 6, NULL),
(106, 'salida', 21, '2024-03-27', 2, 3, NULL, 1),
(107, 'salida', 0, '2024-03-27', 41, 3, NULL, 2),
(108, 'salida', 220, '2024-03-29', 2, 5, NULL, 2),
(110, 'entrada', 654, '2024-03-29', 1, 30, 3, NULL),
(111, 'salida', 654, '2024-03-29', 42, 30, NULL, 2),
(112, 'salida', 20, '2024-03-30', 2, 5, NULL, 2),
(113, 'entrada', 100, '2024-03-31', 41, 5, 4, NULL),
(114, 'salida', 120, '2024-03-31', 42, 5, NULL, 3),
(115, 'salida', 0, '2024-04-13', 2, 32, NULL, 2),
(116, 'salida', 0, '2024-04-13', 41, 31, NULL, 2),
(117, 'salida', 0, '2024-04-13', 41, 32, NULL, 1),
(118, 'salida', 0, '2024-04-13', 41, 31, NULL, 2),
(119, 'salida', 0, '2024-04-13', 2, 30, NULL, 2),
(120, 'salida', 0, '2024-04-13', 2, 31, NULL, 1),
(121, 'salida', 0, '2024-04-13', 41, 31, NULL, 2),
(122, 'entrada', 45, '2024-05-13', 1, 31, 72, NULL),
(123, 'salida', 100, '2024-05-13', 41, 32, NULL, 1),
(124, 'salida', 45, '2024-05-13', 2, 31, NULL, 2),
(125, 'salida', 20, '2024-05-13', 2, 32, NULL, 1),
(126, 'salida', 2, '2024-05-13', 2, 30, NULL, 1),
(127, 'salida', 2, '2024-05-13', 41, 31, NULL, 2),
(128, 'salida', 4, '2024-05-13', 2, 31, NULL, 2),
(129, 'salida', 20, '2024-05-13', 2, 31, NULL, 1),
(130, 'salida', 20, '2024-05-13', 41, 31, NULL, 2),
(131, 'salida', 2, '2024-05-13', 1, 31, NULL, 1),
(132, 'salida', 10, '2024-05-13', 41, 31, NULL, 2),
(133, 'salida', 4, '2024-05-13', 1, 32, NULL, 1),
(134, 'salida', 4, '2024-05-13', 1, 31, NULL, 3),
(135, 'salida', 1, '2024-05-13', 1, 31, NULL, 2),
(136, 'salida', 0, '2024-05-13', 2, 30, NULL, 1),
(137, 'salida', 2, '2024-05-13', 41, 31, NULL, 2),
(138, 'salida', 3, '2024-05-13', 2, 31, NULL, 1),
(139, 'entrada', 48, '2024-05-13', 1, 1, 9, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `residuos`
--

CREATE TABLE `residuos` (
  `id_residuo` int(11) NOT NULL,
  `nombre_residuo` varchar(50) DEFAULT NULL,
  `residuo` enum('no peligrosos','peligrosos') DEFAULT NULL,
  `tipo_residuo` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `unidad_medida` enum('kilogramo','gramo','litros','m3','m2','unidad') DEFAULT NULL,
  `fk_alm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `residuos`
--

INSERT INTO `residuos` (`id_residuo`, `nombre_residuo`, `residuo`, `tipo_residuo`, `cantidad`, `unidad_medida`, `fk_alm`) VALUES
(1, 'carton', 'no peligrosos', 2, 48, 'm2', 3),
(3, 'medida2', 'peligrosos', 2, 20, 'kilogramo', 4),
(4, 'minu', 'no peligrosos', 4, 0, 'litros', 3),
(5, 'prueba', 'peligrosos', 7, 0, 'unidad', 9),
(12, 'residuo 1', 'no peligrosos', 1, 0, 'kilogramo', 5),
(13, 'residuo 1.2', 'no peligrosos', 1, 12, 'kilogramo', 5),
(15, 'residuo 56', 'no peligrosos', 1, 26, 'kilogramo', 5),
(16, 'residuo idiididi', 'no peligrosos', 1, 26, 'kilogramo', 5),
(18, 'residuo alm 18', 'peligrosos', 3, 0, 'gramo', 4),
(19, 'residuo alm 1', 'no peligrosos', 1, 49, 'kilogramo', 5),
(20, 'residuo actividad', 'no peligrosos', 1, 4, 'kilogramo', 5),
(21, 'residuo actividad 2', 'no peligrosos', 1, 0, 'kilogramo', 5),
(22, 'express validator 123', 'peligrosos', 2, 20121221, 'litros', 6),
(30, 'express validator 222', 'peligrosos', 2, 0, 'm3', 2),
(31, 'express  222uno', 'peligrosos', 2, 0, 'm3', 2),
(32, 'express  222', 'peligrosos', 2, 0, 'm3', 2),
(33, '211323', 'peligrosos', 2, 0, 'm3', 2),
(34, '211323', 'peligrosos', 2, 0, 'm3', 2),
(35, '1111111111111111', 'peligrosos', 2, 0, 'm3', 2),
(36, '111', 'peligrosos', 5, 1000, 'litros', 2),
(37, 'p registro act', 'no peligrosos', 1, 20, 'kilogramo', 2),
(38, 'Prueba FRONTENDaaaa', 'peligrosos', 1, 10, 'litros', 5),
(39, '3333333333333333333333333', 'peligrosos', 1, 0, 'm2', 6),
(41, 'hola123', 'peligrosos', 2, 20, 'gramo', 2),
(42, 'nuevo', 'no peligrosos', 3, 0, 'litros', 5),
(47, 'ccccccccccccc12131313', 'peligrosos', 3, 451, 'gramo', 6),
(48, '77numero', 'peligrosos', 2, 561, 'kilogramo', 5),
(49, '8888888888888888888888', 'peligrosos', 1, 0, 'kilogramo', 5),
(50, '8888888888888888888888', 'peligrosos', 2, 0, 'gramo', 6),
(51, 'asxasxasxasx', 'peligrosos', 4, 0, 'kilogramo', 5),
(52, 'tru', 'peligrosos', 2, 0, 'kilogramo', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id_tipo` int(11) NOT NULL,
  `tipo_residuo` varchar(50) NOT NULL,
  `tipo` enum('no peligroso','peligroso') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id_tipo`, `tipo_residuo`, `tipo`) VALUES
(1, 'aprovechables', 'no peligroso'),
(2, 'aprovechables organicos', 'no peligroso'),
(3, 'no aprovechables', 'no peligroso'),
(4, 'especiales', 'no peligroso'),
(5, 'riesgo biologico', 'peligroso'),
(6, 'riesgo quimico', 'peligroso'),
(7, 'radiactivo', 'peligroso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `identificacion` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('administrador','pasante','operario') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `identificacion`, `email`, `password`, `rol`, `estado`) VALUES
(1, 'miller efren2', 'apellidos', '1007750963', 'miller@gmail.com', '1234', 'administrador', 'inactivo'),
(2, 'efren', 'bermeo', '987654321', 'efren@gmail.com', '321', 'administrador', 'inactivo'),
(7, 'Juan', 'Perez', '123456789', 'juan.perez@example.com', '123', 'operario', 'activo'),
(8, 'María', 'Gómez', '987654321', 'maria.gomez@example.com', 'contraseña2', 'pasante', 'inactivo'),
(9, 'Carlos', 'Rodríguez', '456789123', 'carlos.rodriguez@example.com', 'contraseña3', 'pasante', 'inactivo'),
(10, 'Ana', 'Martínez', '789123456', 'ana.martinez@example.com', 'contraseña4', 'pasante', 'activo'),
(11, 'Pedro', 'López', '321654987', 'pedro.lopez@example.com', 'contraseña5', 'pasante', 'activo'),
(12, 'Laura', 'Sánchez', '654987321', 'laura.sanchez@example.com', 'contraseña6', 'pasante', 'activo'),
(13, 'Miguel', 'Fernández', '987321654', 'miguel.fernandez@example.com', 'contraseña7', 'pasante', 'activo'),
(14, 'Sofía', 'Díaz', '159263478', 'sofia.diaz@example.com', 'contraseña8', 'pasante', 'inactivo'),
(15, 'Jorge', 'Ruiz', '357159264', 'jorge.ruiz@example.com', 'contraseña9', 'pasante', 'activo'),
(16, 'Ana', 'García', '852963741', 'ana.garcia@example.com', 'contraseña10', 'pasante', 'activo'),
(17, 'David', 'Hernández', '741852963', 'david.hernandez@example.com', 'contraseña11', 'pasante', 'activo'),
(18, 'Elena', 'Jiménez', '369258147', 'elena.jimenez@example.com', 'contraseña12', 'pasante', 'activo'),
(19, 'Diego', 'Gutiérrez', '147258369', 'diego.gutierrez@example.com', 'contraseña13', 'pasante', 'activo'),
(20, 'Martina', 'Alvarez', '258369147', 'martina.alvarez@example.com', 'contraseña14', 'pasante', 'activo'),
(21, 'Luis', 'Romero', '369147258', 'luis.romero@example.com', 'contraseña15', 'pasante', 'activo'),
(22, 'Daniel', 'González', '123456780', 'daniel.gonzalez@example.com', 'contraseña16', 'pasante', 'activo'),
(23, 'Lucía', 'Santos', '987654322', 'lucia.santos@example.com', 'contraseña17', 'pasante', 'activo'),
(24, 'Roberto', 'Jiménez', '456789124', 'roberto.jimenez@example.com', 'contraseña18', 'pasante', 'activo'),
(25, 'Marina', 'Ruíz', '789123457', 'marina.ruiz@example.com', 'contraseña19', 'pasante', 'activo'),
(26, 'Alejandro', 'Martín', '321654988', 'alejandro.martin@example.com', 'contraseña20', 'pasante', 'activo'),
(27, 'Eva', 'Herrera', '654987322', 'eva.herrera@example.com', 'contraseña21', 'pasante', 'activo'),
(28, 'Natalia', 'López', '987321655', 'natalia.lopez@example.com', 'contraseña22', 'pasante', 'activo'),
(29, 'Hugo', 'Gómez', '159263479', 'hugo.gomez@example.com', 'contraseña23', 'pasante', 'activo'),
(30, 'Carolina', 'Díaz', '357159265', 'carolina.diaz@example.com', 'contraseña24', 'pasante', 'activo'),
(31, 'Marcos', 'Pérez', '852963742', 'marcos.perez@example.com', 'contraseña25', 'pasante', 'activo'),
(32, 'Andrea', 'Fernández', '741852964', 'andrea.fernandez@example.com', 'contraseña26', 'pasante', 'activo'),
(33, 'Pablo', 'García', '369258148', 'pablo.garcia@example.com', 'contraseña27', 'pasante', 'activo'),
(34, 'Sara', 'Martínez', '147258370', 'sara.martinez@example.com', 'contraseña28', 'pasante', 'activo'),
(35, 'Javier', 'Gutiérrez', '258369148', 'javier.gutierrez@example.com', 'contraseña29', 'pasante', 'activo'),
(36, 'Beatriz', 'Alonso', '369147259', 'beatriz.alonso@example.com', 'contraseña30', 'pasante', 'activo'),
(37, 'Manuel', 'López', '123456781', 'manuel.lopez@example.com', 'contraseña31', 'pasante', 'activo'),
(38, 'Nerea', 'Sánchez', '987654323', 'nerea.sanchez@example.com', 'contraseña32', 'pasante', 'activo'),
(39, 'Héctor', 'Ramírez', '456789125', 'hector.ramirez@example.com', 'contraseña33', 'pasante', 'activo'),
(40, 'Alicia', 'Hernández', '789123458', 'alicia.hernandez@example.com', 'contraseña34', 'pasante', 'activo'),
(41, 'Diego', 'Díaz', '321654989', 'diego.diaz@example.com', 'contraseña35', 'administrador', 'activo'),
(42, 'nuevo user', 'rivera', '1007750963', 'miller2@gmail.com', '123', 'administrador', 'activo'),
(43, '111111111111111', '1111111111111', '111111111111', '11@gmail.com', '123', 'pasante', 'activo'),
(44, 'miller', 'apellido', '1007750963', 'miller@gmail.com', '123', 'administrador', 'activo'),
(45, 'xsaxcas', 'xasxasx', 'asxasx', 'asxas', 'sa', 'administrador', 'activo'),
(46, 'prueba 12345', 'prueba', '100775096311111', 'prueba.hmail.com', '123', 'pasante', 'activo'),
(47, 'millerrrrrrrrrrrrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrr', '1007750963', 'e12@gmail.com', '123', 'pasante', 'activo'),
(48, 'miller', 'apellido', '10077509631', '1234', 'e12e21', 'operario', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_actividades`
--

CREATE TABLE `usuarios_actividades` (
  `id_relacion` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_actividades`
--

INSERT INTO `usuarios_actividades` (`id_relacion`, `fk_usuario`, `fk_actividad`) VALUES
(1, 1, 8),
(2, 2, 8),
(3, 8, 8),
(4, 1, 9),
(5, 2, 9),
(6, 8, 9),
(7, 7, 10),
(8, 8, 10),
(9, 9, 10),
(10, 7, 11),
(11, 7, 18),
(12, 8, 18),
(13, 9, 18),
(14, 23, 18),
(15, 24, 18),
(16, 7, 20),
(17, 8, 20),
(18, 9, 33),
(19, 13, 33),
(20, 19, 33),
(21, 8, 35),
(22, 18, 35),
(23, 28, 35),
(24, 38, 35),
(25, 47, 35),
(26, 14, 41),
(27, 19, 41),
(28, 20, 41),
(29, 8, 42),
(30, 18, 42),
(31, 23, 42),
(32, 27, 42),
(33, 28, 42),
(34, 32, 42),
(35, 33, 42),
(36, 37, 42),
(37, 38, 42),
(38, 12, 43),
(39, 17, 43),
(40, 22, 43),
(41, 32, 43),
(42, 7, 59),
(43, 12, 59),
(44, 12, 60),
(45, 23, 60),
(46, 13, 61),
(47, 23, 61),
(48, 28, 61),
(49, 33, 61),
(50, 13, 62),
(51, 18, 62),
(52, 9, 63),
(53, 19, 63),
(54, 7, 64),
(55, 12, 64),
(56, 17, 64),
(57, 8, 65),
(58, 19, 65),
(59, 23, 65),
(60, 25, 65),
(61, 28, 65),
(62, 30, 65),
(63, 34, 65),
(64, 13, 66),
(65, 19, 66),
(66, 28, 66),
(67, 29, 66),
(68, 47, 66),
(69, 23, 67),
(70, 33, 67),
(71, 38, 67),
(72, 19, 68),
(73, 35, 68),
(74, 28, 69),
(75, 38, 69),
(76, 9, 70),
(77, 14, 70),
(78, 18, 71),
(79, 38, 71),
(80, 24, 72),
(81, 39, 72),
(82, 22, 73),
(83, 7, 75),
(84, 27, 75);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `lugar_actividad` (`lugar_actividad`);

--
-- Indices de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD PRIMARY KEY (`id_almacenamiento`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_lugar`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elemento`);

--
-- Indices de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD PRIMARY KEY (`id_elm_act`),
  ADD KEY `fk_elemento` (`fk_elemento`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- Indices de la tabla `empresas_recoleccion`
--
ALTER TABLE `empresas_recoleccion`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD PRIMARY KEY (`id_lugar`),
  ADD KEY `fk_area` (`fk_area`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `fk_residuo` (`fk_residuo`),
  ADD KEY `fk_elemento` (`usuario_adm`),
  ADD KEY `fk_actividad` (`fk_actividad`),
  ADD KEY `destino` (`destino`),
  ADD KEY `destino_2` (`destino`);

--
-- Indices de la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD PRIMARY KEY (`id_residuo`),
  ADD KEY `fk_alm` (`fk_alm`),
  ADD KEY `tipo_residuo` (`tipo_residuo`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD PRIMARY KEY (`id_relacion`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `id_almacenamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_lugar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  MODIFY `id_elm_act` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `empresas_recoleccion`
--
ALTER TABLE `empresas_recoleccion`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `lugares`
--
ALTER TABLE `lugares`
  MODIFY `id_lugar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id_movimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `residuos`
--
ALTER TABLE `residuos`
  MODIFY `id_residuo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  MODIFY `id_relacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_2` FOREIGN KEY (`lugar_actividad`) REFERENCES `areas` (`id_lugar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD CONSTRAINT `elementos_actividades_ibfk_1` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `realiza` FOREIGN KEY (`fk_elemento`) REFERENCES `elementos` (`id_elemento`);

--
-- Filtros para la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD CONSTRAINT `lugares_ibfk_1` FOREIGN KEY (`fk_area`) REFERENCES `areas` (`id_lugar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`fk_residuo`) REFERENCES `residuos` (`id_residuo`),
  ADD CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientos_ibfk_4` FOREIGN KEY (`usuario_adm`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientos_ibfk_5` FOREIGN KEY (`destino`) REFERENCES `empresas_recoleccion` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD CONSTRAINT `residuos_ibfk_1` FOREIGN KEY (`fk_alm`) REFERENCES `almacenamiento` (`id_almacenamiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `residuos_ibfk_2` FOREIGN KEY (`tipo_residuo`) REFERENCES `tipos` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD CONSTRAINT `usuarios_actividades_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_actividades_ibfk_2` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
