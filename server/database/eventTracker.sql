-- MySQL dump 10.13  Distrib 5.7.21, for macos10.13 (x86_64)
--
-- Host: localhost    Database: eventTracker
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_key` varchar(45) NOT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'eventkey3',NULL,1526203736408,1526203736408),(2,'eventkey3',NULL,1526203737371,1526203737371),(3,'eventkey1',NULL,1526203742445,1526203742445),(4,'eventkey2',NULL,1526203745493,1526203745493),(5,'eventkey2','{\"new\": \"new-meta\"}',1526227211184,1526227211184),(6,'eventkey2','{\"new\": \"new-meta\"}',1526227214449,1526227214449),(7,'eventkey2','{\"new\": \"new-meta\"}',1526227214892,1526227214892),(8,'eventkey2','{\"new\": \"new-meta\"}',1526227215323,1526227215323),(9,'eventkey2','{\"new\": \"new-meta\"}',1526227216752,1526227216752),(10,'eventkey2','{\"new\": \"new-meta\"}',1526227216984,1526227216984),(11,'eventkey2','{\"new\": \"new-meta\"}',1526227217351,1526227217351),(12,'eventkey2','{\"new\": \"new-meta\"}',1526227217592,1526227217592),(13,'eventkey2','{\"new\": \"new-meta\"}',1526227217846,1526227217846),(14,'eventkey2','{\"new\": \"new-meta\"}',1526227218054,1526227218054),(15,'eventkey2','{\"new\": \"new-meta\"}',1526227218266,1526227218266),(16,'eventkey5','{\"new\": \"new-meta\"}',1526227225123,1526227225123),(17,'eventkey2','\"\"',1526391037750,1526391037750),(18,'eventkey2','\"\"',1526391087202,1526391087202),(19,'eventkey2','\"\"',1526391087690,1526391087690),(20,'eventkey2','\"\"',1526391088241,1526391088241),(21,'eventkey2','\"\"',1526391088725,1526391088725);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'/20180513064114-create-tables','2018-05-13 17:28:35');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'pulmano.zarah@gmail.com','$2a$10$un542OCHDauBlHIlPzZqvOzeelXDWi64kY7k2fkW8qLbSI8DplmoS','Zarah','Pulmano',1526215058551,1526215058551),(2,'jcsoriano@gmail.com','$2a$10$0J2e4Jc.HpLVEQNzgPbhzuPRLcYw4sOijTnx5nv5k6Z.7dg443rh.','JC','Soriano',1526226957797,1526226957797);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-16  0:13:02
