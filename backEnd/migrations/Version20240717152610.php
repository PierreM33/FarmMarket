<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240717152610 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649681FADBC');
        $this->addSql('ALTER TABLE galaxy DROP FOREIGN KEY FK_F6BB13768D93D649');
        $this->addSql('ALTER TABLE technology_user DROP FOREIGN KEY FK_2B90AC434235D463');
        $this->addSql('ALTER TABLE technology_user DROP FOREIGN KEY FK_2B90AC43A76ED395');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416B61FAB2');
        $this->addSql('ALTER TABLE population DROP FOREIGN KEY FK_B449A008B61FAB2');
        $this->addSql('DROP TABLE galaxy');
        $this->addSql('DROP TABLE technology_user');
        $this->addSql('DROP TABLE technology');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE population');
        $this->addSql('DROP INDEX IDX_8D93D649681FADBC ON user');
        $this->addSql('ALTER TABLE user DROP planet_selected_id, DROP race');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE galaxy (id INT AUTO_INCREMENT NOT NULL, user INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_F6BB13768D93D649 (user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE technology_user (id INT AUTO_INCREMENT NOT NULL, technology_id INT NOT NULL, user_id INT NOT NULL, price_gold INT NOT NULL, price_orinia INT NOT NULL, price_metals INT NOT NULL, price_orinium INT NOT NULL, price_energy INT NOT NULL, research_required INT NOT NULL, level INT NOT NULL, time_upgrade INT NOT NULL, INDEX IDX_2B90AC43A76ED395 (user_id), INDEX IDX_2B90AC434235D463 (technology_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE technology (id INT AUTO_INCREMENT NOT NULL, image VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, race VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, price_gold INT NOT NULL, price_orinia INT NOT NULL, price_orinium INT NOT NULL, price_energy INT NOT NULL, price_metals INT NOT NULL, time_start DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE resource (id INT AUTO_INCREMENT NOT NULL, galaxy_id INT NOT NULL, metals INT NOT NULL, gold INT NOT NULL, orinia INT NOT NULL, orinium INT NOT NULL, energy INT NOT NULL, UNIQUE INDEX UNIQ_BC91F416B61FAB2 (galaxy_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE population (id INT AUTO_INCREMENT NOT NULL, galaxy_id INT NOT NULL, worker INT NOT NULL, slave INT NOT NULL, population INT NOT NULL, warrior INT NOT NULL, pilot INT NOT NULL, civil INT NOT NULL, scientist INT NOT NULL, UNIQUE INDEX UNIQ_B449A008B61FAB2 (galaxy_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE galaxy ADD CONSTRAINT FK_F6BB13768D93D649 FOREIGN KEY (user) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE technology_user ADD CONSTRAINT FK_2B90AC434235D463 FOREIGN KEY (technology_id) REFERENCES technology (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE technology_user ADD CONSTRAINT FK_2B90AC43A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416B61FAB2 FOREIGN KEY (galaxy_id) REFERENCES galaxy (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008B61FAB2 FOREIGN KEY (galaxy_id) REFERENCES galaxy (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user ADD planet_selected_id INT DEFAULT NULL, ADD race VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649681FADBC FOREIGN KEY (planet_selected_id) REFERENCES galaxy (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_8D93D649681FADBC ON user (planet_selected_id)');
    }
}
