-- CREATE DATABASE `eventTracker`;
-- USE `eventTracker`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_key` varchar(45) NOT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  PRIMARY KEY (`event_id`)
);

DROP TABLE IF EXISTS `users`;
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
);

DROP PROCEDURE IF EXISTS `filter_events`;
CREATE PROCEDURE `filter_events`(
	IN p_key VARCHAR(50),
    IN p_from BIGINT(20),
    IN p_to BIGINT(20)
)
BEGIN
	SELECT from_unixtime(created_at/1000, "%m-%d") as day, COUNT(*) as event_count
	FROM eventTracker.events
	WHERE (p_key IS NULL OR event_key = p_key)
        AND (p_from IS NULL OR created_at >= p_from)
        AND (p_to IS NULL OR created_at <= p_to)
	GROUP BY day
	ORDER BY day  ASC;
END