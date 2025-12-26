-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.5 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for fixit_workshop
CREATE DATABASE IF NOT EXISTS `fixit_workshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fixit_workshop`;

-- Dumping structure for table fixit_workshop.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.cache: ~2 rows (approximately)
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('fixit-workshop-cache-90359740c609eecdfa8f6e4a81375359', 'i:2;', 1766752930),
	('fixit-workshop-cache-90359740c609eecdfa8f6e4a81375359:timer', 'i:1766752930;', 1766752930);

-- Dumping structure for table fixit_workshop.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.cache_locks: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.contacts: ~3 rows (approximately)
INSERT INTO `contacts` (`id`, `name`, `email`, `message`, `created_at`, `updated_at`) VALUES
	(1, 'Иван Петров', 'ivan@example.com', 'Здравствуйте, интересует стоимость ремонта ноутбука.', '2025-12-21 20:18:12', NULL),
	(2, 'Мария Смирнова', 'maria@example.com', 'Можно ли заменить экран на iPhone?', '2025-12-22 20:18:12', NULL),
	(3, 'Алексей Иванов', 'alexey@example.com', 'Сколько времени занимает диагностика?', '2025-12-23 20:18:12', NULL);

-- Dumping structure for table fixit_workshop.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.favorites
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `service_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favorites_user_id_service_id_unique` (`user_id`,`service_id`),
  KEY `favorites_service_id_foreign` (`service_id`),
  CONSTRAINT `favorites_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.favorites: ~2 rows (approximately)
INSERT INTO `favorites` (`id`, `user_id`, `service_id`, `created_at`, `updated_at`) VALUES
	(3, 12, 2, '2025-12-24 20:55:25', '2025-12-24 20:55:25'),
	(5, 12, 3, '2025-12-26 13:27:34', '2025-12-26 13:27:34'),
	(6, 13, 2, '2025-12-26 13:38:33', '2025-12-26 13:38:33'),
	(7, 13, 3, '2025-12-26 13:38:33', '2025-12-26 13:38:33');

-- Dumping structure for table fixit_workshop.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.jobs: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.job_batches: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.migrations: ~15 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_09_02_075243_add_two_factor_columns_to_users_table', 1),
	(5, '2025_12_23_140138_create_services_table', 1),
	(6, '2025_12_23_140151_create_projects_table', 1),
	(7, '2025_12_23_140202_create_price_lists_table', 1),
	(8, '2025_12_23_140216_create_orders_table', 1),
	(9, '2025_12_23_140226_create_reviews_table', 1),
	(10, '2025_12_23_140311_create_contacts_table', 1),
	(11, '2025_12_23_141437_create_roles_table', 1),
	(12, '2025_12_23_141449_create_role_user_table', 1),
	(13, '2025_12_23_151526_create_news_table', 1),
	(14, '2025_12_24_152837_create_personal_access_tokens_table', 1),
	(15, '2025_12_24_201741_create_favorites_table', 1);

-- Dumping structure for table fixit_workshop.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_published_at_index` (`published_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.news: ~6 rows (approximately)
INSERT INTO `news` (`id`, `title`, `body`, `published_at`, `created_at`, `updated_at`) VALUES
	(1, 'Открытие нового офиса', 'Мы запустили новый филиал в Москве для ещё большего удобства клиентов.', '2025-07-12', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 'Новая категория услуг', 'Теперь мы предлагаем ремонт промышленного оборудования и станков.', '2025-07-01', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(3, 'Бонусная программа', 'Запустили систему бонусов и скидок для постоянных клиентов.', '2025-06-20', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(4, 'Расширение команды мастеров', 'К нам присоединились новые специалисты по деревообработке и электронике.', '2025-06-10', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(5, 'Обновление интерфейса сайта', 'Добавлены новые разделы, улучшена навигация и адаптивность на мобильных устройствах.', '2025-05-28', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(6, 'Новый партнёр по поставке материалов', 'Мы заключили соглашение с поставщиком премиальных материалов для реставрации мебели.', '2025-05-15', '2025-12-24 20:18:12', '2025-12-24 20:18:12');

-- Dumping structure for table fixit_workshop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `service_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `items_json` json DEFAULT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `order_date` date DEFAULT NULL,
  `order_status` enum('pending','confirmed','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_service_id_foreign` (`service_id`),
  CONSTRAINT `orders_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.orders: ~1 rows (approximately)
INSERT INTO `orders` (`id`, `user_id`, `service_id`, `name`, `email`, `phone`, `details`, `items_json`, `total`, `order_date`, `order_status`, `created_at`, `updated_at`) VALUES
	(1, 12, 1, 'test2', 'test2@ec.com', '5555', NULL, NULL, 500.00, '2025-12-26', 'cancelled', '2025-12-26 13:29:16', '2025-12-26 13:29:24'),
	(2, 13, 1, 'Botov2', 'botov@botov.com', '78898444', NULL, NULL, 500.00, '2025-12-26', 'pending', '2025-12-26 13:38:30', '2025-12-26 13:38:30'),
	(3, 13, 3, 'Botov2', 'botov@botov.com', '78898444', NULL, NULL, 300.00, '2025-12-26', 'pending', '2025-12-26 13:38:31', '2025-12-26 13:38:31');

-- Dumping structure for table fixit_workshop.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.personal_access_tokens: ~1 rows (approximately)
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
	(2, 'App\\Models\\User', 13, 'api', '7bcc4f7e4641c2d67913903c1cc3be855d873e193fe09379101105a5fc35f3ee', '["*"]', '2025-12-26 14:05:14', NULL, '2025-12-26 13:38:17', '2025-12-26 14:05:14');

-- Dumping structure for table fixit_workshop.price_lists
CREATE TABLE IF NOT EXISTS `price_lists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `price_lists_service_id_foreign` (`service_id`),
  CONSTRAINT `price_lists_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.price_lists: ~12 rows (approximately)
INSERT INTO `price_lists` (`id`, `service_id`, `description`, `price`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Диагностика/осмотр', 200.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 1, 'Замена фурнитуры', 450.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(3, 1, 'Укрепление конструкции', 700.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(4, 2, 'Диагностика', 300.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(5, 2, 'Замена расходников', 600.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(6, 2, 'Ремонт узла', 1200.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(7, 5, 'Выезд и диагностика', 1500.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(8, 5, 'Настройка/калибровка', 2500.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(9, 5, 'Ремонт механики', 5000.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(10, 8, 'Подготовка поверхности', 600.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(11, 8, 'Покраска/покрытие', 900.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(12, 8, 'Восстановление деталей', 1400.00, '2025-12-24 20:18:12', '2025-12-24 20:18:12');

-- Dumping structure for table fixit_workshop.projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_service_id_foreign` (`service_id`),
  CONSTRAINT `projects_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.projects: ~4 rows (approximately)
INSERT INTO `projects` (`id`, `service_id`, `name`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Восстановление стула', 'Укрепление ножек и замена крепежа', '/images/projects/chair.jpg', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 1, 'Ремонт кухонного фасада', 'Замена петли и восстановление скола', '/images/projects/kitchen.jpg', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(3, 2, 'Ремонт стиральной машины', 'Замена насоса и чистка', '/images/projects/washer.jpg', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(4, 8, 'Реставрация комода', 'Шлифовка + покраска + фурнитура', '/images/projects/commode.jpg', '2025-12-24 20:18:12', '2025-12-24 20:18:12');

-- Dumping structure for table fixit_workshop.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `service_id` bigint unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_service_id_foreign` (`service_id`),
  CONSTRAINT `reviews_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.reviews: ~0 rows (approximately)

-- Dumping structure for table fixit_workshop.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.roles: ~2 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 'User', 'user', '2025-12-24 20:18:12', '2025-12-24 20:18:12');

-- Dumping structure for table fixit_workshop.role_user
CREATE TABLE IF NOT EXISTS `role_user` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.role_user: ~11 rows (approximately)
INSERT INTO `role_user` (`user_id`, `role_id`, `created_at`, `updated_at`) VALUES
	(1, 1, NULL, NULL),
	(2, 2, NULL, NULL),
	(3, 2, NULL, NULL),
	(4, 2, NULL, NULL),
	(5, 2, NULL, NULL),
	(6, 2, NULL, NULL),
	(7, 2, NULL, NULL),
	(8, 2, NULL, NULL),
	(9, 2, NULL, NULL),
	(10, 2, NULL, NULL),
	(11, 2, NULL, NULL);

-- Dumping structure for table fixit_workshop.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('household','industrial','custom_project','restoration') COLLATE utf8mb4_unicode_ci NOT NULL,
  `subcategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) DEFAULT NULL,
  `min_days` int unsigned DEFAULT NULL,
  `max_days` int unsigned DEFAULT NULL,
  `compare_specs` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.services: ~8 rows (approximately)
INSERT INTO `services` (`id`, `name`, `category`, `subcategory`, `description`, `price`, `min_days`, `max_days`, `compare_specs`, `created_at`, `updated_at`) VALUES
	(1, 'Ремонт мебели', 'household', 'мебель', 'Ремонт, укрепление, замена фурнитуры, восстановление повреждений.', 500.00, 1, 5, '{"warranty_months": 3, "pickup_available": true, "materials_included": false}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 'Ремонт бытовой техники', 'household', 'бытовая техника', 'Диагностика, ремонт, замена узлов, обслуживание.', 800.00, 1, 7, '{"warranty_months": 2, "pickup_available": true, "express_available": true}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(3, 'Ремонт аксессуаров', 'household', 'аксессуары', 'Мелкий ремонт, пайка, восстановление деталей.', 300.00, 1, 3, '{"warranty_months": 1, "express_available": true}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(4, 'Ремонт оборудования', 'industrial', 'оборудование', 'Техническое обслуживание и ремонт промышленного оборудования.', 2500.00, 3, 14, '{"on_site_service": true, "warranty_months": 6, "diagnostics_included": true}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(5, 'Ремонт станков', 'industrial', 'станки', 'Ремонт станков, настройка, восстановление точности.', 4000.00, 5, 21, '{"spare_parts": "по согласованию", "on_site_service": true, "warranty_months": 6}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(6, 'Ремонт сложных механизмов', 'industrial', 'сложные механизмы', 'Диагностика и ремонт нестандартных механических узлов.', 3500.00, 7, 30, '{"custom_parts": true, "warranty_months": 6}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(7, 'Индивидуальный проект (заявка)', 'custom_project', NULL, 'Проектирование и изготовление уникального изделия по ТЗ клиента.', 0.00, 7, 60, '{"prepayment": "обсуждается", "requires_brief": true}', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(8, 'Реставрация изделий', 'restoration', NULL, 'Восстановление старых изделий: ремонт, покраска, замена деталей.', 1200.00, 3, 14, '{"warranty_months": 3, "materials_included": true}', '2025-12-24 20:18:12', '2025-12-24 20:18:12');

-- Dumping structure for table fixit_workshop.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.sessions: ~2 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('Vdy4xRrjmtEETSjIERwH9BmkDNcqyeo61h92WrDv', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRk5pUXZLckpvdjBPRk9nc1pXZngzYmdrZXJjR2dFU0t4a0hPeHE4MiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9zZXJ2aWNlcyI7czo1OiJyb3V0ZSI7czoxNDoiYWRtaW4uc2VydmljZXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1766757912);

-- Dumping structure for table fixit_workshop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table fixit_workshop.users: ~11 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `phone`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@fixit.local', '2025-12-24 20:18:12', '$2y$12$9HmczydSPairEoNMgE2iQ.aGL.WRR9HiLRx1LgAe6tv4G31XFT3Bu', NULL, NULL, NULL, '88005553535', 'lwqKTi0CfjL9slyWvfqDSnNpIkL1cQwhhE3t8q86InGR1OIKmuxDfPRvrczw', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(2, 'Петухова Фаина Владимировна', 'vil.rogova@example.org', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'ZPbkRAREFO', 'Scryld4vCn', '2025-12-24 20:18:12', '0', 'tPNd1pznB1', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(3, 'Лидия Максимовна Игнатова', 'polina29@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'NMmWpClQcA', 'p56W5zAYwu', '2025-12-24 20:18:12', '0', '5egTQpHIVc', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(4, 'Эмилия Борисовна Брагина', 'inna32@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', '9Vm7VnpyCE', 'YJtSqAZwmU', '2025-12-24 20:18:12', '0', '36Sq9f1kmx', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(5, 'Майя Романовна Филатова', 'raisa.rusakov@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', '6MX6tQ909e', 'W7oiPn7UzE', '2025-12-24 20:18:12', '0', 'IMJVvGq4KS', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(6, 'Сафонов Савва Александрович', 'danilov.margarita@example.com', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'jJY4gaLj6q', 'iXS6oLEASc', '2025-12-24 20:18:12', '0', 'Ra8trpPoE4', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(7, 'Алексеева Вероника Евгеньевна', 'gerasim.samsonova@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'sMG08F45qW', 'v0704GtAzR', '2025-12-24 20:18:12', '0', 'T2RPDi6ujk', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(8, 'Якушева Эмилия Сергеевна', 'ksenia.nesterov@example.org', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', '7LYT6BAGGD', 'rT33qcf3A7', '2025-12-24 20:18:12', '0', 'FRexmZrHCx', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(9, 'Спартак Владимирович Нестеров', 'anzelika.sorokina@example.org', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'QCCVfOora5', 'KGvvGE8l3i', '2025-12-24 20:18:12', '0', '2R8zWPmkWJ', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(10, 'Гришин Роман Евгеньевич', 'vitalij88@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'C3wxCO7O1b', '8xwGmXi0zn', '2025-12-24 20:18:12', '0', 'LoKZdpQHyi', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(11, 'Филиппов Валентин Владимирович', 'bzajcev@example.net', '2025-12-24 20:18:12', '$2y$12$jBjcR3B1qlWchuhmYXQykulFl1nz.ldqB4GBHcAdPrY6f2VV1n0CO', 'MfsWJYjjDo', 'M9Rf9cZLY0', '2025-12-24 20:18:12', '0', 'AFD1aF5cK6', '2025-12-24 20:18:12', '2025-12-24 20:18:12'),
	(12, 'test2', 'test2@ec.com', NULL, '$2y$12$qNsc/uF/NZQGQ3yv5eTD/u5b2lN4xNU7rsXuUQTOkhgqgjBoEseqa', NULL, NULL, NULL, '5555', NULL, '2025-12-24 20:46:10', '2025-12-24 20:46:10'),
	(13, 'Botov2', 'botov@botov.com', NULL, '$2y$12$TnyY3BV7BsxlDc5bVW2KGOLdjnDPhobPEu1JMkWz0ASJULPi7B8Si', NULL, NULL, NULL, '78898444', NULL, '2025-12-26 13:38:17', '2025-12-26 13:38:27');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
