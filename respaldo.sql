-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: vadieg2025
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `emails` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Sistemas','soporte01@example.es'),(2,'Recursos Humanos','rrhh@example.com'),(4,'Calidad','example@example.es');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'CREACION DE PRODUCTOS (TCOP)','Datos para crear en el sistema'),(2,'CREACION DE PRODUCTOS (PROTHEUS)',NULL),(3,'COMPRA DE INSUMOS',NULL),(4,'ACTUALIZACION DE EQUIPO','Aumento de ram,cambio de disco ,etc');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactos`
--

DROP TABLE IF EXISTS `contactos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fecha_nac` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactos`
--

LOCK TABLES `contactos` WRITE;
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` VALUES (1,'Ivan Bravo','3515553253','soporte01@vadiegsa.com','12/01/1993'),(2,'Federico Nuñez','3513793692','sistemas@vadiegsa.com','09/02/1994'),(3,'Martin Pereyra','3513981153','adminobra01@vadiegsa.com','1988-03-11'),(4,'Yenitza Alayon','3513793696','coordoficinatecnica@vadiegsa.com','1990-03-18'),(5,'Gabriela Pintos','3512491040','oficinatecnica01@vadiegsa.com','1990-03-19'),(6,'Thomas Bustos','3516577463','oficinatecnica03@vadiegsa.com','1990-03-20'),(7,'Nuevo','1111111','example@example.es','2025-03-18');
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenidos`
--

DROP TABLE IF EXISTS `contenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `fecha` date DEFAULT NULL,
  `clase` enum('Novedades','Documentación') COLLATE utf8mb4_general_ci NOT NULL,
  `archivo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidos`
--

LOCK TABLES `contenidos` WRITE;
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
INSERT INTO `contenidos` VALUES (82,'Baja de Empleado','Buenos días estimados, por medio de la presente se les comunica desde el área de Recursos Humanos que María José Guerra, Jefa de Obra de Nueva Sede, a partir de hoy ya no trabaja en Vadieg. \r\n\r\nSaludos a todos. ','2025-03-18','Novedades',NULL),(83,'Nueva Obra','Se informa que ya esta en curso la nueva obra RIO IV a cargo del ING. LAPENTA','2025-03-18','Novedades',NULL),(84,'Incorporación Sebastian Dantones','Nuevo administrativo de obra','2025-03-18','Novedades','uploads/1742317778990-5d826fc9-e5e5-4a7a-8588-e9e3b3fdcce2.jpg'),(85,'Nuevo formulario para completar ','Desde el area sistemas les compatimos el formulario de notebook','2025-03-18','Documentación','https://docs.google.com/forms/d/e/1FAIpQLSenUWXVVAzybppxJx-5fCLFDTBbfFkoarEP7x9xaqBJZim2Rg/viewform?usp=header');
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_ticket`
--

DROP TABLE IF EXISTS `historial_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `status_anterior` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status_nuevo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_cambio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observacion` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  CONSTRAINT `historial_ticket_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_ticket`
--

LOCK TABLES `historial_ticket` WRITE;
/*!40000 ALTER TABLE `historial_ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_logs`
--

DROP TABLE IF EXISTS `login_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `device_info` text,
  `login_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `computer_name` varchar(255) NOT NULL DEFAULT 'Desconocido',
  `user_name` varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_logs`
--

LOCK TABLES `login_logs` WRITE;
/*!40000 ALTER TABLE `login_logs` DISABLE KEYS */;
INSERT INTO `login_logs` VALUES (65,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-17 16:34:43','Desconocido','ibravo'),(66,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-18 14:01:55','Desconocido','ibravo'),(67,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-18 14:17:36','Desconocido','ibravo'),(68,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-20 12:09:59','Desconocido','ibravo'),(69,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-25 11:11:45','Desconocido','ibravo'),(70,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-26 10:08:27','Desconocido','ibravo'),(71,36,'::ffff:192.168.1.65','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','2025-03-31 16:43:22','Desconocido','ibravo');
/*!40000 ALTER TABLE `login_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manuales`
--

DROP TABLE IF EXISTS `manuales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manuales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `url_documento` varchar(500) NOT NULL,
  `fecha_subida` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_subio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manuales`
--

LOCK TABLES `manuales` WRITE;
/*!40000 ALTER TABLE `manuales` DISABLE KEYS */;
INSERT INTO `manuales` VALUES (42,'Nuevo Manual TCOP','Se comparte el nuevo manual de procedimientos de compras','/uploads/1742318629189-GestiÃ³n de Contratos POR PAGAR v01 (4).pdf','2025-03-18 00:00:00','Ivan Bravo');
/*!40000 ALTER TABLE `manuales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pendiente','asignado','en_progreso','cerrado') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pendiente',
  `urgency` enum('baja','media','alta') COLLATE utf8mb4_general_ci DEFAULT 'baja',
  `assigned_to` int DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_area` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assigned_to` (`assigned_to`),
  KEY `created_by` (`created_by`),
  KEY `area_id_fk` (`id_area`),
  KEY `fk_categoria` (`id_categoria`),
  CONSTRAINT `area_id_fk` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (136,'Nuevo producto tcop','ADAPTADOR BRIDA - FAMILIA M-ACC-JNT','en_progreso','alta',19,36,'2025-03-18 18:14:06','2025-03-20 15:12:11',NULL,1,1),(137,'Mantenimiento NTBK-0005','Se solicita una verificación a la notebook','asignado','media',36,36,'2025-03-18 18:15:01','2025-03-20 15:10:32',NULL,1,4),(138,'Tóner impresora','Se solicita la compra de insumo para impresora IMPR-0001','cerrado','media',NULL,36,'2025-03-20 15:14:00','2025-03-20 15:14:36',NULL,1,3),(139,'Prueba de ticket cerrado','Prueba de ticket cerrado 00000000','asignado','media',NULL,36,'2025-03-31 19:44:37','2025-03-31 19:45:00',NULL,1,2);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_area` int NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `area_id_fk1` (`id_area`),
  CONSTRAINT `area_id_fk1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'Administrador','$2a$10$UYuzv4KlbuhMrfbaTgjFuOC42KCkXa/eZX1J5TJ/0RD1Sd3CtApWW','sistemas@vadiegsa.com','admin','2025-01-17 19:41:38',1,'admin'),(36,'ibravo','$2a$10$uBKMBHBN2S8NHmxy1D8Yau6Rl2mOwxrr60cXz9rE93EnOAi8nf8km','ivanbravo1993@example.es','admin','2025-01-31 12:28:32',1,'Ivan Bravo'),(43,'syorio','$2a$10$qUnISFH6BBeMai/sYRdB3O91kVQk5Zeqv1qWuVcHaUP1AATc/9foa','syorio@vadiegsa.com','user','2025-03-12 16:43:42',4,'Silvio Yorio');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vadieg2025'
--

--
-- Dumping routines for database 'vadieg2025'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-13 13:57:02
