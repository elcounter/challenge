-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 23 avr. 2019 à 19:55
-- Version du serveur :  10.1.34-MariaDB
-- Version de PHP :  7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `simplon_hosting`
--
CREATE DATABASE 'simplon_hosting'
-- --------------------------------------------------------

--
-- Structure de la table `hostings`
--

CREATE TABLE `hostings` (
  `id` int(11) NOT NULL,
  `clientName` varchar(100) NOT NULL,
  `projectName` varchar(100) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `hostingPrice` decimal(3,0) NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hostings`
--

INSERT INTO `hostings` (`id`, `clientName`, `projectName`, `domain`, `hostingPrice`, `startDate`, `endDate`) VALUES
(1, 'Blue', 'BlueCorp', 'OVH', '15', '2019-01-10', '2020-01-10'),
(2, 'Hervé', 'RV', 'o2switch', '16', '2017-08-15', '2019-08-15'),
(3, 'Cindy', 'LeBonPain', 'one&one', '35', '2019-02-26', '2029-02-26'),
(4, 'Dan', 'DanTech', 'OVH', '15', '2018-10-10', '2021-10-10'),
(5, 'Fleur', 'Grand Paris', 'one&one', '35', '2009-12-09', '2039-12-09'),
(6, 'Dupont', 'Abitat', 'OVH', '35', '2019-12-09', '2029-10-11'),
(7, 'Castel', 'RST consulting', 'Gandi', '22', '2009-12-09', '2059-12-09'),
(8, 'Mike', 'Chez Mike', 'lws', '76', '2002-01-19', '2020-12-19'),
(9, 'Denise', 'Pullstack.io', 'o2switch', '15', '2019-12-09', '2059-12-09');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isSuperAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `isSuperAdmin`) VALUES
(1, 'SuperAdmin', 'superadmin@gmail.com', '!Superadmin2019', 1),
(2, 'Admin', 'admin@gmail.com', '!Admin2019', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `hostings`
--
ALTER TABLE `hostings`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `hostings`
--
ALTER TABLE `hostings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
