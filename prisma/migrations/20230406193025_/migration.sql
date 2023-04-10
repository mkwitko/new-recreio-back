-- CreateTable
CREATE TABLE `app_config` (
    `id` INTEGER NOT NULL,
    `renew_service_start` DATE NOT NULL,
    `renew_service_end` DATE NOT NULL,
    `renew_contract_start` INTEGER NOT NULL DEFAULT 1,
    `kiosk_reservation_yesterday` TINYINT NOT NULL DEFAULT 0,
    `kiosk_reservation_time` TIME(0) NOT NULL DEFAULT '06:00:00',
    `kiosk_withdraw_key` TIME(0) NOT NULL DEFAULT '10:00:00',
    `kiosk_chance_time` TIME(0) NOT NULL DEFAULT '10:00:00',
    `kiosk_chance_close` TIME(0) NOT NULL DEFAULT '10:00:00',
    `kiosk_reopening_time` TIME(0) NOT NULL DEFAULT '10:05:00',
    `kiosk_closing_time` TIME(0) NOT NULL DEFAULT '18:00:00',
    `waitlist_contract_time` INTEGER NOT NULL DEFAULT 24,
    `map_refresh_seconds` INTEGER NULL DEFAULT 10,
    `push_delay` INTEGER NOT NULL DEFAULT 1,
    `push_welcome` TEXT NULL,
    `points_to_price` DOUBLE NULL,
    `price_to_points` DOUBLE NULL,

    UNIQUE INDEX `app_config_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL,
    `order_by` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NULL DEFAULT false,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    INDEX `id_company`(`id_company`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_faq_description` (
    `id_faq` INTEGER NOT NULL,
    `id_language` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `text` TEXT NULL,

    INDEX `id_faq`(`id_faq`),
    INDEX `id_language`(`id_language`),
    PRIMARY KEY (`id_faq`, `id_language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_forgot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `cellphone` VARCHAR(11) NULL,
    `code` VARCHAR(15) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `app_forgot_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_headquarters_ju` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_holiday` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL,
    `id_language` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `order_by` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,

    INDEX `fk_APP_holiday_company_idx`(`id_company`),
    INDEX `fk_APP_holiday_language_idx`(`id_language`),
    UNIQUE INDEX `unique_date`(`date`, `id_language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_session` (
    `session_id` VARCHAR(40) NOT NULL DEFAULT '0',
    `ip_address` VARCHAR(45) NOT NULL DEFAULT '0',
    `user_agent` VARCHAR(255) NOT NULL,
    `last_activity` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `user` VARCHAR(8) NULL,
    `user_data` TEXT NULL,

    INDEX `last_activity_idx`(`last_activity`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL DEFAULT 1,
    `status` INTEGER NULL DEFAULT 1,
    `reservable` INTEGER NULL DEFAULT 0,
    `logic` VARCHAR(255) NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    UNIQUE INDEX `app_service_category_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_category_description` (
    `id_service_category` INTEGER NOT NULL,
    `id_language` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `text` TEXT NULL,
    `terms` TEXT NULL,
    `slug` VARCHAR(255) NULL,

    UNIQUE INDEX `app_service_category_description_id_service_category_key`(`id_service_category`),
    PRIMARY KEY (`id_service_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_category_gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_service_category` INTEGER NOT NULL,
    `file` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `order_by` INTEGER NOT NULL DEFAULT 0,
    `highlighted` INTEGER NOT NULL DEFAULT 0,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    UNIQUE INDEX `app_service_category_gallery_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_category_ju` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_service_category` INTEGER NOT NULL,
    `id_ju_category` INTEGER NOT NULL,
    `app_service_classifications_juCla_classificacao` INTEGER NULL,

    UNIQUE INDEX `app_service_category_ju_id_ju_category_key`(`id_ju_category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_category_filter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `id_headquarters` INTEGER NOT NULL,
    `services_related` TEXT NULL,
    `status` INTEGER NULL DEFAULT 1,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_services_ju` (
    `ser_servico` INTEGER NOT NULL,
    `ser_descricao` VARCHAR(255) NULL,
    `ser_abreviatura` VARCHAR(255) NULL,
    `ser_classificacao` INTEGER NULL,
    `ser_bloqatraso` VARCHAR(1) NULL DEFAULT 'S',
    `ser_diasbloqatraso` INTEGER NULL,
    `ser_gerardebito` VARCHAR(1) NULL DEFAULT 'S',
    `ser_permitecontratacao` VARCHAR(1) NULL DEFAULT 'S',
    `ser_ativo` VARCHAR(1) NULL DEFAULT 'S',
    `ser_considerarparadesconto` VARCHAR(1) NULL DEFAULT 'S',
    `ser_idadeini` INTEGER NULL,
    `ser_idadefim` INTEGER NULL,
    `ser_contratasemlimite` VARCHAR(255) NULL,
    `sexo` VARCHAR(1) NULL,

    UNIQUE INDEX `app_services_ju_ser_servico_key`(`ser_servico`),
    PRIMARY KEY (`ser_servico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_service_classifications_ju` (
    `cla_classificacao` INTEGER NOT NULL,
    `cla_descricao` VARCHAR(255) NULL,

    UNIQUE INDEX `app_service_classifications_ju_cla_classificacao_key`(`cla_classificacao`),
    PRIMARY KEY (`cla_classificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_user` (
    `mainId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(8) NOT NULL,
    `sequency` CHAR(2) NOT NULL DEFAULT '00',
    `password` VARCHAR(255) NOT NULL,
    `udid` VARCHAR(255) NULL,
    `retrieve_hash` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,
    `nome` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `dtnascimento` DATE NULL,
    `cpf` VARCHAR(14) NULL,
    `identidade` VARCHAR(7) NULL,
    `sexo` VARCHAR(1) NULL DEFAULT 'F',
    `super` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `app_user_id_sequency_key`(`id`, `sequency`),
    PRIMARY KEY (`mainId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_user_guest` (
    `username` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `cellphone` VARCHAR(255) NOT NULL,
    `motive` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valid_until` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `app_user_guest_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_update` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `app_update_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_goal` (
    `id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place` (
    `id` INTEGER NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `status_site` BOOLEAN NULL,
    `status_app` BOOLEAN NULL DEFAULT false,
    `allow_purchase` BOOLEAN NULL DEFAULT false,
    `allow_non_members` BOOLEAN NULL DEFAULT false,
    `allow_reserve_with_debts` BOOLEAN NOT NULL DEFAULT false,
    `reservation_rule` INTEGER NULL,
    `max_week_reserves` INTEGER NULL,
    `max_day_reserves` INTEGER NULL,
    `type` VARCHAR(30) NOT NULL DEFAULT 'place',
    `id_type` INTEGER NOT NULL,
    `order_by` INTEGER NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    INDEX `id`(`id`),
    INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place_ju` (
    `loc_local` INTEGER NOT NULL,
    `loc_descricao` VARCHAR(255) NULL,
    `loc_idadeinicial` INTEGER NULL,
    `loc_idadefinal` INTEGER NULL,
    `loc_vlraluguel` INTEGER NULL,
    `ser_ativo` VARCHAR(1) NULL DEFAULT 'S',
    `ser_permitecontratacao` VARCHAR(1) NULL DEFAULT 'S',

    UNIQUE INDEX `site_place_ju_loc_local_key`(`loc_local`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place_description` (
    `id_place` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `text` TEXT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `site_place_description_id_place_key`(`id_place`),
    INDEX `id_place`(`id_place`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place_discount` (
    `id_place` INTEGER NOT NULL,
    `day` INTEGER NOT NULL,
    `percent` FLOAT NOT NULL DEFAULT 0,

    INDEX `id_goal`(`day`),
    PRIMARY KEY (`id_place`, `day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place_gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_place` INTEGER NOT NULL,
    `file` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NULL,
    `order_by` INTEGER NULL,
    `highlighted` BOOLEAN NULL DEFAULT false,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    INDEX `id_place`(`id_place`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_place_goal` (
    `id_place` INTEGER NOT NULL,
    `id_goal` INTEGER NOT NULL,

    INDEX `id_goal`(`id_goal`),
    PRIMARY KEY (`id_place`, `id_goal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_social_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `associado` INTEGER NULL,
    `sequencia` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `fileName` VARCHAR(255) NOT NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `approved` TINYINT NOT NULL DEFAULT 0,
    `reproved` TINYINT NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL DEFAULT 1,
    `order_by` INTEGER NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,
    `deleted` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `app_faq_description` ADD CONSTRAINT `fk_app_faq_description_faq` FOREIGN KEY (`id_faq`) REFERENCES `app_faq`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_service_category_description` ADD CONSTRAINT `app_service_category_description_id_service_category_fkey` FOREIGN KEY (`id_service_category`) REFERENCES `app_service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_service_category_gallery` ADD CONSTRAINT `app_service_category_gallery_id_service_category_fkey` FOREIGN KEY (`id_service_category`) REFERENCES `app_service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_service_category_ju` ADD CONSTRAINT `app_service_category_ju_id_service_category_fkey` FOREIGN KEY (`id_service_category`) REFERENCES `app_service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_service_category_ju` ADD CONSTRAINT `app_service_category_ju_app_service_classifications_juCla_c_fkey` FOREIGN KEY (`app_service_classifications_juCla_classificacao`) REFERENCES `app_service_classifications_ju`(`cla_classificacao`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_services_ju` ADD CONSTRAINT `app_services_ju_ser_classificacao_fkey` FOREIGN KEY (`ser_classificacao`) REFERENCES `app_service_category_ju`(`id_ju_category`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place` ADD CONSTRAINT `site_place_id_fkey` FOREIGN KEY (`id`) REFERENCES `site_place_ju`(`loc_local`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place_description` ADD CONSTRAINT `fk_site_place_description_place` FOREIGN KEY (`id_place`) REFERENCES `site_place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place_discount` ADD CONSTRAINT `site_place_discount_ibfk_1` FOREIGN KEY (`id_place`) REFERENCES `site_place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place_gallery` ADD CONSTRAINT `site_place_gallery_ibfk_1` FOREIGN KEY (`id_place`) REFERENCES `site_place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place_goal` ADD CONSTRAINT `site_place_goal_ibfk_1` FOREIGN KEY (`id_place`) REFERENCES `site_place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_place_goal` ADD CONSTRAINT `site_place_goal_ibfk_2` FOREIGN KEY (`id_goal`) REFERENCES `site_goal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
