--This is the same database you get from Moodle, included here just for clarity. I used Bitnami WAMP Stack and PhpMyAdmin to test it out

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 17, 2020 at 01:02 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `customer`
--
CREATE DATABASE IF NOT EXISTS `customer` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `customer`;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `CUSTOMERID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) CHARACTER SET latin1 NOT NULL,
  `ADDRESS` varchar(50) CHARACTER SET latin1 NOT NULL,
  `POSTALNUMBER` varchar(5) CHARACTER SET latin1 NOT NULL,
  `POSTALOFFICE` varchar(50) CHARACTER SET latin1 NOT NULL,
  `CREATEDDATE` date NOT NULL,
  `CUSTOMERTYPE` int(11) NOT NULL,
  PRIMARY KEY (`CUSTOMERID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CUSTOMERID`, `NAME`, `ADDRESS`, `POSTALNUMBER`, `POSTALOFFICE`, `CREATEDDATE`, `CUSTOMERTYPE`) VALUES
(1, 'KALLE TAPPINEN', 'OPISTOTIE 2', '70100', 'KUOPIO', '2011-12-01', 1),
(2, 'VILLE VALLATON', 'MICROKATU 2', '70100', 'KUOPIO', '2011-12-03', 2),
(3, 'Kalle Östilä', 'Teku', '70100', 'Kuopio', '2018-09-22', 1),
(4, 'Keke Amstrong', 'Viasat', '00010', 'Tsadi', '2018-09-22', 2),
(7, 'Pasi Rautiainen', 'Viaplay', '89100', 'Rovaniemi', '2018-09-22', 1),
(8, 'mauri', 'Toivalantie 25', '7100', 'Siili', '2018-09-22', 2),
(11, 'Ã„mmÃ¤lÃ¤ Ã„ijÃ¤', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2),
(12, 'Ã„mmÃ¤lÃ¤ Ã„ijÃ¤', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2),
(13, 'Ämmälä', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2);

-- --------------------------------------------------------

--
-- Table structure for table `customertype`
--

DROP TABLE IF EXISTS `customertype`;
CREATE TABLE IF NOT EXISTS `customertype` (
  `CUSTOMERTYPEID` int(11) NOT NULL AUTO_INCREMENT,
  `ABBREVIATION` varchar(10) NOT NULL,
  `DESCRIPTION` varchar(50) NOT NULL,
  PRIMARY KEY (`CUSTOMERTYPEID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customertype`
--

INSERT INTO `customertype` (`CUSTOMERTYPEID`, `ABBREVIATION`, `DESCRIPTION`) VALUES
(1, 'CP', 'COMPANY'),
(2, 'CO', 'CONSUMER');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;